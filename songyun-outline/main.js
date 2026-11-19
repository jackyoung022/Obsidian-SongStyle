"use strict";

const {
  MarkdownView,
  Notice,
  Platform,
  Plugin,
  PluginSettingTab,
  Setting,
} = require("obsidian");

const DEFAULT_SETTINGS = {
  enabled: true,
  showInReading: true,
  showInSource: true,
  showOnMobile: false,
};

const LEVEL_CLASS = {
  1: "is-level-1",
  2: "is-level-2",
  3: "is-level-3",
  4: "is-level-4",
  5: "is-level-5",
  6: "is-level-6",
};

function plainHeading(text) {
  return String(text || "")
    .replace(/\*\*(.*?)\*\*/g, "$1")
    .replace(/__(.*?)__/g, "$1")
    .replace(/\*(.*?)\*/g, "$1")
    .replace(/_(.*?)_/g, "$1")
    .replace(/`([^`]+)`/g, "$1")
    .replace(/~~(.*?)~~/g, "$1")
    .replace(/==(.*?)==/g, "$1")
    .replace(/\[(.*?)\]\([^)]+\)/g, "$1")
    .replace(/\[\[(.*?)(?:\|.*?)?\]\]/g, "$1")
    .replace(/<[^>]+>/g, "")
    .trim();
}

module.exports = class SongyunOutlinePlugin extends Plugin {
  async onload() {
    await this.loadSettings();
    this.viewStates = new Map();
    this.refreshTimer = null;
    this.frameId = 0;

    this.addSettingTab(new SongyunOutlineSettingTab(this.app, this));

    this.addCommand({
      id: "toggle-songyun-outline",
      name: "切换页边纸签目录",
      callback: async () => {
        this.settings.enabled = !this.settings.enabled;
        await this.saveSettings();
        this.refreshAll();
        new Notice(this.settings.enabled ? "宋韵页边目录已开启" : "宋韵页边目录已关闭");
      },
    });

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.workspace.on("file-open", () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.workspace.on("layout-change", () => this.scheduleRefresh())
    );
    this.registerEvent(
      this.app.workspace.on("editor-change", () => this.scheduleCurrentUpdate())
    );
    this.registerEvent(
      this.app.metadataCache.on("changed", (file) => {
        for (const view of this.getMarkdownViews()) {
          if (view.file === file) {
            this.scheduleRefresh();
            return;
          }
        }
      })
    );

    this.registerDomEvent(
      document,
      "scroll",
      () => this.scheduleCurrentUpdate(),
      { capture: true, passive: true }
    );
    this.registerDomEvent(
      document,
      "keyup",
      () => this.scheduleCurrentUpdate(),
      { capture: true, passive: true }
    );
    this.registerDomEvent(
      document,
      "click",
      () => this.scheduleCurrentUpdate(),
      { capture: true, passive: true }
    );
    this.registerDomEvent(window, "resize", () => this.scheduleRefresh());

    const classObserver = new MutationObserver(() => this.scheduleRefresh());
    classObserver.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });
    this.register(() => classObserver.disconnect());

    this.app.workspace.onLayoutReady(() => this.refreshAll());
  }

  onunload() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
    if (this.frameId) window.cancelAnimationFrame(this.frameId);
    this.clearAll();
  }

  async loadSettings() {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings() {
    await this.saveData(this.settings);
  }

  getMarkdownViews() {
    return this.app.workspace
      .getLeavesOfType("markdown")
      .map((leaf) => leaf.view)
      .filter((view) => view instanceof MarkdownView);
  }

  scheduleRefresh() {
    if (this.refreshTimer) window.clearTimeout(this.refreshTimer);
    this.refreshTimer = window.setTimeout(() => {
      this.refreshTimer = null;
      this.refreshAll();
    }, 120);
  }

  scheduleCurrentUpdate() {
    if (this.frameId) return;
    this.frameId = window.requestAnimationFrame(() => {
      this.frameId = 0;
      for (const [view, state] of this.viewStates) {
        this.updateCurrent(view, state);
      }
    });
  }

  refreshAll() {
    if (
      !this.settings.enabled ||
      document.body.classList.contains("song-hide-floating-toc") ||
      (Platform.isMobileApp && !this.settings.showOnMobile)
    ) {
      this.clearAll();
      return;
    }

    const liveViews = new Set(this.getMarkdownViews());
    for (const view of [...this.viewStates.keys()]) {
      if (!liveViews.has(view)) this.removeView(view);
    }
    for (const view of liveViews) this.renderView(view);
  }

  clearAll() {
    for (const view of [...this.viewStates.keys()]) this.removeView(view);
  }

  removeView(view) {
    const state = this.viewStates.get(view);
    if (state?.wrapper?.isConnected) state.wrapper.remove();
    view.contentEl.querySelectorAll(".songyun-outline").forEach((node) => node.remove());
    view.contentEl.classList.remove("songyun-outline-host");
    this.viewStates.delete(view);
  }

  renderView(view) {
    const mode = view.getMode();
    const allowed =
      (mode === "preview" && this.settings.showInReading) ||
      (mode === "source" && this.settings.showInSource);
    const headings = this.getHeadings(view);

    if (!allowed || !view.file || !headings.length) {
      this.removeView(view);
      return;
    }

    this.removeView(view);
    view.contentEl.classList.add("songyun-outline-host");

    const wrapper = document.createElement("div");
    wrapper.className = "songyun-outline";
    wrapper.setAttribute("aria-label", "本页标题纸签");

    const header = view.contentEl.querySelector(".view-header");
    const headerHeight = header?.getBoundingClientRect().height || 0;
    wrapper.style.setProperty(
      "--songyun-outline-top",
      `${Math.round(Math.max(58, headerHeight + 22))}px`
    );

    const nav = document.createElement("nav");
    nav.className = "songyun-outline-scroll";
    nav.setAttribute("aria-label", "标题纸签");

    const list = document.createElement("ol");
    list.className = "songyun-outline-list";

    for (const heading of headings) {
      const level = Math.min(6, Math.max(1, heading.level));
      const text = plainHeading(heading.heading);
      const line = heading.position?.start?.line ?? 0;

      const item = document.createElement("li");
      item.className = `songyun-outline-item ${LEVEL_CLASS[level]}`;
      item.dataset.line = String(line);
      item.dataset.level = String(level);

      const tab = document.createElement("a");
      tab.className = "songyun-outline-tab";
      tab.href = "#";
      tab.dataset.line = String(line);
      tab.setAttribute("aria-label", text);
      tab.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
        this.navigateTo(view, line);
      });

      const label = document.createElement("span");
      label.className = "songyun-outline-label";
      label.setAttribute("aria-hidden", "true");
      label.textContent = text;

      tab.append(label);
      item.append(tab);
      list.append(item);
    }

    nav.append(list);
    wrapper.append(nav);
    view.contentEl.append(wrapper);

    const state = { wrapper, nav, list, headings };
    this.viewStates.set(view, state);
    this.updateCurrent(view, state);
  }

  getHeadings(view) {
    if (!view.file) return [];
    return (this.app.metadataCache.getFileCache(view.file)?.headings || [])
      .filter((heading) => heading.position?.start?.line != null)
      .slice()
      .sort((a, b) => a.position.start.line - b.position.start.line);
  }

  getScrollLine(view) {
    try {
      const line = view.currentMode?.getScroll?.();
      return Number.isFinite(line) ? Math.max(0, line) : 0;
    } catch (_) {
      return 0;
    }
  }

  updateCurrent(view, state) {
    if (!state?.list?.isConnected) return;
    const scrollLine = this.getScrollLine(view);
    let current = state.headings[0];
    for (const heading of state.headings) {
      if (heading.position.start.line <= scrollLine) current = heading;
      else break;
    }
    if (!current) return;

    let activeItem = null;
    state.list.querySelectorAll(".songyun-outline-item").forEach((item) => {
      const active = Number(item.dataset.line) === current.position.start.line;
      item.classList.toggle("is-current", active);
      if (active) activeItem = item;
    });

    if (activeItem) this.keepItemVisible(state.nav, activeItem);
  }

  keepItemVisible(nav, item) {
    const itemRect = item.getBoundingClientRect();
    const navRect = nav.getBoundingClientRect();
    if (itemRect.top < navRect.top) {
      nav.scrollTop -= navRect.top - itemRect.top + 4;
    } else if (itemRect.bottom > navRect.bottom) {
      nav.scrollTop += itemRect.bottom - navRect.bottom + 4;
    }
  }

  navigateTo(view, line) {
    try {
      if (view.getMode() === "source" && view.editor) {
        const from = { line, ch: 0 };
        view.editor.setCursor(from);
        view.editor.scrollIntoView({ from, to: from }, true);
        view.editor.focus();
      } else {
        view.currentMode.applyScroll(line);
      }
    } catch (_) {
      view.leaf.openFile(view.file, { eState: { line } });
    }
    this.scheduleCurrentUpdate();
  }
};

class SongyunOutlineSettingTab extends PluginSettingTab {
  constructor(app, plugin) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display() {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("启用页边纸签目录")
      .setDesc("在正文左侧显示宋韵纸签目录。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.enabled).onChange(async (value) => {
          this.plugin.settings.enabled = value;
          await this.plugin.saveSettings();
          this.plugin.refreshAll();
        })
      );

    new Setting(containerEl)
      .setName("阅读视图")
      .setDesc("在阅读视图中显示目录。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showInReading).onChange(async (value) => {
          this.plugin.settings.showInReading = value;
          await this.plugin.saveSettings();
          this.plugin.refreshAll();
        })
      );

    new Setting(containerEl)
      .setName("编辑视图")
      .setDesc("在实时预览和源码模式中显示目录。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showInSource).onChange(async (value) => {
          this.plugin.settings.showInSource = value;
          await this.plugin.saveSettings();
          this.plugin.refreshAll();
        })
      );

    new Setting(containerEl)
      .setName("移动端显示")
      .setDesc("在 Obsidian 移动端显示页边目录。默认关闭。")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.showOnMobile).onChange(async (value) => {
          this.plugin.settings.showOnMobile = value;
          await this.plugin.saveSettings();
          this.plugin.refreshAll();
        })
      );
  }
}

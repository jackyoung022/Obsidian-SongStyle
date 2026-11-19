#!/usr/bin/env python3
"""Build the standalone Songyun Outline companion plugin archive."""

import json
import zipfile
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "songyun-outline"
DIST = ROOT / "dist"


def main():
    manifest = json.loads((SOURCE / "manifest.json").read_text())
    plugin_id = manifest["id"]
    version = manifest["version"]
    required = ["main.js", "manifest.json", "styles.css"]

    missing = [name for name in required if not (SOURCE / name).is_file()]
    if missing:
        raise ValueError(f"Missing plugin files: {', '.join(missing)}")

    DIST.mkdir(exist_ok=True)
    archive = DIST / f"Songyun-Outline-v{version}.zip"
    with zipfile.ZipFile(archive, "w", zipfile.ZIP_DEFLATED) as bundle:
        for name in [*required, "README.md"]:
            path = SOURCE / name
            bundle.write(path, f"{plugin_id}/{name}")
        bundle.write(ROOT / "LICENSE", f"{plugin_id}/LICENSE")

    with zipfile.ZipFile(archive) as bundle:
        if bundle.testzip():
            raise ValueError("ZIP validation failed")
        packaged_manifest = json.loads(
            bundle.read(f"{plugin_id}/manifest.json").decode()
        )
        if packaged_manifest["id"] != plugin_id:
            raise ValueError("Packaged manifest id does not match")

    print(f"Built {manifest['name']} {version}: {archive.name}")


if __name__ == "__main__":
    main()

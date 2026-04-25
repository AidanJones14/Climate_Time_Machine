#!/usr/bin/env python3
"""
build.py - Bundle the project into a single index.html file.
"""

import os
import re

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
DIST = os.path.join(ROOT, "dist")

def read_file(rel_path):
    """Read a file relative to the project root."""
    with open(os.path.join(ROOT, rel_path), "r", encoding="utf-8") as f:
        return f.read()

def build():
    os.makedirs(DIST, exist_ok=True)

    # Read all source files
    html = read_file("index.html")
    css = read_file("css/styles.css")
    data_js = read_file("js/data.js")
    globe_js = read_file("js/globe_viz.js")
    app_js = read_file("js/app.js")

    # 1. Replace external CSS link with inline <style>
    css_block = f"<style>\n{css}\n    </style>"
    html = re.sub(
        r'<link\s+rel="stylesheet"\s+href="css/styles\.css"\s*/?>',
        lambda m: css_block,
        html
    )

    # 2. Replace external JS script tags with inline <script> blocks
    data_block = f"<script>\n{data_js}\n    </script>"
    html = re.sub(
        r'<script\s+src="js/data\.js"\s*>\s*</script>',
        lambda m: data_block,
        html
    )

    globe_block = f"<script>\n{globe_js}\n    </script>"
    html = re.sub(
        r'<script\s+src="js/globe_viz\.js"\s*>\s*</script>',
        lambda m: globe_block,
        html
    )

    app_block = f"<script>\n{app_js}\n    </script>"
    html = re.sub(
        r'<script\s+src="js/app\.js"\s*>\s*</script>',
        lambda m: app_block,
        html
    )

    # Write the bundled file
    output_path = os.path.join(DIST, "index.html")
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(html)

    file_size = os.path.getsize(output_path)
    print(f"✅ Built dist/index.html ({file_size:,} bytes / {file_size / 1024:.1f} KB)")
    print(f"   CSS: {len(css):,} bytes")
    print(f"   data.js: {len(data_js):,} bytes")
    print(f"   globe_viz.js: {len(globe_js):,} bytes")
    print(f"   app.js: {len(app_js):,} bytes")

if __name__ == "__main__":
    build()

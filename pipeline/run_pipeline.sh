#!/bin/bash
set -e
echo "🚀 Running Non-Euclidean Asset Pipeline..."
uv run src/build_lattice.py
uv run src/build_trajectories.py
uv run src/build_textures.py
echo "✅ All assets baked cleanly into public/generated/"

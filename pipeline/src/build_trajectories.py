import os
import json
import numpy as np
from math_hyperbolic import get_geodesic_arc, conformal_scale

def generate_looping_track(num_frames=900):
    """Generates a closed-loop geodesic triangular path for an explorer object."""
    # Set up anchor points in the disk space
    p1 = 0.2 + 0.1j
    p2 = -0.5 + 0.4j
    p3 = 0.1 - 0.6j
    
    frames_per_segment = num_frames // 3
    
    # Compute true arcs along non-Euclidean space curves
    arc1 = get_geodesic_arc(p1, p2, frames_per_segment)
    arc2 = get_geodesic_arc(p2, p3, frames_per_segment)
    arc3 = get_geodesic_arc(p3, p1, frames_per_segment)
    
    full_path = np.concatenate([arc1, arc2, arc3])
    
    path_data = []
    for z in full_path:
        scale = conformal_scale(z)
        path_data.append({
            "x": float(z.real),
            "y": float(z.imag),
            "scale": float(scale)
        })
        
    return path_data

if __name__ == "__main__":
    print("🎬 Baking Actor Geodesic Loops and Space Scale Factors...")
    actor_loop = generate_looping_track(num_frames=900)
    
    out_dir = "../public/generated/paths"
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "actor_tracks.json"), "w") as f:
        json.dump({"actor_1": actor_loop}, f)
    print(f"✅ Pre-baked {len(actor_loop)} frames cleanly to {out_dir}/actor_tracks.json")

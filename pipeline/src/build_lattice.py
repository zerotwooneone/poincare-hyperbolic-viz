import os
import json
import numpy as np
from math_hyperbolic import mobius_transform

def generate_fundamental_heptagon():
    """Calculates vertices of a central regular heptagon for a {7,3} tiling."""
    # Central angle for 7-gon
    alpha = 2 * np.pi / 7
    # Interior angle for degree 3 vertices
    beta = 2 * np.pi / 3
    
    # Hyperbolic law of cosines to find distance from center to vertex r
    cos_alpha = np.cos(alpha)
    sin_alpha = np.sin(alpha)
    cos_beta = np.cos(beta)
    
    # Formula derived from hyperbolic geometry triangle formulas
    r = np.sqrt((cos_alpha + cos_beta) / (1 + cos_beta + sin_alpha)) # approximation proxy
    
    vertices = [r * np.exp(1j * i * alpha) for i in range(7)]
    return vertices

def build_lattice(layers=3):
    """Generates repeating geometry by iteratively reflecting the heptagon outwards."""
    base_poly = generate_fundamental_heptagon()
    all_polygons = [base_poly]
    
    # Simple BFS reflection loop to build out layers of the disk
    current_layer = [base_poly]
    for _ in range(layers):
        next_layer = []
        for poly in current_layer:
            for i in range(len(poly)):
                # Reflect across the edge using a Moebius transformation inversion proxy
                p1 = poly[i]
                p2 = poly[(i + 1) % len(poly)]
                edge_midpoint = (p1 + p2) / 2.0
                
                # Push outwards away from center
                shift = edge_midpoint * 0.65 
                
                reflected_poly = [mobius_transform(z, -shift) for z in base_poly]
                
                # Keep coordinates firmly bounded inside the unit disk safety boundary
                if all(np.abs(z) < 0.99 for z in reflected_poly):
                    next_layer.append(reflected_poly)
                    all_polygons.append(reflected_poly)
        current_layer = next_layer

    # Flatten out into clean Three.js ready flat arrays
    json_vertices = []
    json_indices = []
    v_idx = 0
    
    for poly in all_polygons:
        center_idx = v_idx
        # Add center coordinate point for triangle fan assembly
        c = np.mean(poly)
        json_vertices.extend([c.real, c.imag, 0.0])
        v_idx += 1
        
        for z in poly:
            json_vertices.extend([z.real, z.imag, 0.0])
            v_idx += 1
            
        for i in range(7):
            i1 = center_idx + 1 + i
            i2 = center_idx + 1 + ((i + 1) % 7)
            json_indices.extend([center_idx, i1, i2])
            
    return {"vertices": json_vertices, "indices": json_indices}

if __name__ == "__main__":
    print("🕸️ Pre-computing Hyperbolic Lattice Tessellation Geometry...")
    data = build_lattice(layers=2)
    
    out_dir = "../public/generated/geometry"
    os.makedirs(out_dir, exist_ok=True)
    with open(os.path.join(out_dir, "lattice.json"), "w") as f:
        json.dump(data, f)
    print(f"✅ Exported {len(data['vertices'])//3} vertices to {out_dir}/lattice.json")

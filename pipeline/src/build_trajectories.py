import numpy as np
import json

def moebius_transform(z, a, theta=0):
    """Applies a Möbius transformation to a complex coordinate."""
    rotation = np.exp(1j * theta)
    return rotation * (z - a) / (1 - np.conj(a) * z)

def generate_geodesic_track(steps, start_real, offset_point, rotation_angle):
    """Generates an array of JSON-serializable path coordinates."""
    # Create a base linear geodesic passing through the center
    t_values = np.linspace(-start_real, start_real, steps)
    base_path = t_values + 0j 
    
    track = []
    for z in base_path:
        # Transform the linear path into a curved off-center arc
        transformed = moebius_transform(z, offset_point, rotation_angle)
        
        # Calculate hyperbolic distance from origin to scale the actor (perspective)
        r = np.abs(transformed)
        hyperbolic_scale = 1.0 - r**2 # Actor shrinks near the boundary
        
        track.append({
            "x": transformed.real,
            "y": transformed.imag,
            "scale": hyperbolic_scale
        })
    return track

# Generate multiple distinct paths
tracks = {
    "actor_1": generate_geodesic_track(200, 0.98, 0.3 + 0.4j, np.pi/4),
    "actor_2": generate_geodesic_track(200, 0.95, -0.5 + 0.1j, -np.pi/3),
    "actor_3": generate_geodesic_track(200, 0.99, 0.1 - 0.7j, np.pi/2)
}

with open("../public/generated/paths.json", "w") as f:
    json.dump(tracks, f)
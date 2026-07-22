import numpy as np

def poincare_dist(z1, z2):
    """Calculates the hyperbolic distance between two points in the Poincaré disk."""
    num = np.abs(z1 - z2)**2
    den = (1 - np.abs(z1)**2) * (1 - np.abs(z2)**2)
    return np.arccosh(1 + 2 * num / den)

def mobius_transform(z, a, theta=0):
    """Applies a Möbius transformation to map the disk onto itself, moving the origin to 'a'."""
    return np.exp(1j * theta) * (z - a) / (1 - np.conj(a) * z)

def conformal_scale(z):
    """Calculates the scaling factor for a Euclidean object at point z to look uniform in hyperbolic space."""
    return 1.0 - np.abs(z)**2

def get_geodesic_arc(z1, z2, num_points=50):
    """Generates a Euclidean circular arc (hyperbolic straight line) connecting z1 and z2."""
    if np.isclose(np.cross([z1.real, z1.imag], [z2.real, z2.imag]), 0):
        # Line passes through origin; it's a straight line segment
        t = np.linspace(0, 1, num_points)
        return z1 + t * (z2 - z1)
        
    # Standard non-Euclidean geodesic circle calculation
    # Reflect points across the unit circle boundary to find the center
    z1_inv = 1.0 / np.conj(z1)
    
    # Calculate circle center passing through z1, z2, and z1_inv
    A = np.array([
        [z1.real, z1.imag, 1],
        [z2.real, z2.imag, 1],
        [z1_inv.real, z1_inv.imag, 1]
    ])
    B = np.array([z1.real**2 + z1.imag**2, z2.real**2 + z2.imag**2, z1_inv.real**2 + z1_inv.imag**2])
    X = np.linalg.solve(A, B)
    
    center = (X[0] + 1j*X[1]) / 2.0
    radius = np.sqrt(np.abs(center)**2 - 1.0)
    
    # Generate points along the arc between the two angles
    a1 = np.angle(z1 - center)
    a2 = np.angle(z2 - center)
    
    # Ensure short path interpolation
    if abs(a2 - a1) > np.pi:
        if a2 > a1: a1 += 2 * np.pi
        else: a2 += 2 * np.pi
        
    angles = np.linspace(a1, a2, num_points)
    return center + radius * np.exp(1j * angles)

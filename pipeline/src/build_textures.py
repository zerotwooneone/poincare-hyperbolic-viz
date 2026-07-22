import os
import numpy as np
from PIL import Image

def generate_gradient_lut():
    """Generates a precise gradient lookup texture to map disk radius to deep neon color vectors."""
    width = 256
    height = 1
    image = Image.new("RGB", (width, height))
    
    for x in range(width):
        t = x / float(width - 1)
        
        # Cyberpunk neon interpolation profiles (Magenta -> Cyan -> Laser Purple)
        r = int((0.9 - 0.5 * np.sin(t * np.pi)) * 255)
        g = int((0.0 + 0.8 * t) * 255)
        b = int((0.7 + 0.3 * np.cos(t * np.pi)) * 255)
        
        image.putpixel((x, 0), (max(0, min(255, r)), max(0, min(255, g)), max(0, min(255, b))))
        
    return image

if __name__ == "__main__":
    print("🎨 Generating Color Lookup Textures (LUTs)...")
    lut_img = generate_gradient_lut()
    
    out_dir = "../public/generated/textures"
    os.makedirs(out_dir, exist_ok=True)
    lut_img.save(os.path.join(out_dir, "space_gradient.png"))
    print(f"✅ Exported lookup color chart to {out_dir}/space_gradient.png")

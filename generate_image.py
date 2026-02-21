"""
Z.AI Image Generator for Hawladar Agro Portfolio
Generates images using Z.AI's CogView-4 model with custom dimensions.
"""

import requests
import os
from typing import Optional, Tuple

# Your Z.AI API Key
Z_AI_API_KEY = "f139dbff05da4ca489abce722225e1b4.MClxjfinGZz5NWml"

# API Endpoint
API_URL = "https://api.z.ai/api/paas/v4/images/generations"

# Common image dimensions for web projects
PRESET_DIMENSIONS = {
    "logo": (512, 512),
    "hero": (1920, 1080),
    "hero_wide": (2048, 1152),
    "hero_tall": (1152, 864),
    "project_hero": (1344, 768),
    "project_tall": (768, 1344),
    "team_photo": (864, 1152),
    "blog_featured": (1440, 720),
    "gallery": (1024, 1024),
    "thumbnail": (512, 512),
    "card": (720, 720),
    "banner": (2048, 720),
}

# Output directory
OUTPUT_DIR = "static/images/generated"


def generate_image(
    prompt: str,
    width: int = 1024,
    height: int = 1024,
    quality: str = "standard",
    filename: Optional[str] = None,
    model: str = "cogview-4-250304"
) -> str:
    """
    Generate an image using Z.AI's CogView-4 model.

    Args:
        prompt: Text description of the image to generate
        width: Image width (512-2048, must be divisible by 16)
        height: Image height (512-2048, must be divisible by 16)
        quality: 'standard' (5-10s) or 'hd' (20s)
        filename: Custom filename (without extension)
        model: Model to use (default: cogview-4-250304)

    Returns:
        Path to the saved image file

    Raises:
        Exception: If API request fails
    """
    # Validate dimensions
    if not (512 <= width <= 2048 and 512 <= height <= 2048):
        raise ValueError("Width and height must be between 512 and 2048 pixels")
    if width % 16 != 0 or height % 16 != 0:
        raise ValueError("Width and height must be divisible by 16")

    # Prepare request
    headers = {
        "Authorization": f"Bearer {Z_AI_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": model,
        "prompt": prompt,
        "size": f"{width}x{height}",
        "quality": quality
    }

    print(f"Generating image: {width}x{height} ({quality} quality)")
    print(f"Prompt: {prompt}")

    # Make API request
    response = requests.post(API_URL, headers=headers, json=payload)
    response.raise_for_status()

    # Parse response
    data = response.json()
    image_url = data["data"][0]["url"]

    # Download image
    img_response = requests.get(image_url)
    img_response.raise_for_status()

    # Create output directory if needed
    os.makedirs(OUTPUT_DIR, exist_ok=True)

    # Generate filename
    if filename is None:
        filename = f"generated_{width}x{height}"
    filepath = os.path.join(OUTPUT_DIR, f"{filename}.jpg")

    # Save image
    with open(filepath, "wb") as f:
        f.write(img_response.content)

    print(f"Image saved to: {filepath}")
    return filepath


def generate_for_preset(
    preset_name: str,
    prompt: str,
    quality: str = "standard",
    filename: Optional[str] = None
) -> str:
    """
    Generate an image using a preset dimension.

    Args:
        preset_name: Name of the preset (e.g., 'logo', 'hero', 'team_photo')
        prompt: Text description of the image to generate
        quality: 'standard' or 'hd'
        filename: Custom filename

    Returns:
        Path to the saved image file
    """
    if preset_name not in PRESET_DIMENSIONS:
        raise ValueError(f"Unknown preset: {preset_name}. Available: {list(PRESET_DIMENSIONS.keys())}")

    width, height = PRESET_DIMENSIONS[preset_name]
    return generate_image(prompt, width, height, quality, filename)


def list_presets() -> None:
    """Print available preset dimensions."""
    print("\n=== Available Preset Dimensions ===")
    for name, (width, height) in PRESET_DIMENSIONS.items():
        print(f"{name:20} -> {width}x{height}")
    print()


# Example usage
if __name__ == "__main__":
    list_presets()

    # Example: Generate a hero image for the agricultural portfolio
    example_prompts = {
        "logo": "A modern, clean logo design for an agricultural company called 'Hawladar Agro' featuring a stylized cow or farm element, minimal design, professional, green and gold colors, white background",
        "hero": "A beautiful, modern cattle farm in rural Bangladesh with healthy cows grazing in green pastures, blue sky with white clouds, professional photography style, high quality, warm lighting",
        "hero_wide": "Wide panoramic view of a modern dairy farm with multiple barns, cows grazing in lush green fields, mountains in the background, golden hour lighting, professional photography",
        "team_photo": "Professional portrait of a Bangladeshi agricultural expert wearing traditional attire, standing in a farm setting with cows in the background, confident expression, professional lighting",
        "blog_featured": "A close-up shot of healthy dairy cows eating grass in a modern farm, soft natural lighting, green pasture background, professional agricultural photography",
    }

    print("\n=== Example Prompts ===")
    for preset, prompt in example_prompts.items():
        print(f"\n{preset.upper()}:")
        print(f"  {prompt}")

    print("\n\n=== Usage Examples ===")
    print("Generate with preset:")
    print('  generate_for_preset("hero", "your prompt here")')
    print("\nGenerate with custom dimensions:")
    print('  generate_image("your prompt here", width=1920, height=1080)')

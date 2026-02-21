# Z.AI Image Generation Guide for Hawladar Agro Portfolio

This guide explains how to generate perfectly fitted images for your website using Z.AI's CogView-4 model.

## Prerequisites

1. **Python 3.8+** installed
2. **Z.AI API Key** (already configured in the script)
3. Install required packages:
   ```bash
   pip install -r requirements_image_gen.txt
   ```

## Quick Start

### 1. List Available Preset Dimensions

```bash
python generate_image.py
```

This will show all available presets:
- `logo` (512x512) - For logos and icons
- `hero` (1920x1080) - Standard hero banners
- `hero_wide` (2048x1152) - Wide hero banners
- `hero_tall` (1152x864) - Tall hero banners
- `project_hero` (1344x768) - Project showcase images
- `project_tall` (768x1344) - Tall project images
- `team_photo` (864x1152) - Team member portraits
- `blog_featured` (1440x720) - Blog featured images
- `gallery` (1024x1024) - Square gallery images
- `thumbnail` (512x512) - Small thumbnails
- `card` (720x720) - Card images
- `banner` (2048x720) - Wide banners

### 2. Generate Images with Presets

```python
from generate_image import generate_for_preset

# Generate a hero image
generate_for_preset(
    "hero",
    "A beautiful modern cattle farm in rural Bangladesh with healthy cows grazing in green pastures, blue sky with white clouds, professional photography style, high quality, warm lighting",
    quality="standard",
    filename="hero_farm_view"
)

# Generate a team photo
generate_for_preset(
    "team_photo",
    "Professional portrait of a Bangladeshi agricultural expert wearing traditional attire, standing in a farm setting with cows in the background, confident expression, professional lighting",
    quality="hd",
    filename="team_expert_1"
)
```

### 3. Generate with Custom Dimensions

```python
from generate_image import generate_image

# Generate a custom-sized image
generate_image(
    prompt="A close-up of healthy dairy cows eating grass",
    width=1600,
    height=900,
    quality="standard",
    filename="cows_closeup"
)
```

## Using in Django Templates

After generating images, reference them in your templates:

```html
<!-- Hero Image -->
<img src="{% static 'images/generated/hero_farm_view.jpg' %}" alt="Farm Hero">

<!-- Team Photo -->
<img src="{% static 'images/generated/team_expert_1.jpg' %}" alt="Team Member">

<!-- Project Image -->
<img src="{% static 'images/generated/project_hero.jpg' %}" alt="Project">
```

## Quality Settings

- **`standard`** (default): Generates images in 5-10 seconds. Good for most use cases.
- **`hd`**: Generates more detailed images in ~20 seconds. Use for hero images and featured content.

## Prompt Writing Tips

For best results with agricultural/farm themes:

1. **Be Specific**: Include details about lighting, composition, and style
   ```
   "Professional photography of a modern dairy farm, golden hour lighting, wide angle shot showing multiple barns and grazing cows"
   ```

2. **Include Style Keywords**: 
   - "professional photography style"
   - "high quality"
   - "warm lighting"
   - "soft natural light"

3. **Specify Context**:
   - "rural Bangladesh setting"
   - "modern farm infrastructure"
   - "healthy livestock"

4. **Color Palette**:
   - "green and gold colors"
   - "warm earth tones"
   - "natural colors"

## Example Prompts for Hawladar Agro

### Logo
```
"A modern, clean logo design for an agricultural company called 'Hawladar Agro' featuring a stylized cow or farm element, minimal design, professional, green and gold colors, white background"
```

### Hero Banner
```
"A beautiful, modern cattle farm in rural Bangladesh with healthy cows grazing in green pastures, blue sky with white clouds, professional photography style, high quality, warm lighting"
```

### Project Showcase
```
"Modern dairy farm facility in Bangladesh showing clean barns, healthy cows, and professional farming equipment, bright daylight, wide angle view"
```

### Team Photo
```
"Professional portrait of a Bangladeshi agricultural expert wearing traditional attire, standing in a farm setting with cows in the background, confident expression, professional lighting"
```

### Blog Featured Image
```
"A close-up shot of healthy dairy cows eating grass in a modern farm, soft natural lighting, green pasture background, professional agricultural photography"
```

### Gallery Image
```
"Beautiful aerial view of a modern cattle farm in Bangladesh, showing green pastures, barns, and grazing cows, professional photography, high quality"
```

## API Limits & Quota

Check your Z.AI subscription plan for image generation quotas:
- Image URLs expire after 30 days
- Download and save images promptly
- Consider storing generated images in your static folder

## Troubleshooting

### Error: "Width and height must be divisible by 16"
- Ensure dimensions are multiples of 16 (e.g., 1024, 1088, 1152, 1344, 1440, 2048)

### Error: "Invalid API Key"
- Verify your API key in `generate_image.py`
- Check if your subscription is active

### Image quality issues
- Try using `quality="hd"` for better results
- Refine your prompt with more specific details
- Regenerate with slight variations

## Integration with Roo Code

You can also use the `generate_image` tool directly in Roo Code conversations:

```
Generate an image for my hero section with the following specifications:
- Size: 1920x1080
- Content: Modern cattle farm in Bangladesh with grazing cows
- Style: Professional photography, warm lighting
- Save to: static/images/generated/hero.jpg
```

Roo Code will automatically call the image generation API and save the image to your project.

# Quick Start: Image Generation with Z.AI

## Setup Complete ✅

You now have everything needed to generate images for your Hawladar Agro portfolio:

### Files Created:
- [`generate_image.py`](generate_image.py) - Main image generation script
- [`IMAGE_GENERATION_GUIDE.md`](IMAGE_GENERATION_GUIDE.md) - Comprehensive guide
- [`requirements_image_gen.txt`](requirements_image_gen.txt) - Dependencies

## Three Ways to Generate Images:

### 1. Using Python Script (Recommended)

```bash
# Generate a hero image
python -c "from generate_image import generate_for_preset; generate_for_preset('hero', 'Your prompt here', filename='my_hero')"

# Generate with custom dimensions
python -c "from generate_image import generate_image; generate_image('Your prompt', width=1920, height=1080, filename='custom_image')"
```

### 2. Using Roo Code (Easiest!)

Just ask Roo Code to generate an image:

```
Generate an image for my hero section:
- Size: 1920x1080
- Prompt: A modern cattle farm in Bangladesh
- Save to: static/images/generated/hero.jpg
```

### 3. Interactive Python

```python
from generate_image import generate_for_preset, generate_image, list_presets

# List all presets
list_presets()

# Generate with preset
generate_for_preset("hero", "Your prompt", quality="hd", filename="hero")

# Generate custom size
generate_image("Your prompt", width=1600, height=900, filename="custom")
```

## Available Presets:

| Preset | Size | Use Case |
|--------|------|----------|
| `logo` | 512x512 | Logos, icons |
| `hero` | 1920x1080 | Hero banners |
| `hero_wide` | 2048x1152 | Wide banners |
| `hero_tall` | 1152x864 | Tall banners |
| `project_hero` | 1344x768 | Project showcases |
| `project_tall` | 768x1344 | Tall projects |
| `team_photo` | 864x1152 | Team portraits |
| `blog_featured` | 1440x720 | Blog images |
| `gallery` | 1024x1024 | Gallery squares |
| `thumbnail` | 512x512 | Thumbnails |
| `card` | 720x720 | Card images |
| `banner` | 2048x720 | Wide banners |

## Quality Settings:

- **`standard`** (5-10 seconds) - Fast, good quality
- **`hd`** (~20 seconds) - Best quality, use for hero images

## Example Prompts for Your Project:

### Hero Image:
```
"A beautiful, modern cattle farm in rural Bangladesh with healthy cows grazing in green pastures, blue sky with white clouds, professional photography style, high quality, warm lighting"
```

### Team Photo:
```
"Professional portrait of a Bangladeshi agricultural expert wearing traditional attire, standing in a farm setting with cows in the background, confident expression, professional lighting"
```

### Project Showcase:
```
"Modern dairy farm facility in Bangladesh showing clean barns, healthy cows, and professional farming equipment, bright daylight, wide angle view"
```

## Using Generated Images in Django:

After generating, images are saved to `static/images/generated/`:

```html
<!-- In your template -->
<img src="{% static 'images/generated/your_image.jpg' %}" alt="Description">
```

## Important Notes:

1. **API Rate Limits**: The Z.AI API has rate limits. If you get a 429 error, wait a few minutes before trying again.
2. **Image URLs**: Generated image URLs expire after 30 days. The script automatically downloads and saves images to your static folder.
3. **Dimensions**: All dimensions must be divisible by 16 (the presets already handle this).

## Troubleshooting:

| Error | Solution |
|-------|----------|
| 429 Too Many Requests | Wait a few minutes and retry |
| Invalid API Key | Check your API key in generate_image.py |
| Dimensions not divisible by 16 | Use presets or ensure width/height are multiples of 16 |

## Next Steps:

1. Review [`IMAGE_GENERATION_GUIDE.md`](IMAGE_GENERATION_GUIDE.md) for detailed documentation
2. Start generating images for your portfolio
3. Replace placeholder images with generated ones
4. Update your Django templates to use the new images

Happy generating! 🎨

# Freshie Farm - Pixel Perfect Clone

A pixel-perfect replica of the Freshie Farm website (https://www.freshie.farm/), built with pure HTML, CSS, and JavaScript. This clone faithfully reproduces the original site's layout, typography, color palette, spacing, and responsiveness across all viewports.

## 🎨 Design Specifications

### Typography
- **Primary Font**: 'Baloo Da 2' (Google Fonts) - A Bengali-friendly rounded font
- **Font Weights**: 400 (regular), 500 (medium), 600 (semibold), 700 (bold), 800 (extrabold)
- **Headings**: h1 (48px), h2 (36px), h3 (28px)
- **Body Text**: 16-18px with 1.7 line height

### Color Palette
```css
--primary-green: #017B46
--primary-yellow: #FECE00
--accent-yellow: #FFCC00
--text-dark: #333333
--text-light: #666666
--white: #ffffff
--border-color: #d8d8d8
```

### Layout Structure
1. **Header/Navigation** - Fixed position with logo and navigation menu
2. **Hero Section** - Centered content with gradient background
3. **5000 Acre Project Section** - Two-column layout with floating animation
4. **Investment Section** - Three-card grid with hover effects
5. **Media Section** - Logo showcase with grayscale-to-color hover
6. **Current Projects Section** - Project cards with custom bullets
7. **Crowd Funding Section** - Stats grid and content blocks
8. **Location Section** - Centered content with project images
9. **Writings Section** - Blog card grid
10. **Footer** - Three-column layout with social links

### Responsive Breakpoints
- **Desktop**: 981px and above
- **Tablet**: 768px - 980px
- **Mobile**: 479px - 767px
- **Small Mobile**: Below 479px

## 📁 Project Structure

```
freshie-farm-clone/
├── index.html          # Main HTML structure
├── styles.css          # Complete styling with design tokens
├── script.js           # JavaScript interactivity
└── README.md           # Project documentation
```

## 🚀 Features Implemented

### HTML Features
- Semantic HTML5 structure
- Proper meta tags for SEO and responsiveness
- Bengali language content support
- Accessible markup with ARIA labels
- Optimized image loading

### CSS Features
- CSS custom properties (variables) for design tokens
- Mobile-first responsive design
- Smooth transitions and hover effects
- Floating animation keyframes
- Gradient backgrounds
- Grid and flexbox layouts
- Custom bullet points
- Print styles

### JavaScript Features
- Mobile menu toggle with hamburger animation
- Scroll-to-top button with visibility toggle
- Smooth scrolling for navigation links
- Intersection Observer for scroll animations
- Header shadow on scroll
- Parallax effect for hero section
- Counter animation for statistics
- Active navigation link highlighting
- Image lightbox for blog images
- Debounce and throttle utility functions

## 🎯 Pixel-Perfect Accuracy

### Exact Replication Details
- **Typography**: Matches original font family, sizes, and weights
- **Colors**: Exact hex codes from original site
- **Spacing**: Margins and padding match original measurements
- **Layout**: Grid structures and alignments identical to original
- **Animations**: Floating effect and transitions match original timing
- **Responsiveness**: Breakpoints and mobile layouts match original behavior

### Design Tokens Extracted from Original
- Primary green: `#017B46`
- Primary yellow: `#FECE00`
- Font family: `'Baloo Da 2', cursive`
- Container max-width: `1200px`
- Section padding: `80px 0`
- Card border-radius: `10px`
- Box-shadow: `0 5px 20px rgba(0, 0, 0, 0.08)`

## 📱 Responsive Behavior

### Desktop (981px+)
- Full grid layouts (3 columns for cards)
- Horizontal navigation menu
- Full-width hero section
- Large typography sizes

### Tablet (768px - 980px)
- 2-column grids for cards
- Adjusted typography sizes
- Maintained navigation menu
- Optimized spacing

### Mobile (479px - 767px)
- Single-column layouts
- Hamburger menu for navigation
- Reduced font sizes
- Touch-friendly spacing
- Scroll-to-top button repositioned

### Small Mobile (< 479px)
- Further reduced font sizes
- Minimal padding
- Optimized for very small screens

## 🛠️ Installation & Usage

### Prerequisites
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No build tools or dependencies required

### Quick Start
1. Clone or download this repository
2. Open `index.html` in your web browser
3. The site will load with all styles and functionality

### Local Development
```bash
# Using a simple HTTP server (Python)
python -m http.server 8000

# Using Node.js http-server
npx http-server

# Using PHP built-in server
php -S localhost:8000
```

Then navigate to `http://localhost:8000` in your browser.

## 🎨 Customization

### Changing Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-green: #017B46;  /* Change this */
    --primary-yellow: #FECE00; /* Change this */
    /* ... other variables */
}
```

### Modifying Content
Edit the HTML structure in `index.html` to update text, images, or sections.

### Adding New Sections
1. Add HTML markup in `index.html`
2. Add corresponding styles in `styles.css`
3. Add any JavaScript functionality in `script.js`

## 📊 Performance Optimizations

- **Lazy Loading**: Images use native lazy loading
- **CSS Optimization**: Minimal selectors, efficient specificity
- **JavaScript**: Debounced and throttled scroll events
- **Font Loading**: Preconnect to Google Fonts
- **No External Dependencies**: Pure vanilla implementation

## 🌐 Browser Compatibility

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## 🔧 Technical Details

### HTML5 Semantic Elements Used
- `<header>` - Site header and navigation
- `<nav>` - Navigation menu
- `<section>` - Content sections
- `<article>` - Blog posts
- `<footer>` - Site footer

### CSS Features
- CSS Custom Properties (Variables)
- Flexbox and Grid layouts
- CSS Transitions and Animations
- Media Queries for responsiveness
- CSS Transforms
- Box Shadow effects

### JavaScript APIs Used
- Intersection Observer API
- Event Listeners
- DOM Manipulation
- Window Scroll Events
- Smooth Scrolling API

## 📝 Notes

### Original Website Analysis
- Built with WordPress and Divi theme
- Uses Bengali language content
- Features agricultural/farming theme
- Crowd funding model for investments
- Multiple project locations (Bangladesh, Uganda)

### Clone Limitations
- Images are loaded from original website URLs
- Some dynamic features (like booking forms) are not included
- Backend functionality is not replicated (frontend only)

## 🤝 Contributing

This is a pixel-perfect clone project. For improvements:
1. Maintain the original design fidelity
2. Test across all viewport sizes
3. Ensure code follows best practices
4. Document any changes made

## 📄 License

This is a clone project for educational purposes. The original website content belongs to Freshie Farm.

## 👨‍💻 Development

Built with:
- HTML5
- CSS3 (with modern features)
- Vanilla JavaScript (ES6+)

No frameworks or libraries were used to ensure maximum performance and minimal dependencies.

## 📞 Contact

For questions about this clone project, please refer to the original website at https://www.freshie.farm/

---

**Note**: This is a frontend clone only. Backend functionality, database connections, and server-side features are not included.

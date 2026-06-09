# BubeoStore - Project Architecture Guide

## Overview

Your website has been refactored from a single `index.html` file into a well-organized, maintainable project structure. This makes it easier to manage, scale, and collaborate on the code

---

## 📁 Project Structure

```
bubeo-store/
├── index.html              # Main HTML page (structure only)
├── css/
│   └── style.css           # All styling rules
├── js/
│   ├── products.js         # Product data and color/size configs
│   └── main.js             # Application logic and interactivity
├── assets/
│   └── images/             # Product images folder
│       ├── batman/
│       ├── baya_loang_dao_sua/
│       ├── baya_loang_xanh/
│       └── ... (other product folders)
├── README.md               # This file
```

---

## 📄 File Descriptions

### `index.html` - Page Structure
**Purpose:** Contains only the HTML structure and semantic markup.

**What's Inside:**
- Page metadata (title, description, viewport settings)
- Navigation menu
- Hero section
- Products filter and grid container
- Contact section
- Footer
- Links to external CSS and JavaScript files

**Key Points:**
- No CSS or JavaScript code embedded
- Clean, semantic HTML5 structure
- Accessibility features (aria-labels, semantic elements)
- All dynamic content is rendered by JavaScript

---

### `css/style.css` - Styling
**Purpose:** Contains all visual styling for the entire website.

**What's Inside:**
- CSS custom properties (variables) for colors and spacing
- Typography rules
- Layout and grid systems
- Component styles (buttons, cards, forms, etc.)
- Responsive design media queries
- Animations and transitions

**Key Points:**
- Organized with clear sections (Header, Hero, Products, Footer, etc.)
- Uses CSS custom properties for easy theme customization
- Fully responsive (mobile, tablet, desktop)
- No embedded JavaScript or inline styles

---

### `js/products.js` - Product Data & Configuration
**Purpose:** Stores all product information and configuration data.

**What's Inside:**
- `products` array: 20 product objects with full details
- `commonColors` array: Available colors with hex values
- `commonSizes` array: Available sizes
- `colorMap` object: Quick lookup for color values

**Product Object Structure:**
```javascript
{
  id: 1,
  name: "Product Name",
  category: "classic",           // or "collab"
  badge: "Bán chạy",             // or "Hàng mới"
  price: "200k",
  description: "Product description",
  sizes: ["36-37", "37-38", ...],
  colors: ["Hồng", "Trắng", ...],
  images: ["path/to/image1.jpg", "path/to/image2.jpg", ...]
}
```

**How to Add Products:**
1. Open `js/products.js`
2. Add a new object to the `products` array
3. Fill in all required fields
4. Specify the correct image paths
5. Save the file

**Example:**
```javascript
{
  id: 21,
  name: "My New Product",
  category: "classic",
  badge: "Hàng mới",
  price: "150k",
  description: "This is my new product description.",
  sizes: ["36-37", "37-38", "38-39", "39-40", "40-41", "41-42", "42-43"],
  colors: ["Hồng", "Xanh"],
  images: ["images/my_product/image1.jpg", "images/my_product/image2.jpg"]
}
```

---

### `js/main.js` - Application Logic
**Purpose:** Handles all interactive features and dynamic rendering.

**What's Inside:**
- `renderProducts()` - Renders products to the grid based on filter
- `renderVariants()` - Renders size and color options
- Event listeners for:
  - Filter button clicks
  - Mobile menu toggle
  - Navigation link clicks
  - Form submission
- Dynamic year update in footer

**Key Functions:**

1. **`renderProducts(category)`**
   - Filters products by category
   - Generates HTML for each product
   - Displays images, prices, sizes, and colors
   - Updates product grid on the page

2. **`renderVariants()`**
   - Renders available sizes and colors
   - Currently set up for future expansion

**Dependencies:**
- Requires `products.js` to be loaded first
- Runs on page load (DOMContentLoaded event)

---

## 🔗 How Files Connect

```
index.html
    ├─ Links to: css/style.css
    │             (Apply all visual styles)
    │
    └─ Links to: js/products.js
                 (Load product data & configuration)
                   ↓
                 js/main.js
                 (Use data to render and handle interactions)
```

**Execution Flow:**
1. Browser loads `index.html`
2. HTML loads `css/style.css` → styles applied
3. HTML loads `js/products.js` → product data loaded into memory
4. HTML loads `js/main.js` → JavaScript executes when DOM is ready
5. `main.js` calls `renderProducts()` → products displayed on page
6. User interactions trigger event listeners → dynamic updates

---

## 🎨 Customization Guide

### Change Colors
Edit the color variables at the top of `css/style.css`:
```css
:root {
  --pink: #ff8fc2;
  --text: #30242b;
  --bg: #fff8fb;
  /* ... other colors ... */
}
```

### Add a New Product
1. Open `js/products.js`
2. Add a new object to the `products` array (see example above)
3. Make sure image paths exist in `images/` folder
4. Refresh the website

### Add a New Product Category
1. Edit `js/products.js` - add category value to products
2. Edit `index.html` - add new filter button in products section:
```html
<button class="filter-btn" data-filter="your-category">Your Category</button>
```
3. The filter will automatically work!

### Modify Styling
Edit `css/style.css` directly. All changes apply globally:
- Button colors: search for `.btn-primary`
- Card styles: search for `.product-card`
- Fonts: look at `body` and heading rules

---

## 📱 Responsive Design

The website is fully responsive:
- **Mobile** (< 700px): 2-column product grid
- **Tablet** (700px - 960px): 2-column grid, improved spacing
- **Desktop** (960px+): 4-column grid, navigation bar horizontal

All responsive styles are in `css/style.css` using `@media` queries.

---

## Benefits of This Structure

| Aspect | Before | After |
|--------|--------|-------|
| **File Size** | One large file (1000+ lines) | Organized, modular files |
| **Maintainability** | Hard to find and edit code | Easy to locate what you need |
| **Reusability** | Can't reuse CSS/JS elsewhere | Files can be used in other projects |
| **Collaboration** | Multiple people working on same file = conflicts | Different people can work on different files |
| **Performance** | Slight (browsers can cache separate files) | Better browser caching |
| **Scalability** | Difficult to add features | Easy to add new products and features |

---

## 🚀 How to Use

### View Website
Simply open `index.html` in your browser. Everything should work normally!

### Add Product Images
1. Create a folder under `images/` with a descriptive name (e.g., `images/my_product/`)
2. Place product images in that folder
3. Update the `images` array in the product object to include the paths

### Update Product Information
1. Open `js/products.js`
2. Find the product you want to edit
3. Update the relevant fields (name, price, description, colors, sizes, etc.)
4. Refresh the website

### Change Website Theme
1. Open `css/style.css`
2. Modify the CSS custom properties in the `:root` selector
3. Adjust color values, fonts, spacing, etc.
4. All changes apply site-wide

---

## 📋 Best Practices

1. **Always edit `js/products.js`** for product data - don't hardcode product info elsewhere
2. **Use CSS custom properties** - makes theming easy
3. **Keep image paths consistent** - use the `images/` folder structure
4. **Use semantic HTML** - improves accessibility and SEO
5. **Test on mobile** - use browser dev tools to test responsive design
6. **Comment your code** - future you will thank you
7. **Validate HTML** - use https://validator.w3.org/ to check for errors

---

## 🔧 Troubleshooting

**Products not showing?**
- Check that `js/products.js` is loaded (look in browser console)
- Verify image paths are correct

**Styles not applying?**
- Check that `css/style.css` is linked correctly
- Clear browser cache (Ctrl+F5 or Cmd+Shift+R)

**JavaScript errors?**
- Open browser console (F12 → Console tab)
- Check for red error messages
- Verify `js/products.js` loads before `js/main.js`

---

## 📞 Next Steps

You can now:
- Add/edit products easily
- Modify styles without touching HTML
- Update functionality in `main.js`
- Keep code organized and maintainable
- Scale the project as needed

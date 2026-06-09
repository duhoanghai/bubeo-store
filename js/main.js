/**
 * BUBEO STORE - MAIN APPLICATION LOGIC
 * 
 * This file handles all interactive features:
 * - Product filtering and rendering
 * - Mobile menu toggle
 * - Navigation
 * - Form handling
 * 
 * Dependencies:
 * - products.js (product data, colors, sizes)
 */

document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const productGrid = document.getElementById("productGrid");
  const filterButtons = document.querySelectorAll(".filter-btn");
  const navLinks = document.getElementById("navLinks");
  const menuToggle = document.getElementById("menuToggle");

  /**
   * Renders products to the grid based on selected category
   * @param {string} category - Product category to filter by ("all" shows all products)
   */
  function renderProducts(category = "all") {
    const filteredProducts = category === "all"
      ? products
      : products.filter(product => product.category === category);

    if (productGrid) {
      productGrid.innerHTML = filteredProducts.map(product => {
        const images = product.images || [product.image];

        return `
          <article id="product-${product.id}" class="product-card">
            <div class="product-image-wrap">
              <div class="product-gallery" aria-label="Vuốt để xem ảnh của ${product.name}">
                ${images.map((src, index) => `
                  <img src="${src}" alt="${product.name} ảnh ${index + 1}" loading="lazy" />
                `).join("")}
              </div>
              <span class="product-badge">${product.badge}</span>
            </div>
            <div class="product-content">
              <div class="product-topline">
                <h3>${product.name}</h3>
                <span class="price">${product.price}</span>
              </div>
              <p class="product-desc">${product.description}</p>

              <div class="meta-group">
                <span class="meta-label">Size</span>
                <div class="badge-row">
                  ${product.sizes.slice(0, 6).map(size => `<span class="badge">${size}</span>`).join("")}
                  ${product.sizes.length > 6 ? `<span class="badge">+${product.sizes.length - 6} size khác</span>` : ""}
                </div>
              </div>

              <div class="meta-group">
                <span class="meta-label">Màu sắc</span>
                <div class="badge-row" aria-label="Màu hiện có của ${product.name}">
                  ${product.colors.map(color => `<span class="color-dot" title="${color}" style="background:${colorMap[color] || '#ffd6e8'}"></span>`).join("")}
                </div>
              </div>
            </div>
          </article>
        `;
      }).join("");
    }
  }

  /**
   * Renders size and color options
   * (Currently not used in this version but kept for future expansion)
   */
  function renderVariants() {
    const sizeCloud = document.getElementById("sizeCloud");
    if (sizeCloud) {
      sizeCloud.innerHTML = commonSizes
        .map(size => `<span class="size-chip">${size}</span>`)
        .join("");
    }

    const colorCloud = document.getElementById("colorCloud");
    if (colorCloud) {
      colorCloud.innerHTML = commonColors
        .map(color => `
          <span class="color-chip">
            <span class="color-dot" style="background:${color.value}"></span>
            ${color.name}
          </span>
        `)
        .join("");
    }
  }

  // Event listener: Filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener("click", () => {
      filterButtons.forEach(btn => btn.classList.remove("active"));
      button.classList.add("active");
      renderProducts(button.dataset.filter);
    });
  });

  // Event listener: Mobile menu toggle
  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    menuToggle.classList.toggle("active", isOpen);
    menuToggle.setAttribute("aria-expanded", String(isOpen));
  });

  // Event listener: Close menu when navigation link is clicked
  navLinks.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.classList.remove("active");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });

  // Event listener: Contact form submission
  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const formNote = document.getElementById("formNote");
      if (formNote) {
        formNote.textContent =
          "Đây chỉ là bản xem trước tin nhắn: hãy kết nối form với Formspree, Netlify Forms hoặc backend riêng để nhận yêu cầu từ khách hàng.";
      }
    });
  }

  // Set current year in footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Initial render
  renderProducts();
  renderVariants();
});

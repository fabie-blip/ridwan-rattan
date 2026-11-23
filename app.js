/**
 * ==============================================================================
 * MAIN APPLICATION LOGIC (APP.JS) - PAK RIDWAN CIREBON RATTAN EXPORT
 * ==============================================================================
 * Front-End PSAS Project - Grade X PPLG (Web Development)
 *
 * CORE FEATURES:
 * 1. Dynamic rendering of rattan product catalog & variants
 * 2. Interactive product category filtering (All / Furniture / Lighting / Storage)
 * 3. Dynamic FAQ Accordion rendering
 * 4. Calculator dropdowns & radio control initialization
 * 5. Real-time calculation (Subtotal, Export Shipping, Doc Fees, Grand Total)
 * 6. Estimated arrival date calculation (Production Lead + Transit Time)
 * 7. Automatic pre-formatted WhatsApp inquiry link generator
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  "use strict";

  // Verify that RATTAN_DATA from data.js is loaded
  if (typeof RATTAN_DATA === "undefined") {
    console.error("Error: RATTAN_DATA object not found! Ensure js/data.js is loaded before js/app.js.");
    return;
  }

  /* --------------------------------------------------------------------------
   * 1. DOM ELEMENT REFERENCES
   * -------------------------------------------------------------------------- */
  // Navigation
  const navbarCollapseEl = document.getElementById("navbarContent");

  // Catalog
  const productGridContainer = document.getElementById("productGridContainer");
  const categoryFilterContainer = document.getElementById("categoryFilterContainer");

  // Calculator Form Inputs
  const exportOrderForm = document.getElementById("exportOrderForm");
  const calcProductSelect = document.getElementById("calcProductSelect");
  const calcVariantSelect = document.getElementById("calcVariantSelect");
  const calcVariantHint = document.getElementById("calcVariantHint");
  const calcQuantityInput = document.getElementById("calcQuantityInput");
  const btnQtyMinus = document.getElementById("btnQtyMinus");
  const btnQtyPlus = document.getElementById("btnQtyPlus");
  const calcDestinationSelect = document.getElementById("calcDestinationSelect");
  const shippingMethodContainer = document.getElementById("shippingMethodContainer");

  // Calculator Summary Outputs
  const summaryProductName = document.getElementById("summaryProductName");
  const summaryVariantName = document.getElementById("summaryVariantName");
  const summaryStockBadge = document.getElementById("summaryStockBadge");
  const summaryUnitPrice = document.getElementById("summaryUnitPrice");
  const summaryQuantity = document.getElementById("summaryQuantity");
  const summarySubtotal = document.getElementById("summarySubtotal");
  const summaryDestination = document.getElementById("summaryDestination");
  const summaryMethod = document.getElementById("summaryMethod");
  const summaryShippingCost = document.getElementById("summaryShippingCost");
  const summaryDocFee = document.getElementById("summaryDocFee");
  const summaryGrandTotalUSD = document.getElementById("summaryGrandTotalUSD");
  const summaryGrandTotalIDR = document.getElementById("summaryGrandTotalIDR");
  const summaryLeadTime = document.getElementById("summaryLeadTime");
  const summaryArrivalDate = document.getElementById("summaryArrivalDate");
  const btnWhatsAppInquiry = document.getElementById("btnWhatsAppInquiry");

  // FAQ Container
  const faqAccordion = document.getElementById("faqAccordion");

  /* --------------------------------------------------------------------------
   * 2. HELPER FUNCTIONS
   * -------------------------------------------------------------------------- */

  /**
   * Format number as US Dollars (e.g., 1250 -> "$1,250")
   */
  function formatUSD(amount) {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Format number as Indonesian Rupiah (e.g., 1580000 -> "Rp 1.580.000")
   */
  function formatIDR(amount) {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0
    }).format(amount);
  }

  /**
   * Add days to current date and return formatted English date string
   * Example: "Dec 12, 2026"
   */
  function getFutureFormattedDate(daysToAdd) {
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + daysToAdd);
    return targetDate.toLocaleDateString("en-US", {
      day: "numeric",
      month: "short",
      year: "numeric"
    });
  }

  /* --------------------------------------------------------------------------
   * 3. RENDER PRODUCT CATALOG TO DOM
   * -------------------------------------------------------------------------- */

  /**
   * Render product cards filtered by category
   * @param {string} filterCategory - 'all' or specific category slug
   */
  function renderProductCatalog(filterCategory = "all") {
    if (!productGridContainer) return;

    const filteredProducts = filterCategory === "all"
      ? RATTAN_DATA.products
      : RATTAN_DATA.products.filter(p => p.category === filterCategory);

    if (filteredProducts.length === 0) {
      productGridContainer.innerHTML = `
        <div class="col-12 text-center py-5">
          <p class="text-muted">No products available in this category.</p>
        </div>
      `;
      return;
    }

    let catalogHTML = "";
    filteredProducts.forEach(product => {
      const variantsBadges = product.variants.map(v => `
        <span class="badge bg-light text-dark border me-1 mb-1 variant-badge">
          ${v.name}
        </span>
      `).join("");

      catalogHTML += `
        <div class="col-md-6 col-lg-4">
          <div class="product-card">
            <!-- Product Image & Availability Badge -->
            <div class="product-img-wrap">
              <span class="stock-badge-tag ${product.stockBadgeClass}">
                ${product.stockLabel}
              </span>
              <img src="${product.image}" alt="${product.name}" loading="lazy" class="img-fluid">
            </div>

            <!-- Description & Variants -->
            <div class="product-body">
              <div class="product-category">${product.categoryLabel}</div>
              <h4 class="product-title">${product.name}</h4>
              <p class="product-desc">${product.description}</p>

              <!-- Technical Specifications -->
              <div class="product-specs">
                <span><i class="bi bi-arrows-angle-expand me-1 text-rattan"></i> Dimensions: <strong>${product.dimensions}</strong></span>
                <span><i class="bi bi-box-seam me-1 text-rattan"></i> Unit Weight: <strong>${product.weightKg} kg</strong></span>
              </div>

              <!-- Available Variants -->
              <div class="mb-3">
                <small class="fw-bold d-block text-secondary mb-1">Finishing / Size Variants:</small>
                <div>${variantsBadges}</div>
              </div>

              <!-- Base Price & Action Button -->
              <div class="product-price-box mt-auto">
                <div>
                  <div class="price-usd">${formatUSD(product.basePriceUSD)}</div>
                  <div class="price-idr">&approx; ${formatIDR(product.basePriceIDR)} / unit</div>
                </div>
                <button type="button" class="btn btn-outline-rattan btn-sm select-for-calc-btn" data-product-id="${product.id}">
                  <i class="bi bi-calculator me-1"></i> Calculate Export
                </button>
              </div>
            </div>
          </div>
        </div>
      `;
    });

    productGridContainer.innerHTML = catalogHTML;

    // Attach click listeners to "Calculate Export" buttons
    productGridContainer.querySelectorAll(".select-for-calc-btn").forEach(btn => {
      btn.addEventListener("click", (e) => {
        const productId = e.currentTarget.getAttribute("data-product-id");
        selectProductInCalculator(productId);
      });
    });
  }

  /**
   * Setup category filter tabs
   */
  function setupCategoryFilters() {
    if (!categoryFilterContainer) return;
    const filterButtons = categoryFilterContainer.querySelectorAll(".filter-btn");

    filterButtons.forEach(btn => {
      btn.addEventListener("click", () => {
        filterButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");

        const selectedFilter = btn.getAttribute("data-filter");
        renderProductCatalog(selectedFilter);
      });
    });
  }

  /* --------------------------------------------------------------------------
   * 4. RENDER FAQ ACCORDION
   * -------------------------------------------------------------------------- */
  function renderFAQAccordion() {
    if (!faqAccordion) return;

    let faqHTML = "";
    RATTAN_DATA.faqs.forEach((faq, index) => {
      const isFirst = index === 0;
      faqHTML += `
        <div class="accordion-item">
          <h2 class="accordion-header" id="heading-${faq.id}">
            <button class="accordion-button ${isFirst ? "" : "collapsed"}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${faq.id}" aria-expanded="${isFirst ? "true" : "false"}" aria-controls="collapse-${faq.id}">
              <i class="bi bi-question-circle text-rattan me-2"></i> ${faq.question}
            </button>
          </h2>
          <div id="collapse-${faq.id}" class="accordion-collapse collapse ${isFirst ? "show" : ""}" aria-labelledby="heading-${faq.id}" data-bs-parent="#faqAccordion">
            <div class="accordion-body">
              ${faq.answer}
            </div>
          </div>
        </div>
      `;
    });

    faqAccordion.innerHTML = faqHTML;
  }

  /* --------------------------------------------------------------------------
   * 5. INITIALIZE CALCULATOR INPUTS
   * -------------------------------------------------------------------------- */

  /**
   * Populate product dropdown in calculator
   */
  function populateProductDropdown() {
    if (!calcProductSelect) return;

    calcProductSelect.innerHTML = RATTAN_DATA.products.map(p => `
      <option value="${p.id}">${p.name} - ${formatUSD(p.basePriceUSD)} (${p.stockLabel})</option>
    `).join("");
  }

  /**
   * Update variant dropdown based on selected product and select default variant
   * @param {string} productId - Selected product ID
   */
  function updateVariantDropdown(productId) {
    if (!calcVariantSelect) return;

    const product = RATTAN_DATA.products.find(p => p.id === productId);
    if (!product || !product.variants) return;

    calcVariantSelect.innerHTML = product.variants.map(v => {
      let adjText = "";
      if (v.priceAdjustmentUSD > 0) {
        adjText = ` (+${formatUSD(v.priceAdjustmentUSD)})`;
      } else if (v.priceAdjustmentUSD < 0) {
        adjText = ` (-${formatUSD(Math.abs(v.priceAdjustmentUSD))})`;
      } else {
        adjText = " (Standard / No Extra Cost)";
      }
      const selectedAttr = v.isDefault ? "selected" : "";
      return `<option value="${v.id}" ${selectedAttr}>${v.name}${adjText}</option>`;
    }).join("");

    if (calcVariantHint) {
      calcVariantHint.textContent = `Official artisan finishing & sizing options for ${product.name}.`;
    }
  }

  /**
   * Populate export destinations dropdown
   */
  function populateDestinationDropdown() {
    if (!calcDestinationSelect) return;

    calcDestinationSelect.innerHTML = RATTAN_DATA.destinations.map(d => `
      <option value="${d.id}">${d.flag} ${d.name} (${d.region})</option>
    `).join("");
  }

  /**
   * Render shipping method radio options
   */
  function populateShippingMethods() {
    if (!shippingMethodContainer) return;

    shippingMethodContainer.innerHTML = RATTAN_DATA.shippingMethods.map((m, index) => {
      const isChecked = index === 0 ? "checked" : "";
      return `
        <div class="form-check p-3 border rounded-3 bg-white shadow-sm shipping-option-card">
          <input class="form-check-input shipping-method-radio" type="radio" name="shippingMethodRadio" id="method-${m.id}" value="${m.id}" ${isChecked}>
          <label class="form-check-label w-100 cursor-pointer" for="method-${m.id}">
            <div class="d-flex flex-wrap justify-content-between align-items-center gap-1">
              <strong class="text-forest">${m.name}</strong>
              <span class="badge bg-light text-dark border">${m.badge}</span>
            </div>
            <small class="text-muted d-block mt-1">${m.description}</small>
          </label>
        </div>
      `;
    }).join("");
  }

  /* --------------------------------------------------------------------------
   * 6. CORE CALCULATION LOGIC: PRICING, SHIPPING & ESTIMATED ARRIVAL
   * -------------------------------------------------------------------------- */

  /**
   * Calculate export order costs, shipping, documentation fees, and arrival dates
   * @param {boolean} clampInput - Whether to normalize the input field value directly
   */
  function calculateExportOrder(clampInput = false) {
    if (!calcProductSelect || !calcVariantSelect || !calcQuantityInput || !calcDestinationSelect) {
      return;
    }

    // 1. Read form inputs
    const selectedProductId = calcProductSelect.value;
    const selectedVariantId = calcVariantSelect.value;
    let quantity = parseInt(calcQuantityInput.value, 10);

    if (isNaN(quantity) || quantity < 1) {
      quantity = 1;
      if (clampInput) calcQuantityInput.value = 1;
    } else if (quantity > 500) {
      quantity = 500;
      if (clampInput) calcQuantityInput.value = 500;
    }

    const selectedDestId = calcDestinationSelect.value;
    const selectedMethodRadio = document.querySelector('input[name="shippingMethodRadio"]:checked');
    const selectedMethodId = selectedMethodRadio ? selectedMethodRadio.value : "sea-lcl";

    // 2. Lookup data objects
    const product = RATTAN_DATA.products.find(p => p.id === selectedProductId);
    const destination = RATTAN_DATA.destinations.find(d => d.id === selectedDestId);
    const method = RATTAN_DATA.shippingMethods.find(m => m.id === selectedMethodId);

    if (!product || !destination || !method) return;

    const variant = product.variants.find(v => v.id === selectedVariantId) || product.variants[0];

    // 3. Calculate Unit Price & Product Subtotal
    const unitPriceUSD = product.basePriceUSD + (variant.priceAdjustmentUSD || 0);
    const subtotalUSD = unitPriceUSD * quantity;

    // 4. Calculate Shipping Cost
    const shippingRatePerUnitUSD = destination.baseRateUSD * method.rateMultiplier;
    const totalShippingUSD = Math.round(shippingRatePerUnitUSD * quantity);

    // 5. Export Documentation & ISPM-15 Fumigation Fee
    const docFeeUSD = method.flatDocumentationFeeUSD || 35;

    // 6. Grand Total (USD & IDR)
    const grandTotalUSD = subtotalUSD + totalShippingUSD + docFeeUSD;
    const exchangeRate = RATTAN_DATA.business.currencyExchangeRate;
    const grandTotalIDR = grandTotalUSD * exchangeRate;
    const subtotalIDR = subtotalUSD * exchangeRate;
    const totalShippingIDR = totalShippingUSD * exchangeRate;

    // 7. Calculate Estimated Time of Arrival (Production Lead + Transit Time)
    let prodLeadMin = 0;
    let prodLeadMax = 0;
    let stockNote = "";

    if (product.stockStatus === "ready") {
      prodLeadMin = 2;
      prodLeadMax = 4;
      stockNote = "In Stock (Packing & Fumigation 2–4 Days)";
    } else if (product.stockStatus === "limited") {
      prodLeadMin = 3;
      prodLeadMax = 6;
      stockNote = "Limited Stock (Prep 3–6 Days)";
    } else {
      prodLeadMin = product.productionLeadDays || 14;
      prodLeadMax = (product.productionLeadDays || 14) + 4;
      stockNote = `Custom Pre-Order (${prodLeadMin}–${prodLeadMax} Working Days)`;
    }

    const transitMin = method.type === "air" ? destination.airLeadDaysMin : destination.seaLeadDaysMin;
    const transitMax = method.type === "air" ? destination.airLeadDaysMax : destination.seaLeadDaysMax;

    const totalDaysMin = prodLeadMin + transitMin;
    const totalDaysMax = prodLeadMax + transitMax;

    const arrivalDateMinStr = getFutureFormattedDate(totalDaysMin);
    const arrivalDateMaxStr = getFutureFormattedDate(totalDaysMax);

    // 8. Update Summary DOM Elements
    summaryProductName.textContent = product.name;
    summaryVariantName.textContent = variant.name;
    summaryUnitPrice.textContent = `${formatUSD(unitPriceUSD)} / unit`;
    summaryQuantity.textContent = `${quantity} ${quantity === 1 ? "unit" : "units"}`;
    summarySubtotal.textContent = `${formatUSD(subtotalUSD)} (≈ ${formatIDR(subtotalIDR)})`;
    summaryDestination.textContent = `${destination.flag} ${destination.name}`;
    summaryMethod.textContent = method.shortName || method.name;
    summaryShippingCost.textContent = `${formatUSD(totalShippingUSD)} (≈ ${formatIDR(totalShippingIDR)})`;
    summaryDocFee.textContent = `${formatUSD(docFeeUSD)} (ISPM-15 Standard)`;

    // Update Stock Badge
    summaryStockBadge.className = `stock-badge-tag ${product.stockBadgeClass} position-static`;
    summaryStockBadge.textContent = product.stockLabel;

    // Update Grand Total Box
    summaryGrandTotalUSD.textContent = formatUSD(grandTotalUSD);
    summaryGrandTotalIDR.textContent = `≈ ${formatIDR(grandTotalIDR)}`;

    // Update Lead Time
    summaryLeadTime.innerHTML = `
      <span>${totalDaysMin} – ${totalDaysMax} Days Total</span>
      <span class="text-muted fw-normal d-block mt-1">(${stockNote} + Transit ${transitMin}–${transitMax} Days)</span>
    `;
    summaryArrivalDate.innerHTML = `
      Estimated arrival at destination: <strong>${arrivalDateMinStr} – ${arrivalDateMaxStr}</strong>
    `;

    // 9. Update WhatsApp Inquiry Link
    updateWhatsAppInquiryLink({
      productName: product.name,
      variantName: variant.name,
      quantity,
      stockLabel: product.stockLabel,
      destinationName: destination.name,
      methodName: method.name,
      subtotalUSD: formatUSD(subtotalUSD),
      shippingUSD: formatUSD(totalShippingUSD),
      grandTotalUSD: formatUSD(grandTotalUSD),
      grandTotalIDR: formatIDR(grandTotalIDR),
      arrivalDateMinStr,
      arrivalDateMaxStr,
      totalDaysMin,
      totalDaysMax
    });
  }

  /**
   * Generate pre-filled WhatsApp inquiry message URL
   */
  function updateWhatsAppInquiryLink(data) {
    if (!btnWhatsAppInquiry) return;

    const phone = "6281234567890";
    const textMessage = `Hello Pak Ridwan (CV Ridwan Mandiri Rattan Cirebon),

I used the export simulator on your website and would like to inquire about the following order estimate:
- *Product*: ${data.productName}
- *Variant*: ${data.variantName}
- *Availability*: ${data.stockLabel}
- *Quantity*: ${data.quantity} ${data.quantity === 1 ? "Unit" : "Units"}
- *Destination*: ${data.destinationName}
- *Shipping Method*: ${data.methodName}
- *Product Subtotal*: ${data.subtotalUSD}
- *Estimated Shipping*: ${data.shippingUSD}
- *Total Estimated Cost*: ${data.grandTotalUSD} (${data.grandTotalIDR})
- *Estimated Arrival*: ${data.totalDaysMin}–${data.totalDaysMax} days (${data.arrivalDateMinStr} to ${data.arrivalDateMaxStr})

Please share details regarding container loading slots and Proforma Invoice (PI) issuance. Thank you!`;

    btnWhatsAppInquiry.href = `https://wa.me/${phone}?text=${encodeURIComponent(textMessage)}`;
  }

  /**
   * Select product from catalog into calculator and scroll smoothly
   */
  function selectProductInCalculator(productId) {
    if (!calcProductSelect) return;

    calcProductSelect.value = productId;
    updateVariantDropdown(productId);
    calculateExportOrder(true);

    const calcSection = document.getElementById("kalkulator");
    if (calcSection) {
      calcSection.scrollIntoView({ behavior: "smooth" });
    }
  }

  /* --------------------------------------------------------------------------
   * 7. EVENT LISTENERS
   * -------------------------------------------------------------------------- */
  function setupEventListeners() {
    // Prevent accidental form submission on Enter key
    if (exportOrderForm) {
      exportOrderForm.addEventListener("submit", (e) => e.preventDefault());
    }

    // Close mobile navbar menu when clicking a nav link
    if (navbarCollapseEl && typeof bootstrap !== "undefined") {
      navbarCollapseEl.querySelectorAll(".nav-link, .btn").forEach(link => {
        link.addEventListener("click", () => {
          const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapseEl);
          if (bsCollapse) bsCollapse.hide();
        });
      });
    }

    if (calcProductSelect) {
      calcProductSelect.addEventListener("change", (e) => {
        updateVariantDropdown(e.target.value);
        calculateExportOrder(true);
      });
    }

    if (calcVariantSelect) {
      calcVariantSelect.addEventListener("change", () => {
        calculateExportOrder(true);
      });
    }

    if (calcQuantityInput) {
      calcQuantityInput.addEventListener("input", () => {
        calculateExportOrder(false);
      });

      calcQuantityInput.addEventListener("change", () => {
        calculateExportOrder(true);
      });
    }

    if (btnQtyMinus && calcQuantityInput) {
      btnQtyMinus.addEventListener("click", () => {
        const currentVal = parseInt(calcQuantityInput.value, 10) || 1;
        if (currentVal > 1) {
          calcQuantityInput.value = currentVal - 1;
          calculateExportOrder(true);
        }
      });
    }

    if (btnQtyPlus && calcQuantityInput) {
      btnQtyPlus.addEventListener("click", () => {
        const currentVal = parseInt(calcQuantityInput.value, 10) || 1;
        if (currentVal < 500) {
          calcQuantityInput.value = currentVal + 1;
          calculateExportOrder(true);
        }
      });
    }

    if (calcDestinationSelect) {
      calcDestinationSelect.addEventListener("change", () => {
        calculateExportOrder(true);
      });
    }

    if (shippingMethodContainer) {
      shippingMethodContainer.addEventListener("change", (e) => {
        if (e.target && e.target.name === "shippingMethodRadio") {
          calculateExportOrder(true);
        }
      });
    }
  }

  /* --------------------------------------------------------------------------
   * 8. INITIALIZE APPLICATION
   * -------------------------------------------------------------------------- */
  function initializeApp() {
    renderProductCatalog("all");
    setupCategoryFilters();
    renderFAQAccordion();

    populateProductDropdown();
    populateDestinationDropdown();
    populateShippingMethods();

    if (RATTAN_DATA.products.length > 0) {
      updateVariantDropdown(RATTAN_DATA.products[0].id);
    }

    setupEventListeners();
    calculateExportOrder(true);
  }

  initializeApp();
});
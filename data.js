/**
 * ==============================================================================
 * DATA REPOSITORY - PAK RIDWAN CIREBON RATTAN EXPORT
 * ==============================================================================
 * Static front-end repository containing:
 * 1. Business profile & export legalities
 * 2. Rattan product catalog, variants, base prices (USD & IDR), and stock status
 * 3. International & domestic export destinations with base freight rates
 * 4. Shipping method options (Sea LCL, Sea FCL Container, Air Express)
 * 5. Frequently Asked Questions (FAQ) regarding rattan export procedures
 * ==============================================================================
 */

const RATTAN_DATA = {
  // 1. Business Profile
  business: {
    name: "Ridwan Rattan Craft Cirebon",
    legalName: "CV Ridwan Mandiri Rattan Export",
    owner: "Pak Ridwan Hidayat",
    city: "Cirebon, West Java, Indonesia",
    address: "Jl. Nyi Mas Endang Geulis No. 42, Tegalwangi Rattan Industrial Center, Cirebon 45154",
    phone: "+62 812-3456-7890",
    email: "export@ridwanrattancirebon.com",
    exportLicense: "NIB/SVLK: 9120003481928-V-LEGAL",
    establishedYear: 2008,
    currencyExchangeRate: 15800 // 1 USD = Rp 15,800 (simulated exchange rate)
  },

  // 2. Rattan Product Catalog & Variants
  products: [
    {
      id: "kursi-santai-classic",
      name: "Cirebon Classic Lounge Chair",
      category: "furniture",
      categoryLabel: "Chairs & Sofas",
      image: "foto3.jpg",
      description: "Curved natural woven rattan lounge chair with a plush cotton-linen cushion. Ergonomically designed for tropical resort lobbies or villas.",
      basePriceUSD: 85,
      basePriceIDR: 1343000,
      stockStatus: "ready", // ready | limited | po
      stockLabel: "Ready Stock",
      stockBadgeClass: "badge-ready",
      stockQuantity: 45,
      dimensions: "75 x 80 x 85 cm",
      weightKg: 7.2,
      productionLeadDays: 0,
      variants: [
        {
          id: "natural-varnish",
          name: "Natural Clear Varnish (Original Rattan Tone)",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "honey-brown",
          name: "Honey Brown Glaze Finish",
          priceAdjustmentUSD: 8,
          priceAdjustmentIDR: 126400,
          isDefault: false
        },
        {
          id: "kubu-grey-finish",
          name: "Rustic Kubu Grey (Natural Grey Peel Weave)",
          priceAdjustmentUSD: 12,
          priceAdjustmentIDR: 189600,
          isDefault: false
        }
      ]
    },
    {
      id: "meja-kopi-hourglass",
      name: "Hourglass Glass-Top Rattan Coffee Table",
      category: "furniture",
      categoryLabel: "Tables & Furniture",
      image: "foto4.jpg",
      description: "Hourglass-shaped coffee table featuring geometric star weaving and an 8mm tempered glass top. Built on a solid Manau rattan frame for maximum stability.",
      basePriceUSD: 110,
      basePriceIDR: 1738000,
      stockStatus: "ready",
      stockLabel: "Ready Stock",
      stockBadgeClass: "badge-ready",
      stockQuantity: 28,
      dimensions: "Diameter 80 cm x Height 48 cm",
      weightKg: 9.5,
      productionLeadDays: 0,
      variants: [
        {
          id: "diameter-80cm",
          name: "Standard Size: Diameter 80 cm",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "diameter-100cm",
          name: "Large Size: Diameter 100 cm (+Tempered Glass)",
          priceAdjustmentUSD: 25,
          priceAdjustmentIDR: 395000,
          isDefault: false
        }
      ]
    },
    {
      id: "lampu-gantung-bohemian",
      name: "Bohemian Dome Woven Pendant Lamp",
      category: "lighting",
      categoryLabel: "Lighting & Decor",
      image: "foto5.jpg",
      description: "Open-weave rattan pendant light shade that casts a warm, dramatic ambient glow for cafes, restaurants, and elegant dining rooms.",
      basePriceUSD: 42,
      basePriceIDR: 663600,
      stockStatus: "limited",
      stockLabel: "Limited Stock (12 Pcs Left)",
      stockBadgeClass: "badge-limited",
      stockQuantity: 12,
      dimensions: "Diameter 45 cm x Height 50 cm",
      weightKg: 2.1,
      productionLeadDays: 3,
      variants: [
        {
          id: "anyam-terbuka",
          name: "Open Lattice Weave (Open Webbing)",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "anyam-rapat",
          name: "Tight Dense Weave (Close Weave)",
          priceAdjustmentUSD: 6,
          priceAdjustmentIDR: 94800,
          isDefault: false
        },
        {
          id: "fringe-rumbai",
          name: "Natural Fiber Fringed Bottom",
          priceAdjustmentUSD: 10,
          priceAdjustmentIDR: 158000,
          isDefault: false
        }
      ]
    },
    {
      id: "keranjang-laundry-tutup",
      name: "Tegalwangi Multipurpose Basket with Lid",
      category: "storage",
      categoryLabel: "Baskets & Storage",
      image: "foto6.jpg",
      description: "Conical lidded laundry and storage basket with sturdy woven handles. Includes a removable, washable inner canvas liner bag.",
      basePriceUSD: 36,
      basePriceIDR: 568800,
      stockStatus: "ready",
      stockLabel: "Ready Stock",
      stockBadgeClass: "badge-ready",
      stockQuantity: 60,
      dimensions: "Diameter 40 cm x Height 65 cm",
      weightKg: 3.4,
      productionLeadDays: 0,
      variants: [
        {
          id: "size-medium",
          name: "Size M (Height 50 cm, Dia 35 cm)",
          priceAdjustmentUSD: -6,
          priceAdjustmentIDR: -94800,
          isDefault: false
        },
        {
          id: "size-large",
          name: "Size L (Height 65 cm, Dia 40 cm)",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "size-set-2in1",
          name: "2-in-1 Nested Set (Size M + L)",
          priceAdjustmentUSD: 24,
          priceAdjustmentIDR: 379200,
          isDefault: false
        }
      ]
    },
    {
      id: "daybed-outdoor-kubu",
      name: "Tropical Terrace Kubu Grey Daybed Lounger",
      category: "furniture",
      categoryLabel: "Chairs & Sofas",
      image: "foto7.jpg",
      description: "Weather-resistant natural Kubu rattan terrace lounger, complete with a quick-dry foam mattress and UV-resistant bolster pillows.",
      basePriceUSD: 195,
      basePriceIDR: 3081000,
      stockStatus: "po",
      stockLabel: "Pre-Order (14 Working Days)",
      stockBadgeClass: "badge-po",
      stockQuantity: 0,
      dimensions: "200 x 85 x 75 cm",
      weightKg: 18.5,
      productionLeadDays: 14,
      variants: [
        {
          id: "matras-offwhite",
          name: "Standard Off-White Waterproof Mattress",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "matras-sunbrella-premium",
          name: "Sunbrella® Navy Blue Anti-UV Mattress",
          priceAdjustmentUSD: 35,
          priceAdjustmentIDR: 553000,
          isDefault: false
        }
      ]
    },
    {
      id: "kabinet-credenza-rotan",
      name: "2-Door Rattan Cane Credenza Buffet Cabinet",
      category: "furniture",
      categoryLabel: "Tables & Furniture",
      image: "foto8.jpg",
      description: "Minimalist sideboard blending solid teak wood with traditional hexagonal rattan cane webbing doors. High demand in European & Japanese markets.",
      basePriceUSD: 230,
      basePriceIDR: 3634000,
      stockStatus: "po",
      stockLabel: "Pre-Order (18 Working Days)",
      stockBadgeClass: "badge-po",
      stockQuantity: 0,
      dimensions: "120 x 42 x 80 cm",
      weightKg: 24.0,
      productionLeadDays: 18,
      variants: [
        {
          id: "wood-natural-teak",
          name: "Natural Teak Wood + Natural Cane",
          priceAdjustmentUSD: 0,
          priceAdjustmentIDR: 0,
          isDefault: true
        },
        {
          id: "wood-black-finish",
          name: "Black Matte Wood Finish + Contrast Natural Cane",
          priceAdjustmentUSD: 20,
          priceAdjustmentIDR: 316000,
          isDefault: false
        }
      ]
    }
  ],

  // 3. Export Destinations & Base Freight Rates per Unit/Volume
  destinations: [
    {
      id: "dest-singapore",
      region: "Southeast Asia",
      name: "Singapore (Port of Singapore)",
      portCode: "SGSIN",
      flag: "🇸🇬",
      baseRateUSD: 30,
      seaLeadDaysMin: 4,
      seaLeadDaysMax: 7,
      airLeadDaysMin: 1,
      airLeadDaysMax: 2
    },
    {
      id: "dest-australia",
      region: "Oceania",
      name: "Australia (Port of Sydney / Melbourne)",
      portCode: "AUSYD",
      flag: "🇦🇺",
      baseRateUSD: 65,
      seaLeadDaysMin: 14,
      seaLeadDaysMax: 20,
      airLeadDaysMin: 3,
      airLeadDaysMax: 5
    },
    {
      id: "dest-japan",
      region: "East Asia",
      name: "Japan (Port of Yokohama / Tokyo)",
      portCode: "JPYOK",
      flag: "🇯🇵",
      baseRateUSD: 55,
      seaLeadDaysMin: 12,
      seaLeadDaysMax: 16,
      airLeadDaysMin: 2,
      airLeadDaysMax: 4
    },
    {
      id: "dest-europe",
      region: "Europe",
      name: "Europe (Port of Rotterdam / Hamburg)",
      portCode: "NLRTM",
      flag: "🇪🇺",
      baseRateUSD: 95,
      seaLeadDaysMin: 28,
      seaLeadDaysMax: 35,
      airLeadDaysMin: 4,
      airLeadDaysMax: 6
    },
    {
      id: "dest-usa",
      region: "North America",
      name: "United States (Port of Los Angeles / Long Beach)",
      portCode: "USLAX",
      flag: "🇺🇸",
      baseRateUSD: 110,
      seaLeadDaysMin: 24,
      seaLeadDaysMax: 32,
      airLeadDaysMin: 5,
      airLeadDaysMax: 7
    },
    {
      id: "dest-domestic",
      region: "Domestic Indonesia",
      name: "Indonesia Hub (Port of Tanjung Priok / Jakarta)",
      portCode: "IDTPP",
      flag: "🇮🇩",
      baseRateUSD: 15,
      seaLeadDaysMin: 2,
      seaLeadDaysMax: 4,
      airLeadDaysMin: 1,
      airLeadDaysMax: 2
    }
  ],

  // 4. Shipping Methods & Rate Multipliers
  shippingMethods: [
    {
      id: "sea-lcl",
      name: "Sea: LCL (Less than Container Load)",
      shortName: "Sea LCL (Consolidated)",
      badge: "Most Popular (Consolidated Cargo)",
      description: "Shared container sea freight. Ideal for orders between 1 and 30 units.",
      rateMultiplier: 1.0,
      type: "sea",
      flatDocumentationFeeUSD: 35
    },
    {
      id: "sea-fcl",
      name: "Sea: FCL 20ft Container (Full Container Load)",
      shortName: "Sea FCL 20ft Container",
      badge: "Best Value (Wholesale / Projects)",
      description: "Dedicated 20-foot container for your order (capacity ~180–220 lounge chairs).",
      rateMultiplier: 0.65,
      type: "sea",
      flatDocumentationFeeUSD: 60
    },
    {
      id: "air-express",
      name: "Air: Express Air Freight",
      shortName: "Express Air Freight",
      badge: "Fastest (Priority / Samples)",
      description: "Direct express air cargo delivery to your destination international airport.",
      rateMultiplier: 2.8,
      type: "air",
      flatDocumentationFeeUSD: 45
    }
  ],

  // 5. Frequently Asked Questions (FAQ)
  faqs: [
    {
      id: "faq-1",
      question: "Do Pak Ridwan's rattan products hold official export permits and certifications?",
      answer: "Yes. Our business holds complete Indonesian export legalities, including an Export NIB, V-Legal/SVLK (Timber & Forest Product Legality Verification System), as well as ISPM 15 Fumigation and Phytosanitary Certificates issued by the Cirebon Agricultural Quarantine Agency to ensure pest-free customs clearance."
    },
    {
      id: "faq-2",
      question: "How do I check stock availability (Ready Stock vs Pre-Order)?",
      answer: "Availability is transparently labeled on every product card: a green 'Ready Stock' badge means the item is ready for packing and dispatch within 2–4 days; a yellow 'Limited Stock' badge indicates low remaining inventory; and a blue 'Pre-Order' badge means our Tegalwangi artisans will craft the items fresh to order within 14–18 working days."
    },
    {
      id: "faq-3",
      question: "What is the Minimum Order Quantity (MOQ) for export shipments?",
      answer: "For consolidated sea cargo (LCL) or air freight, we accept orders starting from 5 units (mixed variants and product types are welcome). For full container orders (FCL 20ft or 40ft High Cube), there is no per-item limit as long as the order fills the container volume."
    },
    {
      id: "faq-4",
      question: "How are total prices and shipping costs calculated?",
      answer: "Product subtotal is calculated automatically as: (Base Product Price + Variant Adjustment) × Quantity. Shipping cost is calculated as: Destination Base Rate × Shipping Method Multiplier (LCL, FCL, or Air) × Quantity + Export Legal & ISPM-15 Fumigation Documentation Fee."
    },
    {
      id: "faq-5",
      question: "How long does it take for orders to arrive at the destination country?",
      answer: "Estimated arrival time equals Production Lead Time (2–4 days for Ready Stock packing, or 14–18 working days for Pre-Order) plus Transit Time. For example, sea freight takes 4–7 days to Singapore, 14–20 days to Australia, 24–32 days to the USA, and 28–35 days to Europe. Express Air Freight arrives within 1–7 days."
    },
    {
      id: "faq-6",
      question: "What packaging standards are used to protect rattan during ocean transit?",
      answer: "We apply a 3-layer export protection standard: (1) anti-scratch foam sheet wrapping around the entire rattan frame, (2) heavy-duty single-face corrugated cardboard protecting corners and legs, and (3) moisture-resistant woven plastic sacks sealed tightly with silica gel desiccants inside the container."
    },
    {
      id: "faq-7",
      question: "What export payment methods do you accept?",
      answer: "For international export orders, we accept T/T (Telegraphic Transfer / Bank Wire) with a 30% Down Payment upon order confirmation and 70% balance upon issuance of the Bill of Lading (B/L) copy, or an Irrevocable Letter of Credit (L/C) at sight for full container orders."
    }
  ]
};

// Expose data globally on browser window
if (typeof window !== "undefined") {
  window.RATTAN_DATA = RATTAN_DATA;
}
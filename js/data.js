/* ============================================================
   P2P Solutions — Mock Data Store
   ============================================================ */

/* Generate sequential material-coded units, e.g. AL 001 … AL 010 */
function _genUnits(prefix, total, sold = 0) {
  const units = [];
  for (let i = 1; i <= total; i++) {
    const code = prefix + ' ' + String(i).padStart(3, '0');
    units.push({ code, status: i <= sold ? 'sold' : 'in_stock' });
  }
  return units;
}

const P2PData = {

  /* ── AUTH ──────────────────────────────────────────────── */
  /* ACME = the buyer organisation · each electronics brand is its own supplier */
  users: [
    { id: 'u-admin', name: 'Sarah Chen',   email: 'admin@acme.com',       password: 'pass123', role: 'admin',       dept: 'IT Administration',  avatar: '#2563EB', initials: 'SC' },
    { id: 'u-proc',  name: 'James Rivera',  email: 'procurement@acme.com', password: 'pass123', role: 'procurement', dept: 'Procurement',         avatar: '#10B981', initials: 'JR' },
    { id: 'u-fin',   name: 'Priya Nair',   email: 'finance@acme.com',     password: 'pass123', role: 'finance',     dept: 'Finance & Accounts', avatar: '#F59E0B', initials: 'PN' },

    /* Brand suppliers — each logs in to manage only their own catalog & stock */
    { id: 'u-apple',   name: 'Apple Store',     brandName: 'Apple',   supplierId: 'SUP-APPLE',   email: 'apple@supplier.com',   password: 'pass123', role: 'supplier', dept: 'Apple Inc.',            avatar: '#111827', initials: 'AP' },
    { id: 'u-samsung', name: 'Samsung Sales',   brandName: 'Samsung', supplierId: 'SUP-SAMSUNG', email: 'samsung@supplier.com', password: 'pass123', role: 'supplier', dept: 'Samsung Electronics',   avatar: '#1428A0', initials: 'SS' },
    { id: 'u-asus',    name: 'ASUS Reseller',   brandName: 'Asus',    supplierId: 'SUP-ASUS',    email: 'asus@supplier.com',    password: 'pass123', role: 'supplier', dept: 'ASUSTeK',               avatar: '#00539B', initials: 'AS' },
    { id: 'u-hp',      name: 'HP Distributor',  brandName: 'HP',      supplierId: 'SUP-HP',      email: 'hp@supplier.com',      password: 'pass123', role: 'supplier', dept: 'HP Inc.',               avatar: '#0096D6', initials: 'HP' },
    { id: 'u-xiaomi',  name: 'Xiaomi Official',  brandName: 'Xiaomi',  supplierId: 'SUP-XIAOMI',  email: 'xiaomi@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Xiaomi Corp.',         avatar: '#FF6900', initials: 'XM' },
    { id: 'u-huawei',  name: 'Huawei Partner',  brandName: 'Huawei',  supplierId: 'SUP-HUAWEI',  email: 'huawei@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Huawei Technologies',   avatar: '#CF0A2C', initials: 'HW' },
    { id: 'u-lenovo',  name: 'Lenovo Store',    brandName: 'Lenovo',  supplierId: 'SUP-LENOVO',  email: 'lenovo@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Lenovo Group',          avatar: '#E2231A', initials: 'LN' },
    { id: 'u-sony',    name: 'Sony Centre',     brandName: 'Sony',    supplierId: 'SUP-SONY',    email: 'sony@supplier.com',    password: 'pass123', role: 'supplier', dept: 'Sony Corp.',            avatar: '#000000', initials: 'SN' },
  ],

  /* ── PRODUCTS / INVENTORY (Direct PO resale goods) ─────────
     image = bundled per-device graphic (clean, always loads)  */
  products: [
    /* Apple */
    { id: 'AP-IPH', category: 'Phones',      brand: 'Apple',   name: 'iPhone 15 Pro',          emoji: '📱', image: 'assets/products/phone.svg',      materialPrefix: 'IPH', price: 4999, sellerId: 'u-apple',   units: _genUnits('IPH', 12, 2) },
    { id: 'AP-MBP', category: 'Laptops',     brand: 'Apple',   name: 'MacBook Pro 14"',        emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'MBP', price: 8999, sellerId: 'u-apple',   units: _genUnits('MBP', 8, 1) },
    { id: 'AP-IPD', category: 'Tablets',     brand: 'Apple',   name: 'iPad Air',               emoji: '📲', image: 'assets/products/tablet.svg',     materialPrefix: 'IPD', price: 3299, sellerId: 'u-apple',   units: _genUnits('IPD', 10, 0) },
    { id: 'AP-APP', category: 'Audio',       brand: 'Apple',   name: 'AirPods Pro 2',          emoji: '🎧', image: 'assets/products/earbuds.svg',    materialPrefix: 'APP', price: 999,  sellerId: 'u-apple',   units: _genUnits('APP', 20, 5) },

    /* Samsung */
    { id: 'SS-S24', category: 'Phones',      brand: 'Samsung', name: 'Galaxy S24 Ultra',       emoji: '📱', image: 'assets/products/phone.svg',      materialPrefix: 'GS', price: 4599, sellerId: 'u-samsung', units: _genUnits('GS', 14, 3) },
    { id: 'SS-TAB', category: 'Tablets',     brand: 'Samsung', name: 'Galaxy Tab S9',          emoji: '📲', image: 'assets/products/tablet.svg',     materialPrefix: 'GT', price: 2999, sellerId: 'u-samsung', units: _genUnits('GT', 9, 1) },
    { id: 'SS-MON', category: 'Monitors',    brand: 'Samsung', name: 'Odyssey G7 27"',         emoji: '🖥️', image: 'assets/products/monitor.svg',    materialPrefix: 'OD', price: 1799, sellerId: 'u-samsung', units: _genUnits('OD', 7, 2) },

    /* Asus */
    { id: 'AS-ROG', category: 'Laptops',     brand: 'Asus',    name: 'ROG Strix G16',          emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'ROG', price: 6499, sellerId: 'u-asus',    units: _genUnits('ROG', 6, 1) },
    { id: 'AS-ZEN', category: 'Laptops',     brand: 'Asus',    name: 'ZenBook 14 OLED',        emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'ZEN', price: 4199, sellerId: 'u-asus',    units: _genUnits('ZEN', 11, 0) },
    { id: 'AS-MON', category: 'Monitors',    brand: 'Asus',    name: 'TUF Gaming 27"',         emoji: '🖥️', image: 'assets/products/monitor.svg',    materialPrefix: 'TUF', price: 1399, sellerId: 'u-asus',    units: _genUnits('TUF', 8, 2) },

    /* HP */
    { id: 'HP-SPC', category: 'Laptops',     brand: 'HP',      name: 'HP Spectre x360',        emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'SPC', price: 5299, sellerId: 'u-hp',      units: _genUnits('SPC', 7, 1) },
    { id: 'HP-PAV', category: 'Laptops',     brand: 'HP',      name: 'HP Pavilion 15',         emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'PAV', price: 2799, sellerId: 'u-hp',      units: _genUnits('PAV', 13, 3) },
    { id: 'HP-PRN', category: 'Accessories', brand: 'HP',      name: 'HP LaserJet Printer',    emoji: '🖨️', image: 'assets/products/printer.svg',    materialPrefix: 'PRN', price: 1099, sellerId: 'u-hp',      units: _genUnits('PRN', 6, 0) },

    /* Xiaomi */
    { id: 'XM-14',  category: 'Phones',      brand: 'Xiaomi',  name: 'Xiaomi 14',              emoji: '📱', image: 'assets/products/phone.svg',      materialPrefix: 'XM', price: 2899, sellerId: 'u-xiaomi',  units: _genUnits('XM', 16, 4) },
    { id: 'XM-RN',  category: 'Phones',      brand: 'Xiaomi',  name: 'Redmi Note 13 Pro',      emoji: '📱', image: 'assets/products/phone.svg',      materialPrefix: 'RN', price: 1299, sellerId: 'u-xiaomi',  units: _genUnits('RN', 22, 6) },
    { id: 'XM-PB',  category: 'Accessories', brand: 'Xiaomi',  name: 'Mi Power Bank 20000',    emoji: '🔋', image: 'assets/products/powerbank.svg',  materialPrefix: 'PB', price: 149,  sellerId: 'u-xiaomi',  units: _genUnits('PB', 30, 10) },
    { id: 'XM-BUD', category: 'Audio',       brand: 'Xiaomi',  name: 'Redmi Buds 5 Pro',       emoji: '🎧', image: 'assets/products/earbuds.svg',    materialPrefix: 'BUD', price: 299,  sellerId: 'u-xiaomi',  units: _genUnits('BUD', 18, 3) },

    /* Huawei */
    { id: 'HW-P60', category: 'Phones',      brand: 'Huawei',  name: 'Huawei P60 Pro',         emoji: '📱', image: 'assets/products/phone.svg',      materialPrefix: 'P60', price: 3699, sellerId: 'u-huawei',  units: _genUnits('P60', 9, 2) },
    { id: 'HW-PAD', category: 'Tablets',     brand: 'Huawei',  name: 'Huawei MatePad 11',      emoji: '📲', image: 'assets/products/tablet.svg',     materialPrefix: 'MP', price: 2399, sellerId: 'u-huawei',  units: _genUnits('MP', 8, 1) },

    /* Lenovo */
    { id: 'LN-X1',  category: 'Laptops',     brand: 'Lenovo',  name: 'ThinkPad X1 Carbon',     emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'X1', price: 6199, sellerId: 'u-lenovo',  units: _genUnits('X1', 7, 1) },
    { id: 'LN-IDP', category: 'Laptops',     brand: 'Lenovo',  name: 'IdeaPad Slim 5',         emoji: '💻', image: 'assets/products/laptop.svg',     materialPrefix: 'IDP', price: 2599, sellerId: 'u-lenovo',  units: _genUnits('IDP', 12, 2) },

    /* Sony */
    { id: 'SN-XM5', category: 'Audio',       brand: 'Sony',    name: 'Sony WH-1000XM5',        emoji: '🎧', image: 'assets/products/headphones.svg', materialPrefix: 'XM5', price: 1599, sellerId: 'u-sony',    units: _genUnits('XM5', 10, 3) },
    { id: 'SN-BRV', category: 'Monitors',    brand: 'Sony',    name: 'Sony Bravia 32" Monitor',emoji: '🖥️', image: 'assets/products/monitor.svg',    materialPrefix: 'BRV', price: 2199, sellerId: 'u-sony',    units: _genUnits('BRV', 6, 0) },
  ],

  /* ── ORDERS (procurement purchases from suppliers) ─────── */
  orders: [
    { id: 'ORD-1001', buyerId: 'u-proc', productId: 'AS-ZEN', productName: 'ZenBook 14 OLED', code: 'ZEN 001', qty: 1, price: 4199, total: 4199, status: 'delivered',  date: '2026-05-10' },
    { id: 'ORD-1002', buyerId: 'u-proc', productId: 'SS-S24', productName: 'Galaxy S24 Ultra', code: 'GS 001',  qty: 1, price: 4599, total: 4599, status: 'in_transit', date: '2026-05-18' },
    { id: 'ORD-1003', buyerId: 'u-proc', productId: 'XM-RN',  productName: 'Redmi Note 13 Pro', code: 'RN 001', qty: 1, price: 1299, total: 1299, status: 'completed',  date: '2026-05-20' },
    { id: 'ORD-1004', buyerId: 'u-proc', productId: 'AP-IPH', productName: 'iPhone 15 Pro',     code: 'IPH 001', qty: 1, price: 4999, total: 4999, status: 'confirmed',  date: '2026-05-22' },
  ],

  /* ── SUPPLIERS (the brands that log in & supply the catalog) ── */
  suppliers: [
    { id: 'SUP-APPLE',   userId: 'u-apple',   name: 'Apple Inc.',            contact: 'Apple Store',    email: 'apple@supplier.com',   phone: '+1 800-275-2273', category: 'Electronics', status: 'active', rating: 4.9, city: 'Cupertino',  country: 'USA',     taxId: 'US-APL-0001', payment: 'Net 30', totalOrders: 38, totalValue: 412000, joined: '2022-01-10' },
    { id: 'SUP-SAMSUNG', userId: 'u-samsung', name: 'Samsung Electronics',   contact: 'Samsung Sales',  email: 'samsung@supplier.com', phone: '+82 2-2255-0114', category: 'Electronics', status: 'active', rating: 4.8, city: 'Suwon',      country: 'South Korea', taxId: 'KR-SMS-0002', payment: 'Net 30', totalOrders: 31, totalValue: 286000, joined: '2022-02-18' },
    { id: 'SUP-ASUS',    userId: 'u-asus',    name: 'ASUSTeK Computer',      contact: 'ASUS Reseller',  email: 'asus@supplier.com',    phone: '+886 2-2894-3447',category: 'Electronics', status: 'active', rating: 4.7, city: 'Taipei',     country: 'Taiwan',  taxId: 'TW-ASU-0003', payment: 'Net 45', totalOrders: 24, totalValue: 198000, joined: '2022-05-02' },
    { id: 'SUP-HP',      userId: 'u-hp',      name: 'HP Inc.',               contact: 'HP Distributor', email: 'hp@supplier.com',      phone: '+1 650-857-1501', category: 'Electronics', status: 'active', rating: 4.6, city: 'Palo Alto',  country: 'USA',     taxId: 'US-HP-0004',  payment: 'Net 30', totalOrders: 27, totalValue: 164000, joined: '2021-11-20' },
    { id: 'SUP-XIAOMI',  userId: 'u-xiaomi',  name: 'Xiaomi Corporation',    contact: 'Xiaomi Official',email: 'xiaomi@supplier.com',  phone: '+86 400-100-5678',category: 'Electronics', status: 'active', rating: 4.7, city: 'Beijing',    country: 'China',   taxId: 'CN-XMI-0005', payment: 'Net 30', totalOrders: 42, totalValue: 152000, joined: '2023-01-15' },
    { id: 'SUP-HUAWEI',  userId: 'u-huawei',  name: 'Huawei Technologies',   contact: 'Huawei Partner', email: 'huawei@supplier.com',  phone: '+86 755-2878-0808',category:'Electronics', status: 'active', rating: 4.5, city: 'Shenzhen',   country: 'China',   taxId: 'CN-HWI-0006', payment: 'Net 45', totalOrders: 17, totalValue: 121000, joined: '2023-03-08' },
    { id: 'SUP-LENOVO',  userId: 'u-lenovo',  name: 'Lenovo Group',          contact: 'Lenovo Store',   email: 'lenovo@supplier.com',  phone: '+86 400-100-6000',category: 'Electronics', status: 'active', rating: 4.6, city: 'Beijing',    country: 'China',   taxId: 'CN-LNV-0007', payment: 'Net 30', totalOrders: 21, totalValue: 178000, joined: '2022-07-19' },
    { id: 'SUP-SONY',    userId: 'u-sony',    name: 'Sony Corporation',      contact: 'Sony Centre',    email: 'sony@supplier.com',    phone: '+81 3-6748-2111', category: 'Electronics', status: 'active', rating: 4.7, city: 'Tokyo',      country: 'Japan',   taxId: 'JP-SNY-0008', payment: 'Net 60', totalOrders: 14, totalValue: 96000,  joined: '2022-09-30' },
  ],

  /* ── PURCHASE REQUISITIONS (ACME procurement requests) ─── */
  requisitions: [
    { id: 'PR-2025-0142', type: 'direct',   title: 'iPhone 15 Pro — resale stock',        dept: 'Sales',        requester: 'James Rivera', amount: 49990, status: 'approved', priority: 'high',   category: 'Phones',      created: '2026-05-01', approvedBy: 'Sarah Chen', items: 10 },
    { id: 'PR-2025-0141', type: 'indirect', title: 'Microsoft 365 licenses (annual)',     dept: 'IT',           requester: 'James Rivera', amount:  3200, status: 'pending',  priority: 'low',    category: 'Software',    created: '2026-05-02', approvedBy: null,         items: 25 },
    { id: 'PR-2025-0140', type: 'direct',   title: 'Galaxy S24 Ultra — resale stock',     dept: 'Sales',        requester: 'James Rivera', amount: 45990, status: 'approved', priority: 'medium', category: 'Phones',      created: '2026-04-28', approvedBy: 'Sarah Chen', items: 10 },
    { id: 'PR-2025-0139', type: 'direct',   title: 'ASUS ROG Strix gaming laptops',       dept: 'Sales',        requester: 'James Rivera', amount: 64990, status: 'rejected', priority: 'high',   category: 'Laptops',     created: '2026-04-25', approvedBy: 'Sarah Chen', items: 10 },
    { id: 'PR-2025-0138', type: 'direct',   title: 'Xiaomi Redmi Note 13 Pro — bulk',     dept: 'Sales',        requester: 'James Rivera', amount: 25980, status: 'approved', priority: 'medium', category: 'Phones',      created: '2026-04-22', approvedBy: 'Priya Nair', items: 20 },
    { id: 'PR-2025-0137', type: 'direct',   title: 'Lenovo ThinkPad X1 fleet',            dept: 'Sales',        requester: 'James Rivera', amount: 61990, status: 'pending',  priority: 'high',   category: 'Laptops',     created: '2026-04-20', approvedBy: null,         items: 10 },
    { id: 'PR-2025-0136', type: 'indirect', title: 'Warehouse logistics contract',        dept: 'Operations',   requester: 'James Rivera', amount: 18000, status: 'approved', priority: 'medium', category: 'Logistics',   created: '2026-04-18', approvedBy: 'Priya Nair', items: 1  },
    { id: 'PR-2025-0135', type: 'direct',   title: 'Sony WH-1000XM5 headphones',          dept: 'Sales',        requester: 'James Rivera', amount: 15990, status: 'approved', priority: 'low',    category: 'Audio',       created: '2026-04-15', approvedBy: 'Sarah Chen', items: 10 },
    { id: 'PR-2025-0134', type: 'direct',   title: 'HP LaserJet printers for office',     dept: 'Admin',        requester: 'James Rivera', amount:  6594, status: 'pending',  priority: 'medium', category: 'Accessories', created: '2026-05-03', approvedBy: null,         items: 6  },
    { id: 'PR-2025-0133', type: 'direct',   title: 'iPad Air — retail demo units',        dept: 'Sales',        requester: 'James Rivera', amount: 32990, status: 'approved', priority: 'low',    category: 'Tablets',     created: '2026-05-04', approvedBy: 'Priya Nair', items: 10 },
  ],

  /* ── PURCHASE ORDERS (ACME → brand suppliers) ──────────── */
  purchaseOrders: [
    { id: 'PO-2025-0098', type: 'direct',   prId: 'PR-2025-0142', supplier: 'Apple Inc.',          supId: 'SUP-APPLE',   buyerId: 'u-proc', materialCode: 'IPH 001', amount: 49990, status: 'delivered',  created: '2026-05-04', delivery: '2026-05-12', approvedBy: 'Priya Nair', payStatus: 'paid'    },
    { id: 'PO-2025-0097', type: 'direct',   prId: 'PR-2025-0140', supplier: 'Samsung Electronics', supId: 'SUP-SAMSUNG', buyerId: 'u-proc', materialCode: 'GS 002',  amount: 45990, status: 'confirmed',  created: '2026-04-30', delivery: '2026-05-15', approvedBy: 'Priya Nair', payStatus: 'pending' },
    { id: 'PO-2025-0096', type: 'direct',   prId: 'PR-2025-0138', supplier: 'Xiaomi Corporation',  supId: 'SUP-XIAOMI',  buyerId: 'u-proc', materialCode: 'RN 003',  amount: 25980, status: 'delivered',  created: '2026-04-24', delivery: '2026-05-01', approvedBy: 'Sarah Chen', payStatus: 'paid'    },
    { id: 'PO-2025-0095', type: 'direct',   prId: 'PR-2025-0135', supplier: 'Sony Corporation',    supId: 'SUP-SONY',    buyerId: 'u-proc', materialCode: 'XM5 001', amount: 15990, status: 'confirmed',  created: '2026-04-20', delivery: '2026-04-30', approvedBy: 'Priya Nair', payStatus: 'overdue' },
    { id: 'PO-2025-0094', type: 'direct',   prId: 'PR-2025-0133', supplier: 'Apple Inc.',          supId: 'SUP-APPLE',   buyerId: 'u-proc', materialCode: 'IPD 002', amount: 32990, status: 'delivered',  created: '2026-04-16', delivery: '2026-04-20', approvedBy: 'Sarah Chen', payStatus: 'paid'    },
    { id: 'PO-2025-0093', type: 'indirect', prId: 'PR-2025-0136', supplier: 'Apple Inc.',          supId: 'SUP-APPLE',   buyerId: 'u-proc', materialCode: null,      amount: 18000, status: 'in_transit', created: '2026-05-05', delivery: '2026-05-18', approvedBy: 'Priya Nair', payStatus: 'pending' },
    { id: 'PO-2025-0092', type: 'direct',   prId: 'PR-2025-0137', supplier: 'Lenovo Group',        supId: 'SUP-LENOVO',  buyerId: 'u-proc', materialCode: 'X1 002',  amount: 61990, status: 'pending',    created: '2026-05-04', delivery: '2026-05-25', approvedBy: null,        payStatus: 'pending' },
  ],

  /* ── INVOICES ──────────────────────────────────────────── */
  invoices: [
    { id: 'INV-2025-0310', poId: 'PO-2025-0098', supplier: 'Apple Inc.',          amount: 49990, tax: 2999, total: 52989, status: 'paid',     issued: '2026-05-14', due: '2026-06-13', paid: '2026-05-28', matchStatus: 'matched'  },
    { id: 'INV-2025-0309', poId: 'PO-2025-0096', supplier: 'Xiaomi Corporation',  amount: 25980, tax: 1559, total: 27539, status: 'paid',     issued: '2026-05-02', due: '2026-06-01', paid: '2026-05-10', matchStatus: 'matched'  },
    { id: 'INV-2025-0308', poId: 'PO-2025-0094', supplier: 'Apple Inc.',          amount: 32990, tax: 1979, total: 34969, status: 'paid',     issued: '2026-04-21', due: '2026-05-21', paid: '2026-05-02', matchStatus: 'matched'  },
    { id: 'INV-2025-0307', poId: 'PO-2025-0097', supplier: 'Samsung Electronics', amount: 45990, tax: 2759, total: 48749, status: 'pending',  issued: '2026-05-15', due: '2026-06-14', paid: null,         matchStatus: 'matched'  },
    { id: 'INV-2025-0306', poId: 'PO-2025-0095', supplier: 'Sony Corporation',    amount: 15990, tax:  959, total: 16949, status: 'overdue',  issued: '2026-04-30', due: '2026-05-15', paid: null,         matchStatus: 'mismatch' },
    { id: 'INV-2025-0305', poId: 'PO-2025-0093', supplier: 'Apple Inc.',          amount: 18000, tax: 1080, total: 19080, status: 'pending',  issued: '2026-05-18', due: '2026-06-02', paid: null,         matchStatus: 'pending'  },
  ],

  /* ── PAYMENTS ──────────────────────────────────────────── */
  payments: [
    { id: 'PAY-2025-0201', invId: 'INV-2025-0310', supplier: 'Apple Inc.',          amount: 52989, method: 'Bank Transfer', ref: 'TT-26051-001', status: 'completed', date: '2026-05-28', processedBy: 'Priya Nair' },
    { id: 'PAY-2025-0200', invId: 'INV-2025-0309', supplier: 'Xiaomi Corporation',  amount: 27539, method: 'Bank Transfer', ref: 'TT-26051-002', status: 'completed', date: '2026-05-10', processedBy: 'Priya Nair' },
    { id: 'PAY-2025-0199', invId: 'INV-2025-0308', supplier: 'Apple Inc.',          amount: 34969, method: 'Cheque',        ref: 'CHQ-0026477',  status: 'completed', date: '2026-05-02', processedBy: 'Priya Nair' },
    { id: 'PAY-2025-0198', invId: 'INV-2025-0307', supplier: 'Samsung Electronics', amount: 48749, method: 'Bank Transfer', ref: 'TT-PEND-001',  status: 'scheduled', date: '2026-06-14', processedBy: 'Priya Nair' },
    { id: 'PAY-2025-0197', invId: 'INV-2025-0306', supplier: 'Sony Corporation',    amount: 16949, method: 'Bank Transfer', ref: 'TT-OVD-002',   status: 'overdue',   date: '2026-05-15', processedBy: 'Priya Nair' },
  ],

  /* ── DASHBOARD CHARTS DATA ─────────────────────────────── */
  monthlySpend: {
    labels: ['Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May'],
    data:   [98400, 142300, 88200, 121500, 156700, 134600, 161200]
  },

  categorySpend: {
    labels: ['Phones', 'Laptops', 'Tablets', 'Monitors', 'Audio', 'Accessories'],
    data:   [34, 28, 14, 12, 8, 4]
  },

  poStatus: {
    labels: ['Delivered', 'Confirmed', 'In Transit', 'Pending'],
    data:   [38, 27, 14, 12]
  },

  supplierPerformance: [
    { name: 'Apple Inc.',          score: 98, delivery: 99, quality: 98, value: 96 },
    { name: 'Samsung Electronics', score: 95, delivery: 94, quality: 97, value: 95 },
    { name: 'Sony Corporation',    score: 93, delivery: 92, quality: 96, value: 92 },
    { name: 'Lenovo Group',        score: 91, delivery: 90, quality: 93, value: 91 },
    { name: 'Xiaomi Corporation',  score: 89, delivery: 87, quality: 90, value: 93 },
  ],

  /* ── NOTIFICATIONS ─────────────────────────────────────── */
  notifications: [
    { id: 1, type: 'warning', title: 'Invoice Overdue',     msg: 'INV-2025-0306 (Sony) is overdue',            time: '2 hours ago', read: false },
    { id: 2, type: 'info',    title: 'New Requisition',     msg: 'PR-2025-0141 submitted by James Rivera',     time: '5 hours ago', read: false },
    { id: 3, type: 'success', title: 'Payment Processed',   msg: 'PAY-2025-0201 to Apple Inc. completed',      time: '1 day ago',   read: true  },
    { id: 4, type: 'danger',  title: 'Invoice Mismatch',    msg: 'INV-2025-0306 (Sony) has a PO mismatch',     time: '1 day ago',   read: false },
    { id: 5, type: 'info',    title: 'PO Delivered',        msg: 'PO-2025-0098 (Apple) delivered',             time: '2 days ago',  read: true  },
  ],

  /* ── APPROVAL WORKFLOWS ────────────────────────────────── */
  approvalRules: [
    { range: 'RM 0 – RM 5,000',     approver: 'Department Head',    sla: '24 hours' },
    { range: 'RM 5,001 – RM 25,000',approver: 'Finance Manager',    sla: '48 hours' },
    { range: 'RM 25,001 – RM 100,000',approver: 'Director',          sla: '72 hours' },
    { range: 'Above RM 100,000',    approver: 'CEO / Board',         sla: '5 business days' },
  ],
};

/* ── LOCAL STORAGE HELPERS ─────────────────────────────────── */
const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem('p2p_' + key)) || null; }
    catch { return null; }
  },
  set(key, val) {
    localStorage.setItem('p2p_' + key, JSON.stringify(val));
  },
  remove(key) {
    localStorage.removeItem('p2p_' + key);
  },

  /* Current user session */
  getUser() { return this.get('user'); },
  setUser(user) { this.set('user', user); },
  clearUser() { this.remove('user'); },

  /* Dynamic data (allows CRUD in session) */
  getSuppliers()     { return this.get('suppliers')     || [...P2PData.suppliers]; },
  getRequisitions()  { return (this.get('requisitions')  || [...P2PData.requisitions]).map(withType); },
  getPOs()           { return (this.get('pos')           || [...P2PData.purchaseOrders]).map(withType); },
  getInvoices()      { return this.get('invoices')      || [...P2PData.invoices]; },
  getPayments()      { return this.get('payments')      || [...P2PData.payments]; },
  getProducts()      { return this.get('products')      || JSON.parse(JSON.stringify(P2PData.products)); },
  getOrders()        { return this.get('orders')        || [...P2PData.orders]; },

  saveSuppliers(d)    { this.set('suppliers', d); },
  saveRequisitions(d) { this.set('requisitions', d); },
  savePOs(d)          { this.set('pos', d); },
  saveInvoices(d)     { this.set('invoices', d); },
  savePayments(d)     { this.set('payments', d); },
  saveProducts(d)     { this.set('products', d); },
  saveOrders(d)       { this.set('orders', d); },
};

/* Default any legacy record without a PO type to 'direct' */
function withType(rec) { return rec.type ? rec : { ...rec, type: 'direct' }; }

/* In-stock count for a product */
function stockOf(product) {
  return (product.units || []).filter(u => u.status === 'in_stock').length;
}

/* Next sequential material code for a product, e.g. AL 011 */
function nextMaterialCode(product) {
  const max = (product.units || []).reduce((m, u) => {
    const n = parseInt(String(u.code).replace(/\D/g, ''), 10) || 0;
    return Math.max(m, n);
  }, 0);
  return product.materialPrefix + ' ' + String(max + 1).padStart(3, '0');
}

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
    { id: 'u-apple',   name: 'Apple Store',     brandName: 'Apple',   email: 'apple@supplier.com',   password: 'pass123', role: 'supplier', dept: 'Apple Inc.',            avatar: '#111827', initials: 'AP' },
    { id: 'u-samsung', name: 'Samsung Sales',   brandName: 'Samsung', email: 'samsung@supplier.com', password: 'pass123', role: 'supplier', dept: 'Samsung Electronics',   avatar: '#1428A0', initials: 'SS' },
    { id: 'u-asus',    name: 'ASUS Reseller',   brandName: 'Asus',    email: 'asus@supplier.com',    password: 'pass123', role: 'supplier', dept: 'ASUSTeK',               avatar: '#00539B', initials: 'AS' },
    { id: 'u-hp',      name: 'HP Distributor',  brandName: 'HP',      email: 'hp@supplier.com',      password: 'pass123', role: 'supplier', dept: 'HP Inc.',               avatar: '#0096D6', initials: 'HP' },
    { id: 'u-xiaomi',  name: 'Xiaomi Official',  brandName: 'Xiaomi',  email: 'xiaomi@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Xiaomi Corp.',         avatar: '#FF6900', initials: 'XM' },
    { id: 'u-huawei',  name: 'Huawei Partner',  brandName: 'Huawei',  email: 'huawei@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Huawei Technologies',   avatar: '#CF0A2C', initials: 'HW' },
    { id: 'u-lenovo',  name: 'Lenovo Store',    brandName: 'Lenovo',  email: 'lenovo@supplier.com',  password: 'pass123', role: 'supplier', dept: 'Lenovo Group',          avatar: '#E2231A', initials: 'LN' },
    { id: 'u-sony',    name: 'Sony Centre',     brandName: 'Sony',    email: 'sony@supplier.com',    password: 'pass123', role: 'supplier', dept: 'Sony Corp.',            avatar: '#000000', initials: 'SN' },
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

  /* ── SUPPLIERS ─────────────────────────────────────────── */
  suppliers: [
    { id: 'SUP-001', name: 'TechCore Solutions Sdn Bhd',   contact: 'Ali Hassan',    email: 'ali@techcore.my',       phone: '+60 3-1234 5678', category: 'IT Hardware',    status: 'active',   rating: 4.8, city: 'Kuala Lumpur', country: 'Malaysia', taxId: 'MY-TC-89023', payment: 'Net 30',  totalOrders: 42, totalValue: 215400, joined: '2022-03-14' },
    { id: 'SUP-002', name: 'GlobalOffice Supplies Bhd',    contact: 'Lee Mei Ling',  email: 'meiLing@gos.com.my',   phone: '+60 3-2345 6789', category: 'Office Supplies',status: 'active',   rating: 4.5, city: 'Petaling Jaya',country: 'Malaysia', taxId: 'MY-GO-40112', payment: 'Net 15',  totalOrders: 118, totalValue: 86200, joined: '2021-07-01' },
    { id: 'SUP-003', name: 'Nexgen Cloud Services Ltd',    contact: 'Ravi Kumar',    email: 'ravi@nexgen.io',        phone: '+65 9876 5432',   category: 'Cloud & SaaS',  status: 'active',   rating: 4.9, city: 'Singapore',    country: 'Singapore', taxId: 'SG-NG-30987', payment: 'Net 30',  totalOrders: 28, totalValue: 432000, joined: '2023-01-20' },
    { id: 'SUP-004', name: 'QuickPrint & Packaging Co.',  contact: 'Fatimah Yusof', email: 'fatimah@quickprint.my', phone: '+60 3-3456 7890', category: 'Printing',       status: 'inactive', rating: 3.9, city: 'Shah Alam',    country: 'Malaysia', taxId: 'MY-QP-55631', payment: 'Net 45',  totalOrders: 15, totalValue: 23100, joined: '2022-11-10' },
    { id: 'SUP-005', name: 'Acme Logistics & Freight',    contact: 'Danny Tan',     email: 'danny@acmelogistics.com',phone:'+60 4-4567 8901',  category: 'Logistics',      status: 'active',   rating: 4.3, city: 'Penang',       country: 'Malaysia', taxId: 'MY-AL-71240', payment: 'Net 30',  totalOrders: 67, totalValue: 156800, joined: '2021-02-28' },
    { id: 'SUP-006', name: 'Vertex Industrial Equipment', contact: 'Omar Said',     email: 'omar@vertex-ind.com',   phone: '+60 5-5678 9012', category: 'Equipment',      status: 'active',   rating: 4.6, city: 'Johor Bahru',  country: 'Malaysia', taxId: 'MY-VI-66503', payment: 'Net 60',  totalOrders: 19, totalValue: 348000, joined: '2022-05-18' },
    { id: 'SUP-007', name: 'SafeGuard Security Systems',  contact: 'Lim Wei Jie',   email: 'wei@safeguard.my',      phone: '+60 3-6789 0123', category: 'Security',       status: 'pending',  rating: 4.1, city: 'Subang Jaya',  country: 'Malaysia', taxId: 'MY-SG-82441', payment: 'Net 30',  totalOrders: 8,  totalValue: 78500, joined: '2024-02-12' },
    { id: 'SUP-008', name: 'PrimeMed Healthcare Supplies',contact: 'Dr. Ananya Das', email: 'ananya@primemed.in',   phone: '+91 98765 43210', category: 'Medical',        status: 'active',   rating: 4.7, city: 'Bangalore',    country: 'India',    taxId: 'IN-PM-34511', payment: 'Net 15',  totalOrders: 33, totalValue: 112000, joined: '2023-06-01' },
  ],

  /* ── PURCHASE REQUISITIONS ─────────────────────────────── */
  requisitions: [
    { id: 'PR-2025-0142', title: 'Laptop Procurement for Engineering Team',       dept: 'Engineering',      requester: 'James Rivera', amount: 45600, status: 'approved',  priority: 'high',   category: 'IT Hardware',    created: '2025-04-01', approvedBy: 'Sarah Chen',  items: 12 },
    { id: 'PR-2025-0141', type: 'indirect', title: 'Office Stationery & Supplies Q2',              dept: 'Admin',            requester: 'Tom Bradley',  amount:  3200, status: 'pending',   priority: 'low',    category: 'Office Supplies',created: '2025-04-02', approvedBy: null,          items: 28 },
    { id: 'PR-2025-0140', type: 'indirect', title: 'Cloud Storage Upgrade — AWS S3',               dept: 'IT',               requester: 'James Rivera', amount: 18000, status: 'approved',  priority: 'medium', category: 'Cloud & SaaS',  created: '2025-03-28', approvedBy: 'Sarah Chen',  items: 1  },
    { id: 'PR-2025-0139', title: 'Industrial Safety Equipment & PPE',            dept: 'Operations',       requester: 'Tom Bradley',  amount: 12800, status: 'rejected',  priority: 'high',   category: 'Equipment',      created: '2025-03-25', approvedBy: 'Sarah Chen',  items: 45 },
    { id: 'PR-2025-0138', title: 'Marketing Printing Materials — Q2 Campaign',  dept: 'Marketing',        requester: 'James Rivera', amount:  5400, status: 'approved',  priority: 'medium', category: 'Printing',       created: '2025-03-22', approvedBy: 'Priya Nair',  items: 6  },
    { id: 'PR-2025-0137', title: 'Server Infrastructure Upgrade',                dept: 'IT',               requester: 'Tom Bradley',  amount: 87500, status: 'pending',   priority: 'high',   category: 'IT Hardware',    created: '2025-03-20', approvedBy: null,          items: 8  },
    { id: 'PR-2025-0136', type: 'indirect', title: 'Annual Freight Contract Renewal',              dept: 'Logistics',        requester: 'James Rivera', amount: 36000, status: 'approved',  priority: 'medium', category: 'Logistics',      created: '2025-03-18', approvedBy: 'Priya Nair',  items: 1  },
    { id: 'PR-2025-0135', type: 'indirect', title: 'HR Software License Subscription',             dept: 'Human Resources',  requester: 'Tom Bradley',  amount:  9600, status: 'approved',  priority: 'low',    category: 'Cloud & SaaS',  created: '2025-03-15', approvedBy: 'Sarah Chen',  items: 1  },
    { id: 'PR-2025-0134', title: 'Security CCTV System Upgrade',                 dept: 'Security',         requester: 'James Rivera', amount: 22400, status: 'pending',   priority: 'medium', category: 'Security',       created: '2025-04-03', approvedBy: null,          items: 15 },
    { id: 'PR-2025-0133', title: 'Medical Supplies for First Aid Stations',      dept: 'HR',               requester: 'Tom Bradley',  amount:  4100, status: 'approved',  priority: 'low',    category: 'Medical',        created: '2025-04-04', approvedBy: 'Priya Nair',  items: 22 },
  ],

  /* ── PURCHASE ORDERS ───────────────────────────────────── */
  purchaseOrders: [
    { id: 'PO-2025-0098', prId: 'PR-2025-0142', supplier: 'TechCore Solutions Sdn Bhd',  supId: 'SUP-001', amount: 45600, status: 'delivered', created: '2025-04-04', delivery: '2025-04-12', approvedBy: 'Priya Nair',   payStatus: 'paid'     },
    { id: 'PO-2025-0097', type: 'indirect', prId: 'PR-2025-0140', supplier: 'Nexgen Cloud Services Ltd',   supId: 'SUP-003', amount: 18000, status: 'confirmed', created: '2025-03-30', delivery: '2025-04-15', approvedBy: 'Priya Nair',   payStatus: 'pending'  },
    { id: 'PO-2025-0096', prId: 'PR-2025-0138', supplier: 'QuickPrint & Packaging Co.', supId: 'SUP-004', amount:  5400, status: 'delivered', created: '2025-03-24', delivery: '2025-04-01', approvedBy: 'Sarah Chen',   payStatus: 'paid'     },
    { id: 'PO-2025-0095', type: 'indirect', prId: 'PR-2025-0136', supplier: 'Acme Logistics & Freight',   supId: 'SUP-005', amount: 36000, status: 'confirmed', created: '2025-03-20', delivery: '2025-03-31', approvedBy: 'Priya Nair',   payStatus: 'overdue'  },
    { id: 'PO-2025-0094', type: 'indirect', prId: 'PR-2025-0135', supplier: 'Nexgen Cloud Services Ltd',   supId: 'SUP-003', amount:  9600, status: 'delivered', created: '2025-03-16', delivery: '2025-03-20', approvedBy: 'Sarah Chen',   payStatus: 'paid'     },
    { id: 'PO-2025-0093', prId: 'PR-2025-0133', supplier: 'PrimeMed Healthcare Supplies',supId:'SUP-008', amount:  4100, status: 'in_transit',created: '2025-04-05', delivery: '2025-04-18', approvedBy: 'Priya Nair',   payStatus: 'pending'  },
    { id: 'PO-2025-0092', prId: 'PR-2025-0134', supplier: 'SafeGuard Security Systems',  supId: 'SUP-007', amount: 22400, status: 'pending',   created: '2025-04-04', delivery: '2025-04-25', approvedBy: null,           payStatus: 'pending'  },
  ],

  /* ── INVOICES ──────────────────────────────────────────── */
  invoices: [
    { id: 'INV-2025-0310', poId: 'PO-2025-0098', supplier: 'TechCore Solutions Sdn Bhd',  amount: 45600, tax: 2736, total: 48336, status: 'paid',    issued: '2025-04-14', due: '2025-05-14', paid: '2025-04-28', matchStatus: 'matched'   },
    { id: 'INV-2025-0309', poId: 'PO-2025-0096', supplier: 'QuickPrint & Packaging Co.',  amount:  5400, tax:   324, total:  5724, status: 'paid',    issued: '2025-04-02', due: '2025-04-17', paid: '2025-04-10', matchStatus: 'matched'   },
    { id: 'INV-2025-0308', poId: 'PO-2025-0094', supplier: 'Nexgen Cloud Services Ltd',   amount:  9600, tax:   576, total: 10176, status: 'paid',    issued: '2025-03-21', due: '2025-04-05', paid: '2025-04-02', matchStatus: 'matched'   },
    { id: 'INV-2025-0307', poId: 'PO-2025-0097', supplier: 'Nexgen Cloud Services Ltd',   amount: 18000, tax:  1080, total: 19080, status: 'pending', issued: '2025-04-15', due: '2025-05-15', paid: null,         matchStatus: 'matched'   },
    { id: 'INV-2025-0306', poId: 'PO-2025-0095', supplier: 'Acme Logistics & Freight',   amount: 36000, tax:  2160, total: 38160, status: 'overdue', issued: '2025-03-31', due: '2025-04-15', paid: null,         matchStatus: 'mismatch'  },
    { id: 'INV-2025-0305', poId: 'PO-2025-0093', supplier: 'PrimeMed Healthcare Supplies',amount:  4100, tax:   246, total:  4346, status: 'pending', issued: '2025-04-18', due: '2025-05-03', paid: null,         matchStatus: 'pending'   },
    { id: 'INV-2025-0304', poId: null,            supplier: 'Vertex Industrial Equipment', amount: 12000, tax:   720, total: 12720, status: 'disputed',issued: '2025-04-10', due: '2025-04-25', paid: null,         matchStatus: 'mismatch'  },
  ],

  /* ── PAYMENTS ──────────────────────────────────────────── */
  payments: [
    { id: 'PAY-2025-0201', invId: 'INV-2025-0310', supplier: 'TechCore Solutions Sdn Bhd',  amount: 48336, method: 'Bank Transfer', ref: 'TT-25041-001', status: 'completed', date: '2025-04-28', processedBy: 'Priya Nair'  },
    { id: 'PAY-2025-0200', invId: 'INV-2025-0309', supplier: 'QuickPrint & Packaging Co.',  amount:  5724, method: 'Bank Transfer', ref: 'TT-25041-002', status: 'completed', date: '2025-04-10', processedBy: 'Aisha Malik' },
    { id: 'PAY-2025-0199', invId: 'INV-2025-0308', supplier: 'Nexgen Cloud Services Ltd',   amount: 10176, method: 'Cheque',        ref: 'CHQ-0023477',  status: 'completed', date: '2025-04-02', processedBy: 'Priya Nair'  },
    { id: 'PAY-2025-0198', invId: 'INV-2025-0307', supplier: 'Nexgen Cloud Services Ltd',   amount: 19080, method: 'Bank Transfer', ref: 'TT-PEND-001',  status: 'scheduled', date: '2025-05-15', processedBy: 'Aisha Malik' },
    { id: 'PAY-2025-0197', invId: 'INV-2025-0306', supplier: 'Acme Logistics & Freight',   amount: 38160, method: 'Bank Transfer', ref: 'TT-OVD-002',   status: 'overdue',   date: '2025-04-15', processedBy: 'Priya Nair'  },
    { id: 'PAY-2025-0196', invId: 'INV-2025-0305', supplier: 'PrimeMed Healthcare Supplies',amount:  4346, method: 'Bank Transfer', ref: 'TT-PEND-002',  status: 'pending',   date: '2025-05-03', processedBy: 'Aisha Malik' },
  ],

  /* ── DASHBOARD CHARTS DATA ─────────────────────────────── */
  monthlySpend: {
    labels: ['Oct', 'Nov', 'Dec', 'Jan', 'Feb', 'Mar', 'Apr'],
    data:   [82400, 95100, 148300, 72200, 108500, 131700, 119600]
  },

  categorySpend: {
    labels: ['IT Hardware', 'Cloud & SaaS', 'Logistics', 'Office Supplies', 'Equipment', 'Other'],
    data:   [35, 22, 18, 10, 9, 6]
  },

  poStatus: {
    labels: ['Delivered', 'Confirmed', 'In Transit', 'Pending'],
    data:   [42, 31, 15, 12]
  },

  supplierPerformance: [
    { name: 'Nexgen Cloud Services', score: 98, delivery: 99, quality: 98, value: 97 },
    { name: 'TechCore Solutions',    score: 95, delivery: 94, quality: 97, value: 95 },
    { name: 'PrimeMed Healthcare',   score: 93, delivery: 91, quality: 96, value: 93 },
    { name: 'Vertex Industrial',     score: 91, delivery: 89, quality: 94, value: 90 },
    { name: 'Acme Logistics',        score: 88, delivery: 85, quality: 91, value: 87 },
  ],

  /* ── NOTIFICATIONS ─────────────────────────────────────── */
  notifications: [
    { id: 1, type: 'warning', title: 'Invoice Overdue',        msg: 'INV-2025-0306 is 10 days overdue',          time: '2 hours ago', read: false },
    { id: 2, type: 'info',    title: 'New Requisition',        msg: 'PR-2025-0142 submitted by James Rivera',    time: '5 hours ago', read: false },
    { id: 3, type: 'success', title: 'Payment Processed',      msg: 'PAY-2025-0201 of RM 48,336 completed',     time: '1 day ago',   read: true  },
    { id: 4, type: 'danger',  title: 'Invoice Mismatch',       msg: 'INV-2025-0304 has a PO mismatch',          time: '1 day ago',   read: false },
    { id: 5, type: 'info',    title: 'PO Delivered',           msg: 'PO-2025-0098 delivered successfully',      time: '2 days ago',  read: true  },
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

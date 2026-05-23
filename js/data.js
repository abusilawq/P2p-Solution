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
  users: [
    { id: 'u-admin',  name: 'Sarah Chen',   email: 'admin@shop.com',  password: 'pass123', role: 'admin',  dept: 'Marketplace Admin', avatar: '#2563EB', initials: 'SC' },
    { id: 'u-buyer',  name: 'James Rivera',  email: 'buyer@shop.com',  password: 'pass123', role: 'buyer',  dept: 'Procurement',       avatar: '#10B981', initials: 'JR' },
    { id: 'u-seller', name: 'Priya Nair',   email: 'seller@shop.com', password: 'pass123', role: 'seller', dept: 'IT Supplies',       avatar: '#F59E0B', initials: 'PN' },
  ],

  /* ── PRODUCTS / INVENTORY (Direct PO resale goods) ─────── */
  products: [
    { id: 'P-AL', category: 'Laptops',     brand: 'Asus',     name: 'Asus Laptop',         emoji: '💻', materialPrefix: 'AL', price: 3200, sellerId: 'u-seller', units: _genUnits('AL', 10, 0) },
    { id: 'P-DL', category: 'Laptops',     brand: 'Dell',     name: 'Dell Laptop',         emoji: '💻', materialPrefix: 'DL', price: 3800, sellerId: 'u-seller', units: _genUnits('DL', 6, 1)  },
    { id: 'P-SP', category: 'Phones',      brand: 'Samsung',  name: 'Samsung Galaxy Phone',emoji: '📱', materialPrefix: 'SP', price: 2400, sellerId: 'u-seller', units: _genUnits('SP', 8, 2)  },
    { id: 'P-AP', category: 'Phones',      brand: 'Apple',    name: 'Apple iPhone',        emoji: '📱', materialPrefix: 'AP', price: 4500, sellerId: 'u-seller', units: _genUnits('AP', 5, 0)  },
    { id: 'P-LM', category: 'Accessories', brand: 'Logitech', name: 'Logitech Mouse',      emoji: '🖱️', materialPrefix: 'LM', price: 120,  sellerId: 'u-seller', units: _genUnits('LM', 12, 3) },
    { id: 'P-AC', category: 'Accessories', brand: 'Anker',    name: 'Anker Fast Charger',  emoji: '🔌', materialPrefix: 'AC', price: 90,   sellerId: 'u-seller', units: _genUnits('AC', 4, 4)  },
  ],

  /* ── ORDERS (buyer purchases) ──────────────────────────── */
  orders: [
    { id: 'ORD-1001', buyerId: 'u-buyer', productId: 'P-AL', productName: 'Asus Laptop',  code: 'AL 001', qty: 1, price: 3200, total: 3200, status: 'delivered', date: '2026-05-10' },
    { id: 'ORD-1002', buyerId: 'u-buyer', productId: 'P-SP', productName: 'Samsung Galaxy Phone', code: 'SP 001', qty: 1, price: 2400, total: 2400, status: 'in_transit', date: '2026-05-18' },
    { id: 'ORD-1003', buyerId: 'u-buyer', productId: 'P-LM', productName: 'Logitech Mouse', code: 'LM 001', qty: 1, price: 120, total: 120, status: 'completed', date: '2026-05-20' },
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

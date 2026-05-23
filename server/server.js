/* ============================================================
   P2P Solutions — Express Backend Server
   ============================================================
   Provides static file hosting + REST API for procurement data.
   Data is persisted to a JSON file (db.json) for simplicity.
   ============================================================ */

const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_FILE = path.join(__dirname, 'db.json');

// ── MIDDLEWARE ─────────────────────────────────────────────
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// CORS
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Serve static frontend (one level up from /server)
app.use(express.static(path.join(__dirname, '..')));

// ── DATABASE HELPERS ───────────────────────────────────────
function readDB() {
  try {
    if (!fs.existsSync(DB_FILE)) {
      const initial = {
        users: [], suppliers: [], requisitions: [],
        purchaseOrders: [], invoices: [], payments: []
      };
      fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
      return initial;
    }
    return JSON.parse(fs.readFileSync(DB_FILE, 'utf-8'));
  } catch (err) {
    console.error('DB read error:', err);
    return { users: [], suppliers: [], requisitions: [], purchaseOrders: [], invoices: [], payments: [] };
  }
}

function writeDB(data) {
  fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
}

// ── AUTH ───────────────────────────────────────────────────
const VALID_USERS = [
  { id: 'u-admin',  name: 'Sarah Chen',   email: 'admin@shop.com',  password: 'pass123', role: 'admin'  },
  { id: 'u-buyer',  name: 'James Rivera',  email: 'buyer@shop.com',  password: 'pass123', role: 'buyer'  },
  { id: 'u-seller', name: 'Priya Nair',   email: 'seller@shop.com', password: 'pass123', role: 'seller' },
];

app.post('/api/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  const user = VALID_USERS.find(u =>
    u.email === email && u.password === password && u.role === role
  );
  if (!user) return res.status(401).json({ error: 'Invalid credentials' });
  const { password: _, ...safeUser } = user;
  res.json({ success: true, user: safeUser, token: 'demo-token-' + Date.now() });
});

app.post('/api/auth/logout', (_req, res) => res.json({ success: true }));

// ── GENERIC CRUD FACTORY ───────────────────────────────────
function crudRoutes(name, idPrefix) {
  app.get(`/api/${name}`, (_req, res) => {
    res.json(readDB()[name] || []);
  });

  app.get(`/api/${name}/:id`, (req, res) => {
    const item = (readDB()[name] || []).find(x => x.id === req.params.id);
    if (!item) return res.status(404).json({ error: 'Not found' });
    res.json(item);
  });

  app.post(`/api/${name}`, (req, res) => {
    const db = readDB();
    const newItem = {
      id: idPrefix + '-' + Date.now().toString(36).toUpperCase(),
      ...req.body,
      createdAt: new Date().toISOString()
    };
    db[name] = db[name] || [];
    db[name].unshift(newItem);
    writeDB(db);
    res.status(201).json(newItem);
  });

  app.put(`/api/${name}/:id`, (req, res) => {
    const db = readDB();
    db[name] = db[name] || [];
    const idx = db[name].findIndex(x => x.id === req.params.id);
    if (idx === -1) return res.status(404).json({ error: 'Not found' });
    db[name][idx] = { ...db[name][idx], ...req.body, updatedAt: new Date().toISOString() };
    writeDB(db);
    res.json(db[name][idx]);
  });

  app.delete(`/api/${name}/:id`, (req, res) => {
    const db = readDB();
    db[name] = (db[name] || []).filter(x => x.id !== req.params.id);
    writeDB(db);
    res.json({ success: true });
  });
}

crudRoutes('suppliers',      'SUP');
crudRoutes('requisitions',   'PR');
crudRoutes('purchaseOrders', 'PO');
crudRoutes('invoices',       'INV');
crudRoutes('payments',       'PAY');
crudRoutes('products',       'P');
crudRoutes('orders',         'ORD');

// ── WORKFLOW ACTIONS ───────────────────────────────────────
app.post('/api/requisitions/:id/approve', (req, res) => {
  const db = readDB();
  const r = (db.requisitions || []).find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  r.status = 'approved';
  r.approvedBy = req.body.approver || 'System';
  r.approvedAt = new Date().toISOString();
  writeDB(db);
  res.json(r);
});

app.post('/api/requisitions/:id/reject', (req, res) => {
  const db = readDB();
  const r = (db.requisitions || []).find(x => x.id === req.params.id);
  if (!r) return res.status(404).json({ error: 'Not found' });
  r.status = 'rejected';
  r.rejectedReason = req.body.reason || 'Not specified';
  writeDB(db);
  res.json(r);
});

app.post('/api/invoices/:id/match', (req, res) => {
  const db = readDB();
  const inv = (db.invoices || []).find(x => x.id === req.params.id);
  if (!inv) return res.status(404).json({ error: 'Not found' });
  const po = (db.purchaseOrders || []).find(p => p.id === inv.poId);
  inv.matchStatus = (po && Math.abs(po.amount - inv.amount) < 1) ? 'matched' : 'mismatch';
  writeDB(db);
  res.json(inv);
});

// ── ANALYTICS ──────────────────────────────────────────────
app.get('/api/analytics/summary', (_req, res) => {
  const db = readDB();
  res.json({
    totalSuppliers: (db.suppliers || []).length,
    totalRequisitions: (db.requisitions || []).length,
    pendingApprovals: (db.requisitions || []).filter(r => r.status === 'pending').length,
    totalPOs: (db.purchaseOrders || []).length,
    totalSpend: (db.invoices || []).reduce((s, i) => s + (i.total || 0), 0),
    overdueInvoices: (db.invoices || []).filter(i => i.status === 'overdue').length,
  });
});

// ── HEALTH CHECK ───────────────────────────────────────────
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), version: '1.0.0' });
});

// ── ERROR HANDLER ──────────────────────────────────────────
app.use((err, _req, res, _next) => {
  console.error('Server error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// ── FALLBACK TO INDEX ──────────────────────────────────────
app.get('*', (_req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// ── START SERVER ───────────────────────────────────────────
app.listen(PORT, () => {
  console.log('\n╔══════════════════════════════════════════════════════════╗');
  console.log('║  P2P Solutions Server is running                         ║');
  console.log('╠══════════════════════════════════════════════════════════╣');
  console.log(`║  ▶ Local:    http://localhost:${PORT}                       ║`);
  console.log(`║  ▶ Network:  http://0.0.0.0:${PORT}                         ║`);
  console.log('║  ▶ API:      /api/health, /api/auth, /api/suppliers ...  ║');
  console.log('╚══════════════════════════════════════════════════════════╝\n');
});

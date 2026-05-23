/* ============================================================
   P2P Solutions — Shared Utilities & UI Components
   ============================================================ */

/* ── DATE HELPERS ──────────────────────────────────────────── */
const Util = {
  formatDate(str) {
    if (!str) return '—';
    const d = new Date(str);
    return d.toLocaleDateString('en-MY', { day: '2-digit', month: 'short', year: 'numeric' });
  },
  formatCurrency(val, sym = 'RM') {
    return sym + ' ' + Number(val).toLocaleString('en-MY', { minimumFractionDigits: 2 });
  },
  formatNum(val) {
    return Number(val).toLocaleString('en-MY');
  },
  timeAgo(str) {
    const now = new Date(), d = new Date(str);
    const diff = Math.floor((now - d) / 1000);
    if (diff < 60) return 'Just now';
    if (diff < 3600) return Math.floor(diff/60) + 'm ago';
    if (diff < 86400) return Math.floor(diff/3600) + 'h ago';
    return Math.floor(diff/86400) + 'd ago';
  },
  genId(prefix) {
    return prefix + '-' + Date.now().toString(36).toUpperCase();
  },
  today() {
    return new Date().toISOString().split('T')[0];
  },
  addDays(dateStr, days) {
    const d = new Date(dateStr);
    d.setDate(d.getDate() + days);
    return d.toISOString().split('T')[0];
  },
};

/* ── STATUS BADGE HELPERS ──────────────────────────────────── */
const Badge = {
  status(s) {
    const map = {
      approved:   ['success', 'Approved'],
      pending:    ['warning', 'Pending'],
      rejected:   ['danger',  'Rejected'],
      active:     ['success', 'Active'],
      inactive:   ['neutral', 'Inactive'],
      confirmed:  ['primary', 'Confirmed'],
      delivered:  ['success', 'Delivered'],
      in_transit: ['info',    'In Transit'],
      paid:       ['success', 'Paid'],
      overdue:    ['danger',  'Overdue'],
      disputed:   ['danger',  'Disputed'],
      matched:    ['success', 'Matched'],
      mismatch:   ['danger',  'Mismatch'],
      scheduled:  ['info',    'Scheduled'],
      completed:  ['success', 'Completed'],
      processing: ['info',    'Processing'],
      direct:     ['primary', 'Direct PO'],
      indirect:   ['purple',  'Indirect PO'],
      in_stock:   ['success', 'In Stock'],
      low_stock:  ['warning', 'Low Stock'],
      sold:       ['neutral', 'Sold'],
      out_of_stock:['danger', 'Out of Stock'],
    };
    const [cls, lbl] = map[s] || ['neutral', s];
    return `<span class="badge badge-${cls}">${lbl}</span>`;
  },
  priority(p) {
    const map = { high: ['danger','High'], medium: ['warning','Medium'], low: ['neutral','Low'] };
    const [cls, lbl] = map[p] || ['neutral', p];
    return `<span class="badge badge-${cls}">${lbl}</span>`;
  },
};

/* ── TOAST NOTIFICATIONS ────────────────────────────────────── */
const Toast = {
  container: null,
  init() {
    if (!this.container) {
      this.container = document.createElement('div');
      this.container.className = 'toast-container';
      document.body.appendChild(this.container);
    }
  },
  show(type, title, msg, duration = 4000) {
    this.init();
    const icons = { success: '✓', warning: '⚠', danger: '✕', info: 'ℹ' };
    const el = document.createElement('div');
    el.className = `toast toast-${type}`;
    el.innerHTML = `
      <span class="toast-icon">${icons[type] || 'ℹ'}</span>
      <div class="toast-content">
        <div class="toast-title">${title}</div>
        ${msg ? `<div class="toast-msg">${msg}</div>` : ''}
      </div>
      <button class="toast-close" onclick="this.closest('.toast').remove()">✕</button>
    `;
    this.container.appendChild(el);
    requestAnimationFrame(() => el.classList.add('show'));
    if (duration > 0) setTimeout(() => { el.classList.remove('show'); setTimeout(() => el.remove(), 350); }, duration);
    return el;
  },
  success(title, msg)  { return this.show('success', title, msg); },
  warning(title, msg)  { return this.show('warning', title, msg); },
  danger(title, msg)   { return this.show('danger',  title, msg); },
  info(title, msg)     { return this.show('info',    title, msg); },
};

/* ── MODAL MANAGER ─────────────────────────────────────────── */
const Modal = {
  open(id)  { const el = document.getElementById(id); if(el) { el.classList.add('active'); document.body.style.overflow = 'hidden'; } },
  close(id) { const el = document.getElementById(id); if(el) { el.classList.remove('active'); document.body.style.overflow = ''; } },
  closeAll() { document.querySelectorAll('.modal-overlay.active').forEach(el => { el.classList.remove('active'); }); document.body.style.overflow = ''; },
};

/* Click outside modal to close */
document.addEventListener('click', e => {
  if (e.target.classList.contains('modal-overlay')) Modal.closeAll();
});

/* ── SIDEBAR ────────────────────────────────────────────────── */
const Sidebar = {
  init() {
    // Mobile toggle
    const toggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');
    if (toggle && sidebar) {
      toggle.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        if (overlay) overlay.classList.toggle('show');
      });
    }
    if (overlay) {
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });
    }

    // Active nav item
    const page = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-item').forEach(item => {
      const href = item.getAttribute('href') || '';
      if (href && href.includes(page)) item.classList.add('active');
    });

    // User info
    const user = Store.getUser();
    if (user) {
      const uname = document.getElementById('sidebarUserName');
      const urole = document.getElementById('sidebarUserRole');
      const uav   = document.getElementById('sidebarUserAvatar');
      const uinit = document.getElementById('sidebarUserInitials');
      if (uname)  uname.textContent  = user.name;
      if (urole)  urole.textContent  = user.brandName ? user.brandName + ' · Supplier' : user.role.charAt(0).toUpperCase() + user.role.slice(1);
      if (uav)    uav.style.background = user.avatar;
      if (uinit)  uinit.textContent  = user.initials;

      // Topbar user
      const tbName = document.getElementById('topbarUserName');
      const tbAvat = document.getElementById('topbarAvatar');
      const tbInit = document.getElementById('topbarInitials');
      if (tbName) tbName.textContent = user.name.split(' ')[0];
      if (tbAvat) tbAvat.style.background = user.avatar;
      if (tbInit) tbInit.textContent = user.initials;
    }

    // Date
    const dateEl = document.getElementById('topbarDate');
    if (dateEl) {
      dateEl.textContent = new Date().toLocaleDateString('en-MY', {
        weekday: 'short', day: 'numeric', month: 'short', year: 'numeric'
      });
    }

    // Notification badge
    const unread = (P2PData.notifications || []).filter(n => !n.read).length;
    const notifBadge = document.getElementById('notifCount');
    if (notifBadge && unread > 0) notifBadge.textContent = unread;
  },

  logout() {
    Store.clearUser();
    window.location.href = 'login.html';
  },
};

/* ── FORM VALIDATION ────────────────────────────────────────── */
const FormVal = {
  required(inputEl) {
    const v = inputEl.value.trim();
    if (!v) { inputEl.classList.add('invalid'); return false; }
    inputEl.classList.remove('invalid');
    return true;
  },
  validateAll(formEl) {
    let valid = true;
    formEl.querySelectorAll('[required]').forEach(el => {
      if (!this.required(el)) valid = false;
    });
    return valid;
  },
  clearErrors(formEl) {
    formEl.querySelectorAll('.invalid').forEach(el => el.classList.remove('invalid'));
  },
};

/* ── DROPDOWN TOGGLE ────────────────────────────────────────── */
document.addEventListener('click', e => {
  if (!e.target.closest('.dropdown')) {
    document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  }
});

function toggleDropdown(menuId) {
  const menu = document.getElementById(menuId);
  if (!menu) return;
  const wasOpen = menu.classList.contains('open');
  document.querySelectorAll('.dropdown-menu.open').forEach(m => m.classList.remove('open'));
  if (!wasOpen) menu.classList.add('open');
}

/* ── TAB SWITCHING ──────────────────────────────────────────── */
function switchTab(btn, paneId) {
  const container = btn.closest('.tabs').parentElement;
  container.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
  container.querySelectorAll('.tab-pane').forEach(p => p.classList.remove('active'));
  btn.classList.add('active');
  const pane = document.getElementById(paneId);
  if (pane) pane.classList.add('active');
}

/* ── SEARCH / FILTER TABLE ──────────────────────────────────── */
function filterTable(inputId, tableId) {
  const q = document.getElementById(inputId)?.value.toLowerCase() || '';
  document.querySelectorAll(`#${tableId} tbody tr`).forEach(row => {
    row.style.display = row.textContent.toLowerCase().includes(q) ? '' : 'none';
  });
}

/* ── SIDEBAR HTML TEMPLATE ──────────────────────────────────── */
const NAV_PAGES = {
  dashboard:      { href:'dashboard.html',       icon:'▦',  label:'Dashboard' },
  shop:           { href:'shop.html',            icon:'🛍️', label:'Catalog' },
  inventory:      { href:'inventory.html',       icon:'📦', label:'Inventory' },
  orders:         { href:'orders.html',          icon:'🧺', label:'Orders' },
  requisition:    { href:'requisition.html',     icon:'📋', label:'Requisitions' },
  purchaseOrders: { href:'purchase-orders.html', icon:'🧾', label:'Purchase Orders' },
  suppliers:      { href:'suppliers.html',       icon:'🏢', label:'Suppliers' },
  invoices:       { href:'invoices.html',        icon:'💵', label:'Invoices' },
  payments:       { href:'payments.html',        icon:'💳', label:'Payments' },
  reports:        { href:'reports.html',         icon:'📊', label:'Reports' },
  admin:          { href:'admin.html',           icon:'⚙️', label:'Admin Panel' },
};

/* Role → ordered list of nav sections. Each section: [label, ...pageKeys] */
const ROLE_NAV = {
  procurement: [
    ['Procurement', 'dashboard', 'shop', 'requisition', 'purchaseOrders', 'suppliers', 'orders'],
  ],
  finance: [
    ['Finance', 'dashboard', 'invoices', 'payments', 'reports', 'orders'],
  ],
  supplier: [
    ['Supplier', 'dashboard', 'inventory', 'orders'],
  ],
  admin: [
    ['Main',        'dashboard', 'shop', 'orders'],
    ['Procurement', 'requisition', 'purchaseOrders', 'suppliers'],
    ['Inventory',   'inventory'],
    ['Finance',     'invoices', 'payments'],
    ['System',      'reports', 'admin'],
  ],
};

function buildSidebar(activePage) {
  const role = (Store.getUser() || {}).role || 'admin';
  const sections = ROLE_NAV[role] || ROLE_NAV.admin;

  // Orders label varies by role
  const labelFor = (key) => {
    if (key !== 'orders') return NAV_PAGES[key].label;
    if (role === 'supplier') return 'Incoming Orders';
    if (role === 'procurement') return 'My Orders';
    return 'Orders';
  };

  const navItem = (key) => {
    const p = NAV_PAGES[key];
    const active = activePage === key ? 'active' : '';
    return `<a href="${p.href}" class="nav-item ${active}"><span class="ni">${p.icon}</span><span class="nl">${labelFor(key)}</span></a>`;
  };

  const navHtml = sections.map(([label, ...keys]) =>
    `<div class="nav-section">${label}</div>` + keys.map(navItem).join('')
  ).join('');

  return `
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-logo">
        <div class="logo-icon">🛒</div>
        <div class="logo-text">
          <span class="name">P2P Solutions</span>
          <span class="sub">Procure to Pay</span>
        </div>
      </div>
      <nav class="sidebar-nav">
        ${navHtml}
      </nav>
      <div class="sidebar-footer">
        <div class="sidebar-user" onclick="Sidebar.logout()">
          <div class="uavatar" id="sidebarUserAvatar" style="background:#2563EB">
            <span id="sidebarUserInitials">SC</span>
          </div>
          <div class="uinfo">
            <div class="uname" id="sidebarUserName">Loading…</div>
            <div class="urole" id="sidebarUserRole">Role</div>
          </div>
          <span style="color:rgba(255,255,255,0.3);font-size:12px">⏻</span>
        </div>
      </div>
    </aside>
    <div class="overlay-bg" id="sidebarOverlay"></div>
  `;
}

/* Guard a page to specific roles; redirects if the current user lacks access */
function requireRole(...roles) {
  const user = Store.getUser();
  if (!user) { window.location.href = 'index.html'; return null; }
  if (!roles.includes(user.role)) { window.location.href = 'dashboard.html'; return null; }
  return user;
}

/* ── TOPBAR HTML TEMPLATE ───────────────────────────────────── */
function buildTopbar(title, breadcrumb) {
  return `
    <header class="topbar">
      <div class="topbar-left">
        <button class="menu-toggle" id="menuToggle">☰</button>
        <div>
          <div class="page-title">${title}</div>
          <div class="breadcrumb">P2P Solutions › <span>${breadcrumb || title}</span></div>
        </div>
      </div>
      <div class="topbar-right">
        <span class="topbar-date" id="topbarDate"></span>
        <div class="dropdown">
          <button class="tbtn" onclick="toggleDropdown('notifMenu')" title="Notifications">
            🔔<span class="ndot" id="notifCount" style="display:none"></span>
          </button>
          <div class="dropdown-menu" id="notifMenu" style="min-width:280px;max-height:360px;overflow-y:auto;">
            <div style="padding:10px 12px 6px;font-weight:600;font-size:0.78rem;border-bottom:1px solid var(--border)">Notifications</div>
            ${(P2PData.notifications||[]).map(n => `
              <div class="drop-item" style="align-items:flex-start;gap:8px;">
                <span style="font-size:14px;margin-top:2px">${n.type==='success'?'✓':n.type==='warning'?'⚠':n.type==='danger'?'✕':'ℹ'}</span>
                <div>
                  <div style="font-weight:500;font-size:0.76rem;color:var(--text-primary)">${n.title}</div>
                  <div style="font-size:0.7rem;color:var(--text-muted)">${n.msg}</div>
                  <div style="font-size:0.65rem;color:var(--text-muted);margin-top:2px">${n.time}</div>
                </div>
              </div>`).join('')}
          </div>
        </div>
        <div class="dropdown">
          <button class="tbtn" onclick="toggleDropdown('userMenu')" style="width:auto;gap:6px;padding:4px 8px;">
            <div class="uavatar" id="topbarAvatar" style="width:26px;height:26px;font-size:11px;background:#2563EB">
              <span id="topbarInitials">SC</span>
            </div>
            <span id="topbarUserName" style="font-size:0.78rem;font-weight:500;color:var(--text-secondary)">User</span>
          </button>
          <div class="dropdown-menu" id="userMenu">
            ${(Store.getUser()||{}).role === 'admin' ? '<a href="admin.html" class="drop-item">⚙ Settings</a><div class="drop-divider"></div>' : ''}
            <div class="drop-item danger" onclick="Sidebar.logout()">⏻ Logout</div>
          </div>
        </div>
      </div>
    </header>
  `;
}

/* ── AUTH GUARD ─────────────────────────────────────────────── */
function requireAuth() {
  const user = Store.getUser();
  if (!user) { window.location.href = 'login.html'; return null; }
  return user;
}

/* ── PAGE INIT ──────────────────────────────────────────────── */
function initPage(activePage, title, breadcrumb) {
  const user = requireAuth();
  if (!user) return null;

  // Inject sidebar
  const sidebarContainer = document.getElementById('sidebarContainer');
  if (sidebarContainer) sidebarContainer.innerHTML = buildSidebar(activePage);

  // Inject topbar
  const topbarContainer = document.getElementById('topbarContainer');
  if (topbarContainer) topbarContainer.innerHTML = buildTopbar(title, breadcrumb);

  // Init sidebar JS
  Sidebar.init();

  // Notification dot
  const unread = (P2PData.notifications||[]).filter(n=>!n.read).length;
  const notifCount = document.getElementById('notifCount');
  if (notifCount) {
    if (unread > 0) { notifCount.textContent = unread; notifCount.style.display = 'block'; }
    else notifCount.style.display = 'none';
  }

  return user;
}

/* ── CHART DEFAULTS (Chart.js) ──────────────────────────────── */
function chartDefaults() {
  if (typeof Chart === 'undefined') return;
  Chart.defaults.font.family = "'DM Sans', sans-serif";
  Chart.defaults.font.size = 11;
  Chart.defaults.color = '#94A3B8';
  Chart.defaults.plugins.legend.labels.boxWidth = 10;
  Chart.defaults.plugins.legend.labels.padding = 16;
}

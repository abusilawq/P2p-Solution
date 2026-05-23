# P2P Solutions — Procure-to-Pay Enterprise Platform

> University Mini Project · FIT2 Group 8
> *Denise Isabelle Reynold · Abduvaliev Abdushukur · Eng Zheng Dong*
> Supervisor: Mr. Jason Lim

A complete, production-grade web platform that digitalizes the **entire purchasing lifecycle** — from requisition to final payment. Built as a working enterprise-style application demonstrating digital transformation in procurement and finance.

---

## Live Demo Login

A **B2B Procure-to-Pay** platform between two businesses — **ACME** (the buyer org) and **TechCore** (a supplier).

| Role            | Email                   | Password  | Can do                                                  |
|-----------------|-------------------------|-----------|---------------------------------------------------------|
| **Procurement** | procurement@acme.com    | `pass123` | Browse the supplier catalog, raise requisitions & POs, track orders |
| **Supplier**    | supplier@techcore.my    | `pass123` | Manage live inventory & material codes, fulfil incoming orders |
| **Finance**     | finance@acme.com        | `pass123` | Invoices, payments, spend reports                       |
| **Admin**       | admin@acme.com          | `pass123` | Everything — catalog, inventory, full procure-to-pay    |

> *Or just click any of the demo accounts pre-filled on the login screen.*

The site opens on a **public catalog landing page**; logging in routes each role to its **own panel** — the sidebar and dashboard are filtered to that role.

---

## Quick Start

### Option 1 — Static (zero install)
Open `index.html` directly in your browser. Everything runs client-side using `localStorage` for data persistence.

### Option 2 — With Node.js backend
```bash
# 1. Install dependencies
npm install

# 2. Start the server
npm start

# 3. Open browser
# → http://localhost:3000
```

### Option 3 — Simple HTTP server
```bash
npx http-server -p 3000 -c-1
```

---

## Project Structure

```
p2p-solution/
├── index.html              ← Public B2B landing page + product catalog (no login)
├── login.html              ← Login / Authentication (procurement · supplier · finance · admin)
├── dashboard.html          ← Role-aware dashboard (one per role)
├── shop.html               ← Supplier catalog — browse & raise purchase orders
├── inventory.html          ← Live stock & material codes — editable storage (supplier)
├── orders.html             ← Order tracking (my orders / incoming / all)
├── requisition.html        ← Purchase Requisition module (Direct / Indirect)
├── purchase-orders.html    ← PO management
├── suppliers.html          ← Supplier management
├── invoices.html           ← Invoice handling & matching
├── payments.html           ← Payment tracking
├── reports.html            ← Reports & analytics
├── admin.html              ← Admin panel
│
├── css/
│   └── main.css            ← Complete stylesheet (CSS variables, components)
│
├── js/
│   ├── data.js             ← Mock business data + localStorage helpers
│   └── utils.js            ← Shared UI components (sidebar, topbar, toasts, modals)
│
├── server/
│   ├── server.js           ← Express backend with REST API
│   └── db.json             ← Auto-generated data file
│
├── assets/                 ← Images & static assets folder
├── package.json
└── README.md
```

---

## Modules — What Each Page Does

### 0. Landing (`index.html`)
Public B2B home page — hero, a browse-only **product catalog** (with images & live stock), B2B
feature highlights and a "how it works" flow. No login needed; "Login to Order" leads to `login.html`.

### 1. Login (`login.html`)
Role-based authentication with four user types: **Procurement**, **Supplier**, **Finance**, **Admin**.
Includes demo credential auto-fill and a brand showcase panel.

### 2. Dashboard (`dashboard.html`) — *role-aware*
Each role gets its own view: procurement (orders + requisitions + catalog), supplier (stock + incoming
orders), finance (invoices/payments/spend), admin (full KPIs, charts, approvals, supplier performance).

### 2a. Catalog (`shop.html`) — *procurement & admin*
Supplier catalog with product images, category chips, search, live stock badges, and a detail modal
listing each unit's material code. "Raise Purchase Order" marks a unit sold (live stock drops) and
records a Direct PO sent to the supplier.

### 2b. Inventory (`inventory.html`) — *supplier & admin*
The "storage" editor from the sketch: a category → brand tree on the left, and a detail panel on the
right showing each product's image and **material-coded units** (`AL 001`, `AL 002`…). Add stock
(auto-generates the next material code), mark units sold/in-stock, edit price, and create new products.

### 2c. Orders (`orders.html`)
Procurement sees *My Orders*, supplier sees *Incoming Orders* for their products, finance/admin see *all*.

### 3. Purchase Requisitions (`requisition.html`)
- Create requisitions with line items
- Multi-stage workflow visualizer
- Approve / reject with comments
- Status badges (pending · approved · rejected)
- Drill-down detail modal

### 4. Suppliers (`suppliers.html`)
- Full CRUD: add, edit, archive
- Search, filter by category & status
- Performance ratings
- Total order value per supplier
- Detail view with contact info

### 5. Purchase Orders (`purchase-orders.html`)
- Auto-generate from approved PRs
- Link to source requisition & supplier
- Status pipeline: pending → confirmed → in-transit → delivered
- Payment-status linkage

### 6. Invoices (`invoices.html`)
- Create invoices linked to POs
- **Automatic 3-way matching** simulation
- Mismatch detection & dispute flagging
- Tax computation
- Payment status tracking

### 7. Payments (`payments.html`)
- Paid / Pending / Overdue tabs
- Transaction history
- Bank transfer / cheque tracking
- Payment receipt printout
- CSV export

### 8. Reports & Analytics (`reports.html`)
- Spending analysis with trend lines
- Supplier performance scorecard (radar chart)
- Procurement cycle-time comparison (manual vs automated)
- Compliance dashboards
- CSV + PDF export

### 9. Admin Panel (`admin.html`)
- User management (CRUD)
- Approval threshold rules
- System settings (org profile, security)
- Integrations (SAP, QuickBooks, Slack)
- Audit log

---

## Key Features

| Capability                | Implementation                                        |
|---------------------------|-------------------------------------------------------|
| **Authentication**        | Role-based (Admin / Procurement / Finance)            |
| **Data persistence**      | localStorage (offline) + Express REST API (server)    |
| **Charts**                | Chart.js 4.4 (line, bar, doughnut, radar)             |
| **Workflow simulation**   | Multi-stage approval engine with status tracking      |
| **3-way invoice match**   | PO + Receipt + Invoice automatic validation           |
| **Toasts & modals**       | Custom-built reusable components                      |
| **Responsive design**     | Mobile breakpoints at 768px / 1024px / 1200px         |
| **Print/PDF export**      | Browser-native print → PDF for invoices & reports     |
| **CSV export**            | Built-in for suppliers, payments, reports             |
| **Search & filter**       | Client-side instant filtering on every list page      |
| **Audit log**             | Immutable activity tracking on admin panel            |

---

## Tech Stack

- **Frontend:** HTML5 · CSS3 (CSS Variables) · Vanilla JavaScript (ES6+)
- **Charts:** Chart.js 4.4 (CDN)
- **Fonts:** Outfit (display) + DM Sans (body) — Google Fonts
- **Backend:** Node.js + Express 4.19 *(optional)*
- **Storage:** localStorage (client) · JSON file (server)
- **Build:** None required — vanilla everything, just open and run

---

## REST API Endpoints (Server Mode)

```
POST   /api/auth/login              → Authenticate user
POST   /api/auth/logout             → End session

GET    /api/suppliers               → List all suppliers
POST   /api/suppliers               → Create supplier
PUT    /api/suppliers/:id           → Update supplier
DELETE /api/suppliers/:id           → Remove supplier

GET    /api/requisitions            → List requisitions
POST   /api/requisitions            → Create requisition
POST   /api/requisitions/:id/approve→ Approve workflow
POST   /api/requisitions/:id/reject → Reject with reason

GET    /api/purchaseOrders          → List POs
POST   /api/purchaseOrders          → Generate PO

GET    /api/invoices                → List invoices
POST   /api/invoices/:id/match      → Run 3-way match

GET    /api/payments                → List payments
GET    /api/analytics/summary       → KPI summary

GET    /api/health                  → System health
```

---

## Alignment to Project Proposal

This implementation directly fulfils the proposal's stated goals:

| Proposal Requirement                       | Implementation                                |
|--------------------------------------------|-----------------------------------------------|
| Automate purchasing lifecycle              | End-to-end PR → PO → Invoice → Payment flow   |
| Reduce manual errors                       | Automated 3-way match, workflow validation    |
| Slow approval process → faster             | Multi-tier auto-routing with SLA tracking     |
| Limited visibility → real-time tracking    | Live status badges, timeline, activity feed   |
| Fragmented systems → centralized           | Single platform, unified data model           |
| Reporting & analytics                      | Dedicated analytics page with 5 chart types   |
| Suitable for Procurement & Finance teams   | Role-based access with tailored views         |
| Supplier evaluation                        | Performance scorecard + rating system         |

---

## Design Philosophy

- **Clarity over decoration** — every element earns its place
- **Information density** balanced with white-space (corporate dashboard standard)
- **CSS variables** make theme changes a single-line edit
- **No frameworks** — keeps the codebase reviewable for a foundation-level project
- **Mobile-first responsive** — works on phones, tablets, desktops

---

## Browser Support

Tested on: Chrome 110+ · Edge 110+ · Firefox 110+ · Safari 16+

---

## Acknowledgements

Built for the **Foundation-Level Business Solution Mini Project**, FIT2 Group 8.
All data shown is fictional and for demonstration purposes only.

---

## License

MIT — free to use, modify, and present.

# AFRC Operations Hub

**Apex Forge RC — Original Motorworks**

Internal operations dashboard for managing 3D printing, RC builds, inventory, customers, and content.

---

## 🚀 Quick Start

### Prerequisites
- **Node.js** 18+ installed ([download here](https://nodejs.org/))
- A code editor (VS Code recommended)

### Setup

1. **Open terminal/command prompt** and navigate to this folder:
   ```bash
   cd apex-forge-hub
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Open in browser:**
   The terminal will show a URL like `http://localhost:3000` — open it in your browser.

---

## 📁 Project Structure

```
apex-forge-hub/
├── src/
│   ├── components/     # Reusable UI components
│   │   ├── Sidebar.jsx
│   │   └── Header.jsx
│   ├── pages/          # Each tool/page
│   │   ├── Dashboard.jsx
│   │   ├── FilamentTracker.jsx
│   │   ├── JobCalculator.jsx
│   │   ├── Inventory.jsx
│   │   ├── Builds.jsx
│   │   ├── Customers.jsx
│   │   ├── ContentCalendar.jsx
│   │   ├── Expenses.jsx
│   │   └── PrinterLog.jsx
│   ├── App.jsx         # Main app with routing
│   ├── main.jsx        # Entry point
│   └── index.css       # Global styles
├── public/             # Static assets
├── index.html          # HTML template
├── package.json        # Dependencies
├── tailwind.config.js  # Tailwind CSS config
└── vite.config.js      # Vite bundler config
```

---

## 🎨 Brand Colors

| Color | Hex | Usage |
|-------|-----|-------|
| Apex Orange | `#FF6B00` | Primary accent, CTAs |
| Apex Black | `#080808` | Backgrounds |
| Apex Dark | `#0f0f0f` | Sidebar, cards |
| Apex Gray | `#1a1a1a` | Secondary backgrounds |

---

## 🛠️ Current Features

### ✅ Working Now
- **Filament Tracker** — Full spool inventory + print cost tracking
- **Dashboard** — Overview with quick stats and actions
- **Responsive sidebar** — Works on mobile and desktop

### 🔜 Coming Soon
- Job Quote Calculator
- Parts Inventory
- Build Projects
- Customer Management
- Content Calendar
- Expense Tracker
- Printer Dashboard

---

## 🚢 Deployment

When ready to go live:

### Option A: Vercel (Recommended)
1. Push code to GitHub
2. Go to [vercel.com](https://vercel.com) → Import project
3. Connect your `apexforgerc.com` domain

### Option B: Cloudflare Pages
1. Push code to GitHub
2. Go to Cloudflare Dashboard → Pages → Create project
3. Connect your `apexforgerc.com` domain

---

## 📝 Notes

- Data currently saves to **localStorage** (browser storage)
- Clears if you clear browser data
- Later: We'll add Supabase for persistent cloud storage

---

## 💡 Development Tips

- Edit files in `src/pages/` to modify tools
- Styles use Tailwind CSS classes
- Hot reload is enabled — save a file and see changes instantly

---

Built for Apex Forge RC 🔥

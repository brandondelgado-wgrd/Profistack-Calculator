# WatchGuard ProfitStack Calculator - MVP

**Version:** 1.0 (MVP)
**Status:** Development - Placeholder Pricing
**Last Updated:** November 19, 2025

---

## 🎯 Overview

ProfitStack MVP is a static web calculator that helps CAMs demonstrate the financial benefits of consolidating security tools onto the WatchGuard Unified Security Platform. This is a **proof of concept** - if successful, it becomes the foundation for a full production tool.

### Core Value Proposition

Calculate TCO savings by comparing:
- **Current State:** Fragmented multi-vendor security stack
- **Unified State:** Consolidated WatchGuard platform

### Target Users

- Channel Account Managers (CAMs)
- MSP partners evaluating security stack consolidation
- WatchGuard sales team

---

## 📁 Project Structure

```
profitstack-calculator/
├── index.html              # Single page application
├── styles.css             # WatchGuard branding + responsive layout
├── calculator.js          # Main application logic
├── data/
│   └── mappings.js        # Product mappings & placeholder pricing
├── ROI/                   # Reference MDR ROI calculator
│   ├── index.html
│   └── script.js
├── Profitstack Requisitos.md  # Full requirements document
└── README.md              # This file
```

---

## 🚀 Quick Start

### Local Development

1. **Open in Browser:**
   ```bash
   # Simply open index.html in your browser
   open index.html

   # OR use a local server (recommended)
   python3 -m http.server 8000
   # Then visit: http://localhost:8000
   ```

2. **Live Server (VS Code):**
   - Install "Live Server" extension
   - Right-click `index.html` → "Open with Live Server"

### How to Use

1. **Fill MSP Profile:**
   - MSP Name
   - Region (North America, EMEA, APAC, LATAM)
   - Number of managed endpoints
   - Number of managed clients (optional)
   - Technician hourly rate (default: $85/hr)

2. **Add Current Security Tools:**
   - For each category (Network, Endpoint, Identity, Services):
     - Click "+ Add Tool"
     - Enter vendor/product name (autocomplete suggestions available)
     - Enter annual license cost
     - Enter monthly management hours (default: 2)
     - Add notes (optional)
   - Click "×" to remove a tool
   - Check "Not using this category" to skip a category

3. **View Results:**
   - Annual savings
   - Savings percentage
   - 3-year total savings
   - TCO comparison table
   - Cost breakdown chart
   - Key benefits (vendors reduced, hours saved)

4. **Actions:**
   - **Download PDF:** (Placeholder - to be implemented Week 5)
   - **Start New Audit:** Clear all data and start over

---

## 🧮 Calculation Methodology

### Current State TCO

```
Annual License Costs = Σ(Tool costs across 4 categories)
Annual Labor Costs = Σ(Monthly Hours × Hourly Rate × 12)
Current Annual TCO = License + Labor
```

### Unified WatchGuard TCO

```
WG License Costs = Σ(WatchGuard products × Price × 12)
WG Labor Costs = Current Labor × 0.70 (30% efficiency gain)
Unified Annual TCO = WG License + WG Labor
```

**Efficiency Assumption:** 30% labor reduction due to:
- Fewer vendors to manage
- Single admin portal
- Unified management console
- Reduced training needs

### Savings

```
Annual Savings = Current TCO - Unified TCO
Savings % = (Annual Savings / Current TCO) × 100
3-Year Savings = Annual Savings × 3
```

---

## ⚠️ IMPORTANT: Placeholder Pricing

### Current Status

**All pricing in this MVP uses PLACEHOLDER values and has NOT been validated by Finance.**

The calculator will function, but results may not reflect actual savings until real pricing is implemented.

### Required Before Production

You MUST obtain from Finance team:

1. **Partner Buy Prices (Gold Tier, USD):**
   - Firebox T-series (T45, T85)
   - EPDR (per endpoint per month)
   - AuthPoint (per user per month)
   - WatchGuard MDR (per endpoint per month)
   - DNSWatch (if applicable)

2. **Top 10 Competitor Mappings:**
   - Network Security: FortiGate, Sophos, Palo Alto, etc.
   - Endpoint Security: CrowdStrike, SentinelOne, etc.
   - Identity & Access: Duo, Okta, etc.
   - Managed Services: Huntress, Arctic Wolf, etc.

3. **Validation:**
   - Confirm calculations show **positive savings** (not losses)
   - Verify 30% labor efficiency assumption is realistic
   - Test with real MSP data

### How to Update Pricing

Edit `data/mappings.js`:

```javascript
const PRODUCT_MAPPINGS = {
  network: {
    'fortinet': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,  // ← UPDATE THIS
      description: 'Entry-level firewall'
    },
    // ... more mappings
  },
  // ... more categories
}
```

---

## 🎨 Customization

### Brand Colors

Defined in `styles.css` (`:root` variables):

```css
:root {
  --wg-red: #E81410;
  --wg-red-dark: #B32317;
  --wg-dark-blue: #002663;
  --wg-blue: #035996;
  --wg-gray: #808080;
  --wg-green: #2A8F48;
}
```

### Labor Efficiency Assumption

Edit `data/mappings.js`:

```javascript
const EFFICIENCY_FACTORS = {
  labor_reduction: 0.30,  // ← Change this (0.30 = 30% reduction)
  default_hours_per_tool: 2
};
```

### Default Labor Rate

Edit `index.html` line ~48:

```html
<input type="number" id="laborRate" value="85" />
```

---

## 💾 Data Persistence

### LocalStorage Auto-Save

- Draft automatically saved to browser localStorage every 500ms after input changes
- Draft persists across page refreshes
- Cleared when "Start New Audit" is clicked

### Storage Key

```javascript
localStorage.getItem('profitstack_draft')
```

### Manual Clear

Open browser console:

```javascript
localStorage.removeItem('profitstack_draft')
```

---

## 🔧 Technical Details

### Technology Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styles, no frameworks
- **JavaScript ES6+** - Vanilla JS, no dependencies
- **Chart.js 4.4.0** - Bar chart visualization (CDN)
- **jsPDF 2.5.1** - PDF generation (CDN, not yet implemented)

### Browser Support

Tested on:
- ✅ Chrome (latest)
- ✅ Edge (latest)
- ✅ Safari (latest)
- ⚠️ Firefox (best effort)

### Performance

- Page load: < 3 seconds
- Calculation: < 500ms
- Debounced inputs: 500ms delay

### Responsive Breakpoints

- Desktop: 1920×1080 (primary)
- Laptop: 1366×768
- Tablet: 1024×768 (iPad)
- Mobile: 375×667 (basic support)

---

## 📊 Chart Visualization

Uses Chart.js to display:
- **X-axis:** Categories (Network, Endpoint, Identity, Services)
- **Y-axis:** Annual Cost (USD)
- **Bars:** Current Stack (red) vs Unified WatchGuard (blue)

Chart updates in real-time as inputs change.

---

## 🐛 Known Issues & Limitations

### MVP Limitations

- ❌ **No PDF generation yet** (Week 5 implementation)
- ❌ **Placeholder pricing** (requires Finance validation)
- ❌ **No authentication** (planned for Phase 1)
- ❌ **No database** (localStorage only)
- ❌ **USD only** (multi-currency in Phase 1)
- ❌ **No audit history** (single session only)

### Edge Cases

1. **Negative Savings:**
   - May occur with placeholder pricing
   - Will be resolved with real pricing from Finance

2. **No Tools Added:**
   - Calculator shows placeholder until at least one tool with cost is added

3. **Very Large Numbers:**
   - Formatting works up to $999,999,999
   - Beyond that, display may break

---

## 🚀 Next Steps (Week-by-Week)

### Week 1-2 (Current) ✅
- [x] HTML structure with MSP Profile + 4 categories
- [x] CSS with WatchGuard branding
- [x] JavaScript calculation engine
- [x] LocalStorage auto-save
- [x] Chart.js visualization

### Week 3-4 (Dec 9-20)
- [ ] **URGENT:** Obtain real pricing from Finance
- [ ] Update `data/mappings.js` with validated prices
- [ ] Test calculations with real MSP data
- [ ] Validate 30% efficiency assumption
- [ ] Polish UI/UX based on self-testing

### Week 5 (Jan 6-10)
- [ ] Implement jsPDF generation
- [ ] Create 1-page executive summary PDF
- [ ] Deploy to GitHub Pages
- [ ] Custom domain (optional): `profitstack-mvp.watchguard.com`
- [ ] Final cross-browser testing

### Week 6 (Jan 13-17)
- [ ] Beta testing with 2-3 CAMs
- [ ] Monitor for bugs
- [ ] Collect feedback (survey + interviews)
- [ ] Fix critical issues

### Week 7 (Jan 20-24)
- [ ] Compile results and feedback
- [ ] Present to Lewis/Michelle
- [ ] **Go/No-Go decision**
- [ ] Plan Phase 1 if approved

---

## 📞 Support & Contact

### Questions About the Calculator

- **Developer:** Brandon Delgado, GTM Engineer
- **Project Lead:** Lewis (CAM Manager)

### Finance Team (Pricing)

- **Need:** Partner buy prices, product mappings
- **Action:** Schedule meeting ASAP (Week 0)

### Beta Testers (Week 6)

- **Need:** 2-3 CAMs willing to test in mid-January
- **Action:** Lewis to provide names

---

## 🎯 Success Criteria

MVP is successful if:

**Usability:**
- ✅ CAM completes audit in < 45 minutes
- ✅ No critical bugs that block workflow

**Value:**
- ✅ Audits show average savings of $50K+ per MSP
- ✅ Finance validates calculation methodology
- ✅ Beta CAMs report they would use tool in real meetings

**Feedback:**
- ✅ At least 2 of 3 beta CAMs rate as "useful" or "very useful"
- ✅ CAMs provide specific feedback for Phase 1

**Technical:**
- ✅ Works in Chrome, Edge, Safari
- ✅ Deployed to live URL
- ✅ No data loss during session

---

## 📄 License

Internal WatchGuard tool. Not for public distribution.

---

## 🔗 Related Documents

- [Profitstack Requisitos.md](./Profitstack%20Requisitos.md) - Full MVP specification
- [ROI Calculator](./ROI/index.html) - Reference MDR ROI calculator

---

## 📝 Changelog

### v1.0 (Nov 19, 2025)
- Initial MVP implementation
- MSP Profile form
- 4 category forms with dynamic tool management
- Real-time TCO calculation
- Chart.js visualization
- LocalStorage auto-save
- Placeholder pricing (requires Finance validation)

---

## ✨ Demo Data (For Testing)

Use this sample data to test the calculator:

**MSP Profile:**
- Name: SecureIT Solutions
- Region: North America
- Endpoints: 500
- Clients: 25
- Labor Rate: $85/hr

**Network Security:**
- Tool: FortiGate 60F
- Annual Cost: $6,000
- Monthly Hours: 3

**Endpoint Security:**
- Tool: Sophos Intercept X
- Annual Cost: $27,000
- Monthly Hours: 4

**Identity & Access:**
- Tool: Duo MFA
- Annual Cost: $3,600
- Monthly Hours: 2

**Managed Services:**
- Tool: Huntress MDR
- Annual Cost: $48,000
- Monthly Hours: 5

**Expected Results (with placeholders):**
- Current TCO: ~$98,880
- Labor: $14,280 (14 hrs × $85 × 12)
- Savings will depend on placeholder pricing

---

**Built with ❤️ by the WatchGuard GTM Engineering Team**

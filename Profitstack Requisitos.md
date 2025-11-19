
# WatchGuard ProfitStack Calculator - MVP Specification

**Document Version:** 1.0  
**Last Updated:** November 19, 2025  
**Project Lead:** Brandon Delgado, GTM Engineer  
**Status:** Ready to Build

---

## Executive Summary

ProfitStack MVP is a **7-week validation project** to build a static web calculator that helps CAMs demonstrate the financial benefits of consolidating security tools onto the WatchGuard Unified Security Platform. This is a **proof of concept** - if successful, it becomes the foundation for a full production tool (Phase 1-3).

**Core Question:** Will CAMs use this tool, and does it generate meaningful value for MSP partners?

**MVP Approach:**

- 4 security categories (not 15)
- Static HTML/CSS/JavaScript (no backend)
- No authentication, no database
- GitHub Pages hosting (free)
- 2-3 beta testers
- Go/No-Go decision after 7 weeks

**If successful:** Invest in Phase 1-3 (authentication, database, expanded features)  
**If not:** Pivot or cancel - only lost 7 weeks and $0

---

## Business Objectives

### Primary Goals

1. **Validate Concept:** Does this tool help CAMs in partner conversations?
2. **Validate Calculations:** Are savings meaningful and credible?
3. **Validate Usability:** Can CAM complete audit in <45 minutes?
4. **Get Feedback:** What do CAMs need that's missing?

### Use Cases

**Use Case 1: Partner QBR**

- CAM sits with MSP partner
- Walks through current security stack (4 categories)
- Shows consolidated WatchGuard stack
- Demonstrates $50K+ annual savings
- MSP gets PDF to share with leadership

**Use Case 2: Competitive Displacement**

- MSP currently using Sophos/Fortinet stack
- CAM shows side-by-side comparison
- Quantifies cost + labor savings
- Builds business case for migration

**Use Case 3: Cross-sell Existing Partner**

- Partner only using Firebox today
- CAM shows adding EPDR + AuthPoint + MDR
- Demonstrates margin improvement
- Upsells additional products

---

## Scope Definition

### ✅ In Scope (MUST HAVE)

**1. MSP Profile Input**

- MSP name
- Region (dropdown: North America, EMEA, APAC, LATAM)
- Number of managed endpoints
- Number of managed clients/customers

**2. Current Stack Input (4 Categories)**

Each category captures:

- Tool/vendor name (free text + suggestions)
- Annual license cost (USD)
- Monthly management hours
- Notes (optional)

**Categories:**

1. **Network Security**
   - Sub-categories: Firewall, SASE, NDR
   - Examples: FortiGate, Sophos XG, Palo Alto
   
2. **Endpoint Security**
   - Endpoint protection/detection (AV/EDR/XDR)
   - Examples: Sophos Intercept X, CrowdStrike, SentinelOne
   
3. **Identity & Access**
   - Sub-categories: SSO, MFA, authentication
   - Examples: Duo, Okta, Microsoft MFA
   
4. **Managed Services**
   - MDR (Managed Detection & Response)
   - MNDR (Managed Network Detection & Response)
   - Examples: Huntress, Arctic Wolf, Red Canary

**3. Labor Cost Input**

- Technician hourly rate (default: $85/hour, editable)
- Auto-calculate total labor cost from management hours

**4. Product Mapping Engine**

- Hard-coded competitor → WatchGuard mappings
- Examples:
  - Sophos Intercept X → WatchGuard EPDR
  - FortiGate 60F → WatchGuard Firebox T45
  - Duo MFA → WatchGuard AuthPoint
  - Huntress MDR → WatchGuard MDR

**5. Calculation Engine**

**Current State TCO:**
```
Annual License Costs = Σ(Tool costs across 4 categories)
Annual Labor Costs = Σ(Hours × Hourly Rate × 12 months)
Current Annual TCO = License + Labor
```

**Unified WatchGuard TCO:**
```
WG License Costs = Σ(WatchGuard products × Partner Buy Price × 12)
WG Labor Costs = Current Labor × 0.70 (30% efficiency gain)
Unified Annual TCO = WG License + WG Labor
```

**Savings:**
```
Annual Savings = Current TCO - Unified TCO
Savings % = (Annual Savings / Current TCO) × 100
3-Year Savings = Annual Savings × 3
```

**6. Results Dashboard**

- Hero metrics (large font):
  - Annual Savings (USD)
  - Savings Percentage
  - 3-Year Total Savings
- Side-by-side comparison:
  - Current TCO vs. Unified TCO
  - License costs comparison
  - Labor costs comparison
- Bar chart visualization (Chart.js):
  - Current stack (by category)
  - Unified stack (by WG product)
- Key benefits callouts:
  - Vendors reduced (count)
  - Admin portals reduced (count)
  - Hours saved per month

**7. PDF Generation (NICE TO HAVE)**

- 1-page executive summary
- Header: WatchGuard logo + MSP name
- Key metrics (savings, TCO comparison)
- Simple bar chart
- Footer: Date generated, disclaimer
- Uses jsPDF library
- Downloads to browser

**8. Static Hosting**

- GitHub Pages
- URL: `https://[brandon-github].github.io/profitstack-mvp/`
- Mobile-responsive (basic - desktop/tablet priority)

### ❌ Out of Scope (DEFER TO PHASE 1)

- Authentication (Microsoft SSO)
- User accounts and roles
- Database / data persistence
- Audit history
- Save/load functionality (beyond browser session)
- More than 4 categories
- Multi-scenario comparisons
- Admin dashboard
- Dynamic pricing updates
- Multi-currency support (USD only)
- Regional pricing variations
- CRM/Salesforce integration
- Partner self-service portal
- Advanced mobile optimization
- Email delivery of results
- Collaboration features

---

## Technical Architecture

### Technology Stack

```
Frontend:
  HTML: HTML5 semantic markup
  CSS: Custom CSS (WatchGuard brand colors)
  JavaScript: Vanilla ES6+ (no frameworks)
  
Libraries (CDN):
  Chart.js: Bar chart visualizations (~40KB)
  jsPDF: PDF generation (optional, ~200KB)
  
Storage:
  localStorage: Auto-save draft (prevent data loss during session)
  
Hosting:
  GitHub Pages: Free static hosting
  
Version Control:
  Git + GitHub
  Repository: watchguard-profitstack-mvp (private)
```

### Architecture Diagram

```
┌─────────────────────────────────────────────┐
│   CAM opens browser                         │
│   https://[brandon].github.io/              │
│          profitstack-mvp/                   │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│   Single Page Application (HTML/CSS/JS)    │
│                                             │
│   ├─ Input Forms (4 categories)            │
│   ├─ Calculation Engine (JavaScript)       │
│   ├─ Results Dashboard (Chart.js)          │
│   └─ PDF Generator (jsPDF - optional)      │
│                                             │
│   Data stored in: browser memory only      │
│   Persistence: localStorage (temporary)    │
└─────────────────────────────────────────────┘
                    ↓
┌─────────────────────────────────────────────┐
│   Downloads                                 │
│   ├─ PDF (profitstack-analysis.pdf)       │
│   └─ JSON backup (optional)                │
└─────────────────────────────────────────────┘
```

**Key Point:** No backend, no database. Everything runs in browser.

### Data Flow

```
1. CAM inputs MSP data + current stack
   ↓
2. JavaScript validates inputs
   ↓
3. JavaScript calculates TCO, savings
   ↓
4. Chart.js renders visualizations
   ↓
5. Display results on screen
   ↓
6. (Optional) jsPDF generates PDF → Download
   ↓
7. CAM shares PDF with MSP
```

---

## Development Timeline

### Week-by-Week Plan

```
Week 0 (Nov 18-22): Requirements & Setup
├─ Answer open questions (see below)
├─ Validate product mappings with Finance
├─ Confirm WatchGuard pricing (partner buy)
├─ Set up GitHub repo
└─ Kickoff meeting with Lewis

Week 1-2 (Nov 25 - Dec 6): Build Input Forms
├─ MSP profile form (name, region, endpoints, clients)
├─ 4 category forms (Network, Endpoint, Identity, Services)
├─ Input validation
├─ Auto-save to localStorage
├─ Test on desktop and tablet
└─ Deliverable: Working input forms

Week 3-4 (Dec 9-20): Calculation Engine + Results
├─ JavaScript calculation logic
├─ Product mapping engine (competitor → WG)
├─ Results dashboard (HTML/CSS)
├─ Chart.js bar chart integration
├─ Test calculations against manual spreadsheet
└─ Deliverable: Working calculator end-to-end

[HOLIDAY BREAK - Dec 23 - Jan 3]

Week 5 (Jan 6-10): PDF Generation + Deployment
├─ jsPDF implementation (1-page PDF)
├─ Test PDF on various browsers
├─ Deploy to GitHub Pages
├─ Custom domain (if available): profitstack-mvp.watchguard.com
├─ Final testing (all browsers, devices)
└─ Deliverable: Live URL ready for beta

Week 6 (Jan 13-17): Beta Testing
├─ 2-3 CAMs test with real MSPs
├─ Brandon monitors for issues
├─ Collect feedback (survey + interviews)
├─ Fix critical bugs
└─ Deliverable: Feedback report

Week 7 (Jan 20-24): Go/No-Go Decision
├─ Compile results and feedback
├─ Presentation to Lewis/Michelle
├─ Decision: Proceed to Phase 1 or pivot?
└─ Deliverable: Recommendation document
```

**Total Duration:** 7 weeks (5 weeks active development + 1 week beta + 1 week decision)

---

## Functional Requirements

### FR-1: MSP Profile Input

**Fields:**

- [ ]  MSP Name (text, required)
- [ ]  Region (dropdown: NA, EMEA, APAC, LATAM - required)
- [ ]  Number of Endpoints (number, required, min: 1)
- [ ]  Number of Clients (number, optional)

**Validation:**

- All required fields must be filled
- Numbers must be > 0
- Show inline error messages

---

### FR-2: Current Stack Input (4 Categories)

**For each category:**

**Network Security:**

- [ ]  Vendor/Product Name (text with autocomplete suggestions)
- [ ]  Annual License Cost (number, USD, required)
- [ ]  Monthly Management Hours (number, default: 2, editable)
- [ ]  Notes (text, optional)
- [ ]  "Add Another Tool" button (supports multiple tools per category)

**Endpoint Security:**

- [ ]  Same fields as Network

**Identity & Access:**

- [ ]  Same fields as Network

**Managed Services:**

- [ ]  Same fields as Network

**Additional:**

- [ ]  "Mark category as Not Used" option (skip category)
- [ ]  Collapsible sections (expand/collapse categories)

---

### FR-3: Labor Cost Input

- [ ]  Technician Hourly Rate (number, USD, default: $85, editable)
- [ ]  Display calculated total monthly hours (sum across all tools)
- [ ]  Display calculated annual labor cost

**Formula:**
```
Annual Labor Cost = Σ(Monthly Hours per Tool) × Hourly Rate × 12
```

---

### FR-4: Product Mapping Engine

**Hard-coded mappings (examples):**

```javascript
const mappings = {
  network: {
    'fortinet fortigate': { wg_product: 'Firebox T45', wg_sku: 'WGT45', wg_price: 650 },
    'sophos xg': { wg_product: 'Firebox T45', wg_sku: 'WGT45', wg_price: 650 },
    'palo alto': { wg_product: 'Firebox T85', wg_sku: 'WGT85', wg_price: 1200 }
  },
  endpoint: {
    'sophos intercept x': { wg_product: 'EPDR', wg_sku: 'EPDR-STD', wg_price: 4.50 },
    'crowdstrike': { wg_product: 'EPDR + MDR', wg_sku: 'EPDR-MDR', wg_price: 12.50 },
    'sentinelone': { wg_product: 'EPDR', wg_sku: 'EPDR-STD', wg_price: 4.50 }
  },
  identity: {
    'duo': { wg_product: 'AuthPoint', wg_sku: 'AP-STD', wg_price: 2.00 },
    'okta': { wg_product: 'AuthPoint', wg_sku: 'AP-STD', wg_price: 2.00 }
  },
  services: {
    'huntress': { wg_product: 'WatchGuard MDR', wg_sku: 'MDR-STD', wg_price: 8.00 },
    'arctic wolf': { wg_product: 'WatchGuard MDR', wg_sku: 'MDR-STD', wg_price: 8.00 }
  }
}
```

**Logic:**

- When CAM enters competitor name, suggest WatchGuard equivalent
- Use fuzzy matching (e.g., "fortigate" matches "fortinet fortigate")
- If no match, allow custom WG product selection

---

### FR-5: Calculation Engine

**Current State:**
```javascript
const currentLicenseCost = sumAllToolCosts()
const currentLaborCost = sumAllHours() * hourlyRate * 12
const currentTCO = currentLicenseCost + currentLaborCost
```

**Unified WatchGuard State:**
```javascript
const wgLicenseCost = sumWGProductCosts()
const wgLaborCost = currentLaborCost * 0.70 // 30% reduction
const unifiedTCO = wgLicenseCost + wgLaborCost
```

**Savings:**
```javascript
const annualSavings = currentTCO - unifiedTCO
const savingsPercent = (annualSavings / currentTCO) * 100
const threeYearSavings = annualSavings * 3
```

**Efficiency Assumptions:**

- 30% labor reduction (fewer vendors, fewer portals)
- Documented in results (transparency)

---

### FR-6: Results Dashboard

**Layout:**

```
┌──────────────────────────────────────────────────┐
│  🎯 ProfitStack Analysis for [MSP Name]         │
├──────────────────────────────────────────────────┤
│                                                  │
│  💰 Annual Savings: $75,000 (32%)               │
│  📊 3-Year Savings: $225,000                     │
│                                                  │
├──────────────────────────────────────────────────┤
│  Current Stack        │  Unified WatchGuard     │
│  $235,000/year        │  $160,000/year          │
│  ├─ License: $180K    │  ├─ License: $120K      │
│  └─ Labor: $55K       │  └─ Labor: $40K         │
├──────────────────────────────────────────────────┤
│                                                  │
│  [===========  Bar Chart  ===========]          │
│  Current vs Unified (by category)               │
│                                                  │
├──────────────────────────────────────────────────┤
│  ✅ Benefits:                                    │
│  • Vendors reduced: 8 → 1                       │
│  • Admin portals reduced: 8 → 1                 │
│  • Hours saved per month: 12 hours              │
│  • Unified management console                   │
├──────────────────────────────────────────────────┤
│  [Download PDF]  [Start New Audit]              │
└──────────────────────────────────────────────────┘
```

**Chart.js Bar Chart:**

- X-axis: Categories (Network, Endpoint, Identity, Services)
- Y-axis: Annual Cost (USD)
- Two bars per category: Current (red) vs. Unified (blue)
- Responsive, prints well

---

### FR-7: PDF Generation (Optional)

**1-Page Layout:**

```
┌──────────────────────────────────────┐
│ [WatchGuard Logo]    [MSP Logo]      │
│                                      │
│ Security Stack Consolidation        │
│ Analysis for [MSP Name]             │
│                                      │
│ Annual Savings: $75,000 (32%)       │
│ 3-Year Savings: $225,000            │
│                                      │
│ ─────────────────────────────────── │
│                                      │
│ Current Stack: $235,000/year        │
│  • 8 different vendors              │
│  • 8 admin portals                  │
│  • 24 hours/month management        │
│                                      │
│ Unified WatchGuard: $160,000/year   │
│  • Single vendor                    │
│  • Single admin portal              │
│  • 17 hours/month management        │
│                                      │
│ ─────────────────────────────────── │
│                                      │
│ [Simple bar chart image]            │
│                                      │
│ ─────────────────────────────────── │
│                                      │
│ Generated: Jan 15, 2026             │
│ Confidential - For Discussion Only  │
└──────────────────────────────────────┘
```

**jsPDF Implementation:**

- Clean, black & white (prints well)
- Focus on numbers, not design
- Executive-friendly (not technical)

---

### FR-8: Non-Functional Requirements

**Performance:**

- [ ]  Page load < 3 seconds
- [ ]  Calculation instant (<500ms)
- [ ]  PDF generation < 5 seconds

**Browser Support:**

- [ ]  Chrome (latest)
- [ ]  Edge (latest)
- [ ]  Safari (latest)
- [ ]  Firefox (latest - best effort)

**Responsive:**

- [ ]  Desktop 1920×1080 (primary)
- [ ]  Laptop 1366×768
- [ ]  Tablet 1024×768 (iPad)
- [ ]  Mobile 375×667 (basic - not optimized)

**Accessibility:**

- [ ]  Semantic HTML
- [ ]  Keyboard navigation
- [ ]  Form labels
- [ ]  ARIA attributes (basic)

**Brand:**

- [ ]  WatchGuard colors (Red #E81410, Blue #002663)
- [ ]  Roboto font
- [ ]  Professional, clean design

---

## Open Questions (URGENT - Week 0)

### 1. Product Mappings - Finance/Product Team

**Question:** Do we have finalized mappings for WatchGuard equivalents for each competitor tool across the four categories?

**Brandon needs:**

- [ ]  List of top 10 competitors per category (40 total)
- [ ]  Recommended WatchGuard equivalent for each
- [ ]  Partner buy pricing for WatchGuard products (Gold tier, USD)
- [ ]  Source of truth document (who maintains this?)

**Action:** Schedule meeting with Finance/Product this week

---

### 2. Default Labor Rate

**Question:** What default labor hourly rate should we show (or should rate always be input manually)?

**Options:**

- **A:** Default $85/hour (US average), editable
- **B:** Always manual (no default)
- **C:** Default by region (US: $85, Europe: €75)

**Brandon's recommendation:** Option A (default $85, editable)

**Action:** Lewis decides

---

### 3. Margin Uplift Calculation

**Question:** How will margin uplift be calculated exactly — will MSP define desired margin % or will we suggest one?

**Options:**

- **A:** MSP inputs current margin % → Calculator shows potential improved margin
- **B:** MSP inputs sell price → Calculator calculates margin: (Sell - Cost) / Sell
- **C:** Don't show margin in MVP, only cost savings (simpler)

**Brandon's recommendation:** Option C for MVP (just savings), add margin in Phase 1

**Action:** Lewis decides

---

### 4. Inefficiency Cost

**Question:** Will we include an "inefficiency cost" (tool sprawl, management overhead) and if so, how much in MVP?

**Brandon's proposal:**
```
Current Labor Cost = Σ(Hours × Hourly Rate × 12)
Unified Labor Cost = Current × 0.70 (30% reduction assumption)

Displayed as:
"Labor savings from unified management: $15,000/year"
```

**Assumption documented clearly in results.**

**Action:** Lewis approves or adjusts percentage

---

### 5. Currency Support

**Question:** Do we need to support currency input (USD/CAD) in MVP or defer to later version?

**Brandon's recommendation:** USD only in MVP, add multi-currency in Phase 1

**Action:** Lewis confirms

---

### 6. Beta Testers

**Question:** Who will be the beta testers (which CAMs/MSPs)? What incentives or scheduling?

**Brandon needs from Lewis:**

- [ ]  Names of 2-3 CAMs (willing to test in mid-January)
- [ ]  Do they have friendly MSPs lined up?
- [ ]  Any incentive? (Early access, recognition, swag?)
- [ ]  Timeline confirmation (Week 6: Jan 13-17)

**Action:** Lewis provides names this week

---

### 7. Brand Styling

**Question:** What WatchGuard brand styling guidelines must the UI and PDF adhere to?

**Brandon has (from VPN calculator):**
```css
--wg-red: #E81410
--wg-dark-blue: #002663
--wg-blue: #035996
Font: Roboto
```

**Question:** Need Marketing approval or OK to use these?

**Action:** Lewis confirms or connects Brandon with Marketing

---

### 8. PDF Fallback Plan

**Question:** If PDF generation integration fails, what is the fallback plan?

**Note:** Lewis mentioned "n8n or equivalent" but for static MVP, we don't need n8n!

**Brandon's plan:**

- **Primary:** jsPDF (generates PDF in browser)
- **Fallback 1:** Browser Print to PDF (native)
- **Fallback 2:** Download HTML page

**Action:** Lewis confirms approach

---

## Success Criteria

### MVP is successful if:

**Usability:**

- [ ]  CAM completes audit in < 45 minutes (average)
- [ ]  All beta testers successfully create at least 1 complete audit
- [ ]  No critical bugs that block workflow

**Value:**

- [ ]  Audits show average savings of $50K+ per MSP
- [ ]  Finance validates calculation methodology is sound
- [ ]  Beta CAMs report they would use tool in real partner meetings

**Feedback:**

- [ ]  At least 2 of 3 beta CAMs rate tool as "useful" or "very useful"
- [ ]  CAMs provide specific, actionable feedback for Phase 1
- [ ]  MSPs respond positively to results (qualitative)

**Technical:**

- [ ]  Tool works in Chrome, Edge, Safari
- [ ]  PDF generates successfully (if implemented)
- [ ]  Deployed to live URL, accessible
- [ ]  No data loss during session (localStorage works)

**Decision:**

- [ ]  Clear go/no-go recommendation with supporting data
- [ ]  Lewis/Michelle approve Phase 1 or provide pivot direction

---

## Risk Analysis

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| **Beta CAMs too busy in January** | High | Medium | Recruit testers NOW; Have 4-5 on deck (test with 2-3) |
| **Calculations inaccurate** | High | Low | Validate with Finance Week 0; Parallel Excel spreadsheet |
| **Product mappings incomplete** | High | Medium | Finance meeting Week 0; Document assumptions if gaps |
| **PDF generation fails** | Medium | Low | Fallback to browser print; Not critical for MVP |
| **CAMs don't see value** | High | Low-Medium | Proper expectations; Clear use cases; Show wins |
| **Holiday timing** | Low | High | Built into timeline (2-week buffer) |

---

## Next Steps

### Immediate (This Week - Week 0):

**1. Brandon → Lewis: Schedule Alignment Meeting**
```
Subject: ProfitStack MVP - Week 0 Kickoff

Hi Lewis,

Ready to start ProfitStack MVP! Need 30-60 min this week to align on:

1. Open questions (8 questions - see doc)
2. Beta tester names (2-3 CAMs for mid-January)
3. Product mappings validation (need Finance?)
4. Timeline confirmation

When works for you?

Thanks!
Brandon
```

**2. Brandon → Finance: Product Mappings & Pricing**
```
Subject: ProfitStack MVP - Competitor Mappings & Pricing

Hi Finance Team,

For ProfitStack MVP, I need:

1. Top 10 competitors per category (Network, Endpoint, Identity, Services)
2. Recommended WatchGuard equivalent for each
3. Partner buy pricing (Gold tier, USD) for WG products:
   - Firebox T-series
   - EPDR
   - AuthPoint
   - MDR
   - DNSWatch (if applicable)

Can we meet this week (30 min)?

Thanks!
Brandon
```

**3. Brandon: Set Up Development Environment**

- [ ]  Create GitHub repo: `watchguard-profitstack-mvp`
- [ ]  Clone VPN calculator as starting template
- [ ]  Set up local development (VS Code + Live Server)
- [ ]  Create project structure

---

### Week 1 (Starting Nov 25):

**Monday:**

- [ ]  Open questions resolved (meeting with Lewis)
- [ ]  Product mappings confirmed (Finance)
- [ ]  Beta testers identified

**Tuesday-Friday:**

- [ ]  Build MSP profile form
- [ ]  Build 4 category input forms
- [ ]  Implement input validation
- [ ]  Add localStorage auto-save

**Deliverable:** Working input forms (no calculations yet)

---

### Week 2 (Dec 2-6):

- [ ]  Refine forms based on self-testing
- [ ]  Add autocomplete for vendor names
- [ ]  Polish UI/UX
- [ ]  Prepare for calculation engine build

**Deliverable:** Polished input forms ready for calculations

---

### Week 3-4 (Dec 9-20):

- [ ]  Build JavaScript calculation engine
- [ ]  Implement product mapping logic
- [ ]  Build results dashboard HTML/CSS
- [ ]  Integrate Chart.js visualization
- [ ]  Test calculations against Excel

**Deliverable:** Working end-to-end calculator

---

### Holiday Break (Dec 23 - Jan 3):

- Brandon available for critical fixes if needed
- Otherwise, break time

---

### Week 5 (Jan 6-10):

- [ ]  Implement jsPDF (1-page PDF)
- [ ]  Deploy to GitHub Pages
- [ ]  Final testing (all browsers)
- [ ]  Send URL to beta testers

**Deliverable:** Live tool ready for beta

---

### Week 6 (Jan 13-17):

- [ ]  Beta CAMs test with MSPs
- [ ]  Brandon monitors, fixes bugs
- [ ]  Collect feedback (survey + interviews)
- [ ]  Compile feedback report

**Deliverable:** Feedback report with recommendations

---

### Week 7 (Jan 20-24):

- [ ]  Present findings to Lewis/Michelle
- [ ]  Go/No-Go decision
- [ ]  If GO: Plan Phase 1 kickoff
- [ ]  If NO-GO: Document lessons, pivot

**Deliverable:** Decision + next steps

---

## Budget

**MVP Budget:**

| Item | Cost |
|------|------|
| Brandon's time | Internal (salaried) |
| GitHub Pages hosting | $0 (free) |
| Domain (optional) | $0 (use github.io) or $12/year |
| Libraries (Chart.js, jsPDF) | $0 (open source, CDN) |
| **Total** | **$0-12** |

**Phase 1-3 Budget:** See separate "Phase 1-3 Roadmap" document

---

## Appendix A: Sample Calculation

**Example MSP:**

- Name: SecureIT Solutions
- Endpoints: 500
- Region: North America

**Current Stack:**

- **Network:** Fortinet FortiGate ($6,000/year, 3 hours/month)
- **Endpoint:** Sophos Intercept X ($27,000/year, 4 hours/month)
- **Identity:** Duo MFA ($3,600/year, 2 hours/month)
- **Services:** Huntress MDR ($48,000/year, 5 hours/month)

**Labor:**

- Total hours/month: 14 hours
- Hourly rate: $85
- Annual labor: 14 × $85 × 12 = $14,280

**Current TCO:**

- License: $84,600
- Labor: $14,280
- **Total: $98,880**

**Unified WatchGuard Stack:**

- **Network:** Firebox T45 ($650 × 12 = $7,800)
- **Endpoint:** EPDR (500 × $4.50 × 12 = $27,000)
- **Identity:** AuthPoint (500 × $2.00 × 12 = $12,000)
- **Services:** MDR (500 × $8.00 × 12 = $48,000)

**Unified Labor:**

- Reduced hours: 14 × 0.70 = 9.8 hours/month
- Annual labor: 9.8 × $85 × 12 = $9,996

**Unified TCO:**

- License: $94,800
- Labor: $9,996
- **Total: $104,796**

**Savings:**

- Current - Unified = $98,880 - $104,796 = **-$5,916** (LOSS!)

**⚠️ Issue:** This example shows a LOSS, not savings!

**Brandon needs to:**

1. Verify WatchGuard pricing is accurate (partner buy, not MSRP?)
2. Adjust assumptions (labor reduction %, other efficiencies?)
3. Validate with Finance that calculations make sense
4. Ensure MVP shows TRUE value, not artificial savings

---

## Appendix B: Technology Reference

**Base Template:** VPN Calculator (`vpn_calc_new.html`)

**Key Code Patterns:**

```javascript
// Auto-save to localStorage
function autoSave() {
  const formData = {
    mspName: $('#mspName').value,
    endpoints: $('#endpoints').value,
    // ... all fields
  }
  localStorage.setItem('profitstack-draft', JSON.stringify(formData))
}

// Load from localStorage
function loadDraft() {
  const saved = localStorage.getItem('profitstack-draft')
  if (saved) {
    const data = JSON.parse(saved)
    $('#mspName').value = data.mspName
    // ... restore all fields
  }
}

// Calculate TCO
function calculate() {
  const currentTCO = calculateCurrentStack()
  const unifiedTCO = calculateUnifiedStack()
  const savings = currentTCO - unifiedTCO
  displayResults(savings, currentTCO, unifiedTCO)
}

// Generate PDF (jsPDF)
function generatePDF() {
  const doc = new jsPDF()
  doc.setFontSize(20)
  doc.text('ProfitStack Analysis', 20, 20)
  // ... add content
  doc.save('profitstack-analysis.pdf')
}
```
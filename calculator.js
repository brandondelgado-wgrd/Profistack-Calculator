/**
 * WatchGuard ProfitStack Calculator - Main Application
 *
 * Calculates TCO savings from consolidating security tools onto
 * the WatchGuard Unified Security Platform
 */

// ============================================================================
// Application State
// ============================================================================

const AppState = {
  mspProfile: {
    name: '',
    region: '',
    endpoints: 0,
    clients: 0,
    laborRate: 85
  },
  categories: {
    network: { enabled: true, tools: [] },
    endpoint: { enabled: true, tools: [] },
    identity: { enabled: true, tools: [] },
    services: { enabled: true, tools: [] }
  },
  toolCounter: 0,
  lastCalculation: null
};

// ============================================================================
// DOM Elements Cache
// ============================================================================

const DOM = {
  // MSP Profile
  mspName: null,
  region: null,
  numEndpoints: null,
  numClients: null,
  laborRate: null,

  // Results
  resultsSummary: null,
  heroMetrics: null,
  annualSavings: null,
  savingsPercent: null,
  threeYearSavings: null,
  comparisonTable: null,
  chartContainer: null,
  benefitsCallouts: null,
  actionButtons: null,

  // Buttons
  downloadPDF: null,
  startNew: null
};

// ============================================================================
// Initialization
// ============================================================================

document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 ProfitStack Calculator initializing...');

  cacheDOMElements();
  attachEventListeners();
  initializeCategories();
  loadFromLocalStorage();

  console.log('✅ ProfitStack Calculator ready');
});

/**
 * Cache DOM element references for performance
 */
function cacheDOMElements() {
  // MSP Profile inputs
  DOM.mspName = document.getElementById('mspName');
  DOM.region = document.getElementById('region');
  DOM.numEndpoints = document.getElementById('numEndpoints');
  DOM.numClients = document.getElementById('numClients');
  DOM.laborRate = document.getElementById('laborRate');

  // Results sections
  DOM.resultsSummary = document.getElementById('resultsSummary');
  DOM.heroMetrics = document.getElementById('heroMetrics');
  DOM.annualSavings = document.getElementById('annualSavings');
  DOM.savingsPercent = document.getElementById('savingsPercent');
  DOM.threeYearSavings = document.getElementById('threeYearSavings');
  DOM.comparisonTable = document.getElementById('comparisonTable');
  DOM.chartContainer = document.getElementById('chartContainer');
  DOM.benefitsCallouts = document.getElementById('benefitsCallouts');
  DOM.actionButtons = document.getElementById('actionButtons');

  // Buttons
  DOM.downloadPDF = document.getElementById('downloadPDF');
  DOM.startNew = document.getElementById('startNew');
}

/**
 * Attach event listeners to form elements
 */
function attachEventListeners() {
  // MSP Profile - real-time calculation
  [DOM.mspName, DOM.region, DOM.numEndpoints, DOM.numClients, DOM.laborRate].forEach(el => {
    if (el) {
      el.addEventListener('input', debounce(() => {
        updateMSPProfile();
        saveToLocalStorage();
        calculate();
      }, 500));
    }
  });

  // Category skip checkboxes
  document.querySelectorAll('.category-skip').forEach(checkbox => {
    checkbox.addEventListener('change', (e) => {
      const category = e.target.dataset.category;
      toggleCategory(category, !e.target.checked);
    });
  });

  // Category toggle headers (expand/collapse) - click anywhere on header
  document.querySelectorAll('[data-action="toggle-category"]').forEach(header => {
    header.addEventListener('click', (e) => {
      // Prevent toggle if clicking on checkbox or input inside header
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'BUTTON') {
        return;
      }

      const section = header.closest('.category-section');
      const content = section.querySelector('.category-content');
      const toggleBtn = section.querySelector('.toggle-btn');

      content.classList.toggle('collapsed');
      toggleBtn.classList.toggle('collapsed');
    });
  });

  // Add tool buttons
  document.querySelectorAll('.add-tool-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const category = e.target.dataset.category;
      addTool(category);
    });
  });

  // Action buttons
  if (DOM.downloadPDF) {
    DOM.downloadPDF.addEventListener('click', generatePDF);
  }
  if (DOM.startNew) {
    DOM.startNew.addEventListener('click', startNewAudit);
  }

  // Manual calculate button (debug)
  const manualCalcBtn = document.getElementById('manualCalculate');
  if (manualCalcBtn) {
    manualCalcBtn.addEventListener('click', () => {
      console.log('🔘 Manual calculate button clicked');
      calculate();
    });
  }
}

/**
 * Initialize categories - start collapsed with no tools
 */
function initializeCategories() {
  // Categories start collapsed and empty
  // User will add tools manually
  updateAllToolCounts();
}

// ============================================================================
// MSP Profile Management
// ============================================================================

function updateMSPProfile() {
  AppState.mspProfile = {
    name: DOM.mspName?.value || '',
    region: DOM.region?.value || '',
    endpoints: parseInt(DOM.numEndpoints?.value) || 0,
    clients: parseInt(DOM.numClients?.value) || 0,
    laborRate: parseFloat(DOM.laborRate?.value) || 85
  };
}

// ============================================================================
// Tool Management
// ============================================================================

/**
 * Add a tool to a category
 */
function addTool(category) {
  if (!AppState.categories[category].enabled) return;

  const toolId = `tool-${category}-${++AppState.toolCounter}`;
  const tool = {
    id: toolId,
    category: category,
    vendor: '',
    annualCost: 0,
    monthlyHours: 2,
    notes: ''
  };

  AppState.categories[category].tools.push(tool);
  renderTool(category, tool);
  updateToolCount(category);
  saveToLocalStorage();
}

/**
 * Update tool count display for a category
 * Only count tools that have vendor name OR cost filled
 */
function updateToolCount(category) {
  // Count only tools with data (vendor name or cost)
  const count = AppState.categories[category].tools.filter(tool =>
    (tool.vendor && tool.vendor.trim()) || tool.annualCost > 0
  ).length;

  const countSpan = document.querySelector(`.tool-count[data-category="${category}"]`);
  if (countSpan) {
    countSpan.textContent = `(${count} ${count === 1 ? 'tool' : 'tools'})`;
  }
}

/**
 * Update all tool counts
 */
function updateAllToolCounts() {
  ['network', 'endpoint', 'identity', 'services'].forEach(category => {
    updateToolCount(category);
  });
}

/**
 * Render a tool card in the DOM
 */
function renderTool(category, tool) {
  const container = document.getElementById(`${category}-tools`);
  if (!container) return;

  const toolIndex = AppState.categories[category].tools.length;

  const toolCard = document.createElement('div');
  toolCard.className = 'tool-card';
  toolCard.dataset.toolId = tool.id;
  toolCard.innerHTML = `
    <div class="tool-card-header">
      <span class="tool-number">Tool #${toolIndex}</span>
      <button type="button" class="remove-tool-btn" data-tool-id="${tool.id}" title="Remove this tool">×</button>
    </div>

    <label for="${tool.id}-vendor">Vendor/Product Name</label>
    <input type="text"
           id="${tool.id}-vendor"
           class="tool-vendor"
           placeholder="e.g., FortiGate, CrowdStrike, Duo"
           value="${tool.vendor}"
           data-tool-id="${tool.id}"
           list="${category}-suggestions" />

    <datalist id="${category}-suggestions">
      ${COMPETITOR_SUGGESTIONS[category]?.map(name => `<option value="${name}">`).join('') || ''}
    </datalist>

    <label for="${tool.id}-cost">Annual License Cost (USD)</label>
    <input type="number"
           id="${tool.id}-cost"
           class="tool-cost"
           min="0"
           step="100"
           placeholder="e.g., 5000"
           value="${tool.annualCost || ''}"
           data-tool-id="${tool.id}" />

    <label for="${tool.id}-hours">Monthly Management Hours</label>
    <input type="number"
           id="${tool.id}-hours"
           class="tool-hours"
           min="0"
           step="0.5"
           placeholder="2"
           value="${tool.monthlyHours || 2}"
           data-tool-id="${tool.id}" />

    <label for="${tool.id}-notes">Notes (optional)</label>
    <textarea id="${tool.id}-notes"
              class="tool-notes"
              rows="2"
              placeholder="Any additional context..."
              data-tool-id="${tool.id}">${tool.notes || ''}</textarea>
  `;

  container.appendChild(toolCard);

  // Attach event listeners to new inputs
  attachToolEventListeners(toolCard, tool.id);
}

/**
 * Attach event listeners to tool inputs
 */
function attachToolEventListeners(toolCard, toolId) {
  const inputs = toolCard.querySelectorAll('input, textarea');

  inputs.forEach(input => {
    input.addEventListener('input', debounce(() => {
      updateToolData(toolId, input);
      saveToLocalStorage();
      calculate();
    }, 500));
  });

  // Remove button
  const removeBtn = toolCard.querySelector('.remove-tool-btn');
  if (removeBtn) {
    removeBtn.addEventListener('click', () => removeTool(toolId));
  }
}

/**
 * Update tool data from input changes
 */
function updateToolData(toolId, input) {
  const tool = findToolById(toolId);
  if (!tool) return;

  if (input.classList.contains('tool-vendor')) {
    tool.vendor = input.value;
  } else if (input.classList.contains('tool-cost')) {
    tool.annualCost = parseFloat(input.value) || 0;
  } else if (input.classList.contains('tool-hours')) {
    tool.monthlyHours = parseFloat(input.value) || 0;
  } else if (input.classList.contains('tool-notes')) {
    tool.notes = input.value;
  }
}

/**
 * Remove a tool
 */
function removeTool(toolId) {
  // Find and remove from state
  for (const category in AppState.categories) {
    const tools = AppState.categories[category].tools;
    const index = tools.findIndex(t => t.id === toolId);
    if (index !== -1) {
      tools.splice(index, 1);

      // Remove from DOM
      const toolCard = document.querySelector(`[data-tool-id="${toolId}"]`);
      if (toolCard) {
        toolCard.remove();
      }

      // Renumber remaining tools
      renumberCategoryTools(category);

      // Update tool count
      updateToolCount(category);

      saveToLocalStorage();
      calculate();
      return;
    }
  }
}

/**
 * Renumber tools in a category after deletion
 */
function renumberCategoryTools(category) {
  const container = document.getElementById(`${category}-tools`);
  if (!container) return;

  const toolCards = container.querySelectorAll('.tool-card');
  toolCards.forEach((card, index) => {
    const numberSpan = card.querySelector('.tool-number');
    if (numberSpan) {
      numberSpan.textContent = `Tool #${index + 1}`;
    }
  });
}

/**
 * Find tool by ID across all categories
 */
function findToolById(toolId) {
  for (const category in AppState.categories) {
    const tool = AppState.categories[category].tools.find(t => t.id === toolId);
    if (tool) return tool;
  }
  return null;
}

/**
 * Toggle category enabled/disabled
 */
function toggleCategory(category, enabled) {
  AppState.categories[category].enabled = enabled;

  const container = document.getElementById(`${category}-tools`);
  const addBtn = document.querySelector(`.add-tool-btn[data-category="${category}"]`);

  if (container) container.classList.toggle('disabled', !enabled);
  if (addBtn) addBtn.disabled = !enabled;

  calculate();
  saveToLocalStorage();
}

// ============================================================================
// Calculation Engine
// ============================================================================

/**
 * Main calculation function
 */
function calculate() {
  console.log('🧮 Calculate called');
  updateMSPProfile();

  // Debug: Log current state
  console.log('MSP Profile:', AppState.mspProfile);
  console.log('Categories:', AppState.categories);

  // Validate minimum inputs
  if (!validateInputs()) {
    console.log('⚠️ Validation failed - showing placeholder');
    showPlaceholder();
    return;
  }

  console.log('✅ Validation passed - calculating...');

  // Calculate Current State TCO
  const currentState = calculateCurrentTCO();
  console.log('Current TCO:', currentState);

  // Calculate Unified WatchGuard TCO
  const unifiedState = calculateUnifiedTCO(currentState);
  console.log('Unified TCO:', unifiedState);

  // Calculate Savings
  const savings = calculateSavings(currentState, unifiedState);
  console.log('Savings:', savings);

  // Store results
  AppState.lastCalculation = {
    current: currentState,
    unified: unifiedState,
    savings: savings,
    timestamp: new Date()
  };

  // Update UI
  displayResults(AppState.lastCalculation);
  console.log('✅ Results displayed');
}

/**
 * Validate minimum required inputs
 */
function validateInputs() {
  const { name, region, endpoints } = AppState.mspProfile;

  console.log('Validating inputs:', { name, region, endpoints });

  if (!name || !region || !endpoints || endpoints < 1) {
    console.log('❌ MSP Profile incomplete');
    return false;
  }

  // Check if at least one tool is added
  const hasTools = Object.values(AppState.categories).some(cat =>
    cat.enabled && cat.tools.length > 0 && cat.tools.some(t => t.annualCost > 0)
  );

  console.log('Has tools with cost?', hasTools);

  return hasTools;
}

/**
 * Show placeholder when no data
 */
function showPlaceholder() {
  DOM.heroMetrics.style.display = 'none';
  DOM.comparisonTable.style.display = 'none';
  DOM.chartContainer.style.display = 'none';
  DOM.benefitsCallouts.style.display = 'none';
  DOM.actionButtons.style.display = 'none';

  DOM.resultsSummary.innerHTML = `
    <div class="results-placeholder">
      <p>Fill out the MSP profile and add at least one security tool with a cost to see your potential savings.</p>
    </div>
  `;
}

/**
 * Calculate Current State TCO
 */
function calculateCurrentTCO() {
  let totalLicenseCost = 0;
  let totalMonthlyHours = 0;
  let toolCount = 0;
  let vendorCount = new Set();

  for (const category in AppState.categories) {
    const cat = AppState.categories[category];
    if (!cat.enabled) continue;

    cat.tools.forEach(tool => {
      // Count vendor if name is provided, regardless of cost
      if (tool.vendor && tool.vendor.trim()) {
        vendorCount.add(tool.vendor.toLowerCase().trim());
      }

      // Only count costs/hours for tools with actual cost
      if (tool.annualCost > 0) {
        totalLicenseCost += tool.annualCost;
        totalMonthlyHours += tool.monthlyHours || 0;
        toolCount++;
      }
    });
  }

  const annualLaborCost = totalMonthlyHours * AppState.mspProfile.laborRate * 12;
  const totalTCO = totalLicenseCost + annualLaborCost;

  return {
    licenseCost: totalLicenseCost,
    laborCost: annualLaborCost,
    totalTCO: totalTCO,
    monthlyHours: totalMonthlyHours,
    toolCount: toolCount,
    vendorCount: vendorCount.size
  };
}

/**
 * Calculate Unified WatchGuard TCO
 */
function calculateUnifiedTCO(currentState) {
  const endpoints = AppState.mspProfile.endpoints;
  let wgLicenseCost = 0;

  // Map tools to WatchGuard equivalents
  const wgProducts = new Set();

  for (const category in AppState.categories) {
    const cat = AppState.categories[category];
    if (!cat.enabled) continue;

    cat.tools.forEach(tool => {
      if (tool.annualCost > 0 && tool.vendor) {
        const mapping = findProductMapping(tool.vendor, category);
        if (mapping) {
          wgProducts.add(mapping.wg_product);

          // Calculate cost based on pricing model
          if (mapping.wg_price_monthly) {
            // Monthly appliance cost (firewall)
            wgLicenseCost += mapping.wg_price_monthly * 12;
          } else if (mapping.wg_price_per_endpoint) {
            // Per-endpoint pricing (EPDR, MDR)
            wgLicenseCost += mapping.wg_price_per_endpoint * endpoints * 12;
          } else if (mapping.wg_price_per_user) {
            // Per-user pricing (AuthPoint)
            wgLicenseCost += mapping.wg_price_per_user * endpoints * 12;
          }
        }
      }
    });
  }

  // Apply 30% labor efficiency gain
  const laborReduction = EFFICIENCY_FACTORS?.labor_reduction || 0.30;
  const wgLaborCost = currentState.laborCost * (1 - laborReduction);
  const wgMonthlyHours = currentState.monthlyHours * (1 - laborReduction);

  const totalTCO = wgLicenseCost + wgLaborCost;

  return {
    licenseCost: wgLicenseCost,
    laborCost: wgLaborCost,
    totalTCO: totalTCO,
    monthlyHours: wgMonthlyHours,
    productCount: wgProducts.size,
    vendorCount: 1  // Unified to WatchGuard
  };
}

/**
 * Calculate Savings
 */
function calculateSavings(current, unified) {
  const annualSavings = current.totalTCO - unified.totalTCO;
  const savingsPercent = current.totalTCO > 0 ? (annualSavings / current.totalTCO) * 100 : 0;
  const threeYearSavings = annualSavings * 3;

  return {
    annual: annualSavings,
    percent: savingsPercent,
    threeYear: threeYearSavings,
    monthlyHoursSaved: current.monthlyHours - unified.monthlyHours,
    vendorsReduced: current.vendorCount - unified.vendorCount,
    portalsReduced: current.toolCount - unified.productCount
  };
}

// ============================================================================
// Results Display
// ============================================================================

/**
 * Display calculation results
 */
function displayResults(results) {
  const { current, unified, savings } = results;

  // Show all result sections
  DOM.heroMetrics.style.display = 'grid';
  DOM.comparisonTable.style.display = 'block';
  DOM.benefitsCallouts.style.display = 'block';
  DOM.actionButtons.style.display = 'flex';

  // Hide placeholder
  const placeholder = DOM.resultsSummary.querySelector('.results-placeholder');
  if (placeholder) placeholder.style.display = 'none';

  // Hero Metrics
  DOM.annualSavings.textContent = formatCurrency(savings.annual);
  DOM.savingsPercent.textContent = `${savings.percent.toFixed(1)}%`;
  DOM.threeYearSavings.textContent = formatCurrency(savings.threeYear);

  // Comparison Table
  document.getElementById('currentLicense').textContent = formatCurrency(current.licenseCost);
  document.getElementById('currentLabor').textContent = formatCurrency(current.laborCost);
  document.getElementById('currentTotal').textContent = formatCurrency(current.totalTCO);

  document.getElementById('unifiedLicense').textContent = formatCurrency(unified.licenseCost);
  document.getElementById('unifiedLabor').textContent = formatCurrency(unified.laborCost);
  document.getElementById('unifiedTotal').textContent = formatCurrency(unified.totalTCO);

  // Benefits Callouts
  document.getElementById('vendorsReduced').textContent = current.vendorCount;
  document.getElementById('portalsReduced').textContent = current.toolCount;
  document.getElementById('hoursSaved').textContent = savings.monthlyHoursSaved.toFixed(1);

  // Update Chart
  updateChart(results);
}

/**
 * Update Chart.js visualization
 */
let comparisonChart = null;

function updateChart(results) {
  const canvas = document.getElementById('comparisonChart');
  if (!canvas) return;

  DOM.chartContainer.style.display = 'block';

  const { current, unified } = results;

  const data = {
    labels: ['Network Security', 'Endpoint Security', 'Identity & Access', 'Managed Services'],
    datasets: [
      {
        label: 'Current Stack',
        data: getCategoryBreakdown(current, 'current'),
        backgroundColor: '#E81410',
        borderColor: '#E81410',
        borderWidth: 1
      },
      {
        label: 'Unified WatchGuard',
        data: getCategoryBreakdown(unified, 'unified'),
        backgroundColor: '#002663',
        borderColor: '#002663',
        borderWidth: 1
      }
    ]
  };

  const config = {
    type: 'bar',
    data: data,
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          display: true,
          position: 'top'
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return context.dataset.label + ': ' + formatCurrency(context.parsed.y);
            }
          }
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          grace: '5%',  // Add 5% padding to top
          ticks: {
            maxTicksLimit: 6,  // Limit number of ticks to avoid duplication
            callback: function(value) {
              if (value === 0) return '$0';
              return '$' + (value / 1000).toFixed(0) + 'K';
            }
          }
        }
      }
    }
  };

  if (comparisonChart) {
    comparisonChart.destroy();
  }

  comparisonChart = new Chart(canvas, config);
}

/**
 * Get cost breakdown by category for chart
 */
function getCategoryBreakdown(state, type) {
  const categories = ['network', 'endpoint', 'identity', 'services'];
  const breakdown = [0, 0, 0, 0];
  const endpoints = AppState.mspProfile.endpoints;

  if (type === 'current') {
    // Current stack - sum actual tool costs
    categories.forEach((category, index) => {
      const cat = AppState.categories[category];
      if (!cat.enabled) return;

      let categoryTotal = 0;
      cat.tools.forEach(tool => {
        categoryTotal += tool.annualCost || 0;
      });

      breakdown[index] = categoryTotal;
    });
  } else {
    // Unified WatchGuard - calculate mapped product costs
    categories.forEach((category, index) => {
      const cat = AppState.categories[category];
      if (!cat.enabled) return;

      let categoryTotal = 0;
      cat.tools.forEach(tool => {
        if (tool.annualCost > 0 && tool.vendor) {
          const mapping = findProductMapping(tool.vendor, category);
          console.log(`🔍 Looking for mapping: vendor="${tool.vendor}", category="${category}", found:`, mapping);
          if (mapping) {
            if (mapping.wg_price_monthly) {
              categoryTotal += mapping.wg_price_monthly * 12;
            } else if (mapping.wg_price_per_endpoint) {
              categoryTotal += mapping.wg_price_per_endpoint * endpoints * 12;
            } else if (mapping.wg_price_per_user) {
              categoryTotal += mapping.wg_price_per_user * endpoints * 12;
            }
          } else {
            console.warn(`⚠️ No mapping found for vendor="${tool.vendor}" in category="${category}"`);
          }
        }
      });

      breakdown[index] = categoryTotal;
    });
  }

  console.log(`Chart breakdown (${type}):`, breakdown);
  return breakdown;
}

// ============================================================================
// LocalStorage Persistence
// ============================================================================

const STORAGE_KEY = 'profitstack_draft';

function saveToLocalStorage() {
  try {
    const data = {
      mspProfile: AppState.mspProfile,
      categories: AppState.categories,
      toolCounter: AppState.toolCounter,
      savedAt: new Date().toISOString()
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    console.log('💾 Draft saved to localStorage');
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
  }
}

function loadFromLocalStorage() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return;

    const data = JSON.parse(saved);

    // Restore MSP profile
    if (data.mspProfile) {
      AppState.mspProfile = data.mspProfile;
      if (DOM.mspName) DOM.mspName.value = data.mspProfile.name || '';
      if (DOM.region) DOM.region.value = data.mspProfile.region || '';
      if (DOM.numEndpoints) DOM.numEndpoints.value = data.mspProfile.endpoints || '';
      if (DOM.numClients) DOM.numClients.value = data.mspProfile.clients || '';
      if (DOM.laborRate) DOM.laborRate.value = data.mspProfile.laborRate || 85;
    }

    // Restore categories and tools
    if (data.categories) {
      // Clear existing tools first
      Object.keys(AppState.categories).forEach(category => {
        AppState.categories[category].tools = [];
        const container = document.getElementById(`${category}-tools`);
        if (container) container.innerHTML = '';
      });

      AppState.toolCounter = data.toolCounter || 0;

      // Restore tools
      Object.keys(data.categories).forEach(category => {
        const savedCat = data.categories[category];
        AppState.categories[category].enabled = savedCat.enabled;

        savedCat.tools.forEach(tool => {
          AppState.categories[category].tools.push(tool);
          renderTool(category, tool);
        });
      });
    }

    console.log('📂 Draft loaded from localStorage');
    updateAllToolCounts();
    calculate();
  } catch (err) {
    console.error('Failed to load from localStorage:', err);
  }
}

function clearLocalStorage() {
  localStorage.removeItem(STORAGE_KEY);
  console.log('🗑️ Draft cleared from localStorage');
}

// ============================================================================
// PDF Generation
// ============================================================================

function generatePDF() {
  if (!AppState.lastCalculation) {
    alert('Please complete the calculator first.');
    return;
  }

  alert('PDF generation will be implemented in Week 5 using jsPDF. For now, you can print this page (Ctrl+P / Cmd+P) to save as PDF.');

  // TODO: Implement jsPDF generation
  // See ROI calculator script.js for reference (lines 530-926)
}

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format number as currency
 */
function formatCurrency(num) {
  if (num < 0) {
    return '-$' + Math.abs(num).toLocaleString(undefined, { maximumFractionDigits: 0 });
  }
  return '$' + num.toLocaleString(undefined, { maximumFractionDigits: 0 });
}

/**
 * Debounce function to limit calculation frequency
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Start new audit (clear all data)
 */
function startNewAudit() {
  if (!confirm('Are you sure you want to start a new audit? All current data will be lost.')) {
    return;
  }

  // Clear state
  AppState.mspProfile = { name: '', region: '', endpoints: 0, clients: 0, laborRate: 85 };
  AppState.toolCounter = 0;

  Object.keys(AppState.categories).forEach(category => {
    AppState.categories[category].enabled = true;
    AppState.categories[category].tools = [];
  });

  AppState.lastCalculation = null;

  // Clear DOM
  if (DOM.mspName) DOM.mspName.value = '';
  if (DOM.region) DOM.region.value = '';
  if (DOM.numEndpoints) DOM.numEndpoints.value = '';
  if (DOM.numClients) DOM.numClients.value = '';
  if (DOM.laborRate) DOM.laborRate.value = 85;

  Object.keys(AppState.categories).forEach(category => {
    const container = document.getElementById(`${category}-tools`);
    if (container) container.innerHTML = '';
  });

  clearLocalStorage();
  initializeCategories();
  updateAllToolCounts();
  showPlaceholder();

  console.log('🔄 New audit started');
}

// ============================================================================
// Export for testing/debugging
// ============================================================================

window.ProfitStackApp = {
  AppState,
  calculate,
  saveToLocalStorage,
  loadFromLocalStorage,
  formatCurrency
};

console.log('📊 ProfitStack Calculator loaded. Access via window.ProfitStackApp');

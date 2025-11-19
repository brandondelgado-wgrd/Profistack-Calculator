/**
 * WatchGuard ProfitStack Calculator - Product Mappings & Pricing
 *
 * ⚠️ PLACEHOLDER PRICING - REQUIRES FINANCE VALIDATION
 *
 * This file contains mappings from competitor products to WatchGuard equivalents
 * with ESTIMATED pricing. These values are placeholders and MUST be validated
 * with Finance team before production use.
 *
 * Required from Finance:
 * - Partner buy prices (Gold tier, USD)
 * - Top 10 competitors per category
 * - Validation that calculations show positive savings
 */

// ============================================================================
// PRODUCT MAPPINGS: Competitor → WatchGuard
// ============================================================================

const PRODUCT_MAPPINGS = {
  network: {
    // Firewalls
    'fortinet': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,  // PLACEHOLDER: $650/year ÷ 12
      description: 'Entry-level firewall for small deployments'
    },
    'fortigate': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,
      description: 'Entry-level firewall for small deployments'
    },
    'sophos xg': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,
      description: 'Entry-level firewall for small deployments'
    },
    'palo alto': {
      wg_product: 'Firebox T85',
      wg_sku: 'WGT85',
      wg_price_monthly: 100.00,  // PLACEHOLDER: $1200/year ÷ 12
      description: 'Mid-range firewall for larger deployments'
    },
    'cisco asa': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,
      description: 'Entry-level firewall for small deployments'
    },
    'checkpoint': {
      wg_product: 'Firebox T85',
      wg_sku: 'WGT85',
      wg_price_monthly: 100.00,
      description: 'Mid-range firewall for larger deployments'
    },
    'sonicwall': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,
      description: 'Entry-level firewall for small deployments'
    },
    'meraki': {
      wg_product: 'Firebox T45',
      wg_sku: 'WGT45',
      wg_price_monthly: 54.16,
      description: 'Entry-level firewall for small deployments'
    }
  },

  endpoint: {
    // Endpoint Protection/Detection
    'sophos intercept x': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 3.00,  // PLACEHOLDER: per endpoint per month (~40% cheaper than competitors)
      description: 'Endpoint Protection, Detection & Response'
    },
    'crowdstrike': {
      wg_product: 'EPDR + MDR',
      wg_sku: 'EPDR-MDR',
      wg_price_per_endpoint: 8.00,  // PLACEHOLDER: includes MDR (reduced from 12.50)
      description: 'EPDR with managed detection and response'
    },
    'sentinelone': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 3.00,
      description: 'Endpoint Protection, Detection & Response'
    },
    'carbon black': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'cylance': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'microsoft defender': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'trend micro': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'kaspersky': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'mcafee': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    },
    'eset': {
      wg_product: 'EPDR',
      wg_sku: 'EPDR-STD',
      wg_price_per_endpoint: 4.50,
      description: 'Endpoint Protection, Detection & Response'
    }
  },

  identity: {
    // MFA / SSO / Identity
    'duo': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 1.50,  // PLACEHOLDER: per user per month (~30% cheaper)
      description: 'Multi-factor authentication'
    },
    'okta': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 1.50,
      description: 'Multi-factor authentication'
    },
    'microsoft mfa': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 1.50,
      description: 'Multi-factor authentication'
    },
    'azure ad': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 2.00,
      description: 'Multi-factor authentication'
    },
    'pingidentity': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 2.00,
      description: 'Multi-factor authentication'
    },
    'rsa': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 2.00,
      description: 'Multi-factor authentication'
    },
    'lastpass': {
      wg_product: 'AuthPoint',
      wg_sku: 'AP-STD',
      wg_price_per_user: 2.00,
      description: 'Multi-factor authentication'
    }
  },

  services: {
    // MDR / MNDR
    'huntress': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 6.00,  // PLACEHOLDER: per endpoint per month (~30% cheaper)
      description: 'Managed Detection & Response'
    },
    'arctic wolf': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 6.00,
      description: 'Managed Detection & Response'
    },
    'red canary': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 6.00,
      description: 'Managed Detection & Response'
    },
    'expel': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 8.00,
      description: 'Managed Detection & Response'
    },
    'rapid7': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 8.00,
      description: 'Managed Detection & Response'
    },
    'crowdstrike falcon complete': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 8.00,
      description: 'Managed Detection & Response'
    },
    'deepwatch': {
      wg_product: 'WatchGuard MDR',
      wg_sku: 'MDR-STD',
      wg_price_per_endpoint: 8.00,
      description: 'Managed Detection & Response'
    }
  }
};

// ============================================================================
// COMPETITOR SUGGESTIONS (Autocomplete)
// ============================================================================

const COMPETITOR_SUGGESTIONS = {
  network: [
    'FortiGate',
    'Fortinet',
    'Sophos XG',
    'Palo Alto',
    'Cisco ASA',
    'Check Point',
    'SonicWall',
    'Meraki',
    'pfSense',
    'Ubiquiti'
  ],
  endpoint: [
    'Sophos Intercept X',
    'CrowdStrike',
    'SentinelOne',
    'Carbon Black',
    'Cylance',
    'Microsoft Defender',
    'Trend Micro',
    'Kaspersky',
    'McAfee',
    'ESET'
  ],
  identity: [
    'Duo',
    'Okta',
    'Microsoft MFA',
    'Azure AD',
    'PingIdentity',
    'RSA',
    'LastPass',
    'OneLogin',
    'Auth0',
    'Google Authenticator'
  ],
  services: [
    'Huntress',
    'Arctic Wolf',
    'Red Canary',
    'Expel',
    'Rapid7',
    'CrowdStrike Falcon Complete',
    'Deepwatch',
    'Binary Defense',
    'eSentire',
    'Secureworks'
  ]
};

// ============================================================================
// WATCHGUARD PRODUCT CATALOG
// ============================================================================

const WATCHGUARD_PRODUCTS = {
  // Network Security
  'Firebox T45': {
    sku: 'WGT45',
    category: 'network',
    price_monthly: 54.16,  // PLACEHOLDER
    description: 'Entry-level firewall for small deployments (up to 500 Mbps)'
  },
  'Firebox T85': {
    sku: 'WGT85',
    category: 'network',
    price_monthly: 100.00,  // PLACEHOLDER
    description: 'Mid-range firewall for medium deployments (up to 1.5 Gbps)'
  },

  // Endpoint Security
  'EPDR': {
    sku: 'EPDR-STD',
    category: 'endpoint',
    price_per_endpoint: 3.00,  // PLACEHOLDER (~40% cheaper than competitors)
    description: 'Endpoint Protection, Detection & Response'
  },
  'EPDR + MDR': {
    sku: 'EPDR-MDR',
    category: 'endpoint',
    price_per_endpoint: 8.00,  // PLACEHOLDER (reduced from 12.50)
    description: 'EPDR with managed detection and response'
  },

  // Identity & Access
  'AuthPoint': {
    sku: 'AP-STD',
    category: 'identity',
    price_per_user: 1.50,  // PLACEHOLDER (~30% cheaper)
    description: 'Multi-factor authentication'
  },

  // Managed Services
  'WatchGuard MDR': {
    sku: 'MDR-STD',
    category: 'services',
    price_per_endpoint: 6.00,  // PLACEHOLDER (~30% cheaper)
    description: 'Managed Detection & Response'
  },

  // Additional Services
  'DNSWatch': {
    sku: 'DNS-STD',
    category: 'network',
    price_per_user: 0.50,  // PLACEHOLDER
    description: 'DNS-level threat protection'
  }
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Fuzzy match competitor name to product mapping
 * @param {string} input - User input (vendor/product name)
 * @param {string} category - Category (network, endpoint, identity, services)
 * @returns {Object|null} - Matched product mapping or null
 */
function findProductMapping(input, category) {
  if (!input || !category) return null;

  const normalized = input.toLowerCase().trim();
  const categoryMappings = PRODUCT_MAPPINGS[category];

  if (!categoryMappings) return null;

  // Direct match
  if (categoryMappings[normalized]) {
    return categoryMappings[normalized];
  }

  // Remove spaces for better fuzzy matching (e.g., "Check Point" → "checkpoint")
  const normalizedNoSpaces = normalized.replace(/\s+/g, '');

  // Fuzzy match (partial string matching)
  for (const [key, value] of Object.entries(categoryMappings)) {
    const keyNoSpaces = key.replace(/\s+/g, '');

    // Check with original strings
    if (normalized.includes(key) || key.includes(normalized)) {
      return value;
    }

    // Check with spaces removed
    if (normalizedNoSpaces.includes(keyNoSpaces) || keyNoSpaces.includes(normalizedNoSpaces)) {
      return value;
    }
  }

  return null;
}

/**
 * Get suggested WatchGuard product for a competitor tool
 * @param {string} competitorName - Competitor product name
 * @param {string} category - Category
 * @returns {Object} - { product, sku, price, description }
 */
function getSuggestedWGProduct(competitorName, category) {
  const mapping = findProductMapping(competitorName, category);

  if (mapping) {
    return {
      product: mapping.wg_product,
      sku: mapping.wg_sku,
      price: mapping.wg_price_monthly || mapping.wg_price_per_endpoint || mapping.wg_price_per_user || 0,
      priceType: mapping.wg_price_monthly ? 'monthly' :
                 (mapping.wg_price_per_endpoint ? 'per_endpoint' : 'per_user'),
      description: mapping.description
    };
  }

  // Default fallback
  return null;
}

/**
 * Calculate WatchGuard annual cost for a category
 * @param {string} category - Category name
 * @param {number} endpoints - Number of endpoints/users
 * @returns {number} - Annual cost in USD
 */
function calculateWGCategoryCost(category, endpoints) {
  // This will be implemented in calculator.js with actual tool mappings
  // Placeholder for reference
  return 0;
}

// ============================================================================
// EFFICIENCY ASSUMPTIONS
// ============================================================================

const EFFICIENCY_FACTORS = {
  // Labor reduction from unified platform
  labor_reduction: 0.30,  // 30% reduction in management time

  // Average hours per month per tool category (before consolidation)
  default_hours_per_tool: 2,

  // Vendor consolidation benefits
  training_cost_per_vendor: 500,  // Annual training cost per vendor
  portal_switching_time_hours: 1  // Hours per month lost to context switching
};

// ============================================================================
// VALIDATION WARNINGS
// ============================================================================

const PRICING_WARNING = `
⚠️ PLACEHOLDER PRICING IN USE ⚠️

The prices in this calculator are ESTIMATES and have NOT been validated
by the Finance team. Before using this tool with customers:

1. Obtain partner buy prices (Gold tier, USD) from Finance
2. Validate top 10 competitor mappings per category
3. Confirm calculations show realistic positive savings
4. Update this file with actual pricing

Contact: Finance Team / Product Marketing
Status: AWAITING VALIDATION
Last Updated: ${new Date().toISOString().split('T')[0]}
`;

console.warn(PRICING_WARNING);

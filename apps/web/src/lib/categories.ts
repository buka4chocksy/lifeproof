/**
 * The 11 inventory categories (FR-INV-001) are a static frontend scaffold until
 * `GET /v1/vault/categories` lands in E04. They are not API data (design §9.1).
 */
export interface VaultCategory {
  id: string;
  label: string;
  description: string;
}

export const vaultCategories: readonly VaultCategory[] = [
  {
    id: 'documents',
    label: 'Documents',
    description: 'Wills, IDs, and powers of attorney',
  },
  {
    id: 'banking',
    label: 'Banking',
    description: 'Current and savings accounts',
  },
  {
    id: 'insurance',
    label: 'Insurance',
    description: 'Life, health, home, and travel policies',
  },
  {
    id: 'property',
    label: 'Property',
    description: 'Deeds, mortgages, and rentals',
  },
  {
    id: 'investments',
    label: 'Investments',
    description: 'Stocks, funds, and holdings',
  },
  {
    id: 'pension',
    label: 'Pension',
    description: 'Workplace and private pensions',
  },
  {
    id: 'tax',
    label: 'Tax',
    description: 'Returns, records, and deadlines',
  },
  {
    id: 'business',
    label: 'Business',
    description: 'Company documents and access',
  },
  {
    id: 'subscriptions',
    label: 'Subscriptions',
    description: 'Services, logins, and cancellations',
  },
  {
    id: 'crypto',
    label: 'Crypto',
    description: 'Exchange and custody account pointers — never seed phrases or private keys',
  },
  {
    id: 'custom',
    label: 'Custom',
    description: 'Anything else that matters',
  },
] as const;

export function comingSoonMessage(label: string): string {
  return `Adding ${label} items is available in the next milestone.`;
}

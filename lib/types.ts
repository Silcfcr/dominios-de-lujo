export interface Domain {
  category: string;
  domain: string;
  country: string;
  description: string;
  targeted_audience?: string;
  use_cases: string;
  flagship: string;
  include_in_categories: string;
  affiliate_marketing?: string;
  one_pager?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface DomainsData {
  total_domains: number;
  domains: Domain[];
}

export interface CategoriesData {
  total_categories: number;
  categories: Category[];
}

export interface FlagshipData {
  total_flagships: number;
  domains: Domain[];
}

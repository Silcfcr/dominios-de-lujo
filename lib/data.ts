import type { DomainsData, CategoriesData, FlagshipData, Domain } from './types';

const BASE =
  typeof window !== 'undefined'
    ? ''
    : process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

async function fetchJSON<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, { next: { revalidate: 3600 } });
  if (!res.ok) throw new Error(`Failed to fetch ${path}: ${res.status}`);
  return res.json() as Promise<T>;
}

export async function getCategories(): Promise<CategoriesData> {
  return fetchJSON<CategoriesData>('/data/categories.json');
}

export async function getDomains(): Promise<DomainsData> {
  return fetchJSON<DomainsData>('/data/domains.json');
}

export async function getFlagship(): Promise<FlagshipData> {
  return fetchJSON<FlagshipData>('/data/flagship.json');
}

export async function getSearchIndex(): Promise<string[]> {
  return fetchJSON<string[]>('/data/search-index.json');
}

export async function getDomainsByCategory(categoryName: string): Promise<Domain[]> {
  const data = await getDomains();
  return data.domains.filter(
    (d) => d.category.toLowerCase() === categoryName.toLowerCase()
  );
}

export async function getDomainByName(domainName: string): Promise<Domain | undefined> {
  const data = await getDomains();
  return data.domains.find(
    (d) => d.domain.toLowerCase() === domainName.toLowerCase()
  );
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function unslugify(slug: string): string {
  return slug.replace(/-/g, ' ');
}

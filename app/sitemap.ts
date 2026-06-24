import type { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import type { DomainsData } from '@/lib/types';

export const dynamic = 'force-static';

const BASE = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://dominiosdelujo.com';

export default function sitemap(): MetadataRoute.Sitemap {
  const domainsFile = path.join(process.cwd(), 'public', 'data', 'domains.json');
  const domainsData: DomainsData = JSON.parse(fs.readFileSync(domainsFile, 'utf8'));

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE}/dominios`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${BASE}/brands`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE}/colaborar`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/lujototal`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE}/privacidad`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const domainRoutes: MetadataRoute.Sitemap = domainsData.domains.map((d) => ({
    url: `${BASE}/dominios/${encodeURIComponent(d.domain)}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...domainRoutes];
}

import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import type { DomainsData } from '@/lib/types';
import DomainDetailClient from './DomainDetailClient';

function loadDomains(): DomainsData {
  const filePath = path.join(process.cwd(), 'public', 'data', 'domains.json');
  return JSON.parse(fs.readFileSync(filePath, 'utf8')) as DomainsData;
}

export async function generateStaticParams() {
  const data = loadDomains();
  return data.domains.map((d) => ({ domain: encodeURIComponent(d.domain) }));
}

export default async function DomainDetailPage({
  params,
}: {
  params: Promise<{ domain: string }>;
}) {
  const { domain: domainParam } = await params;
  const domainName = decodeURIComponent(domainParam);

  const data = loadDomains();
  const domain = data.domains.find(
    (d) => d.domain.toLowerCase() === domainName.toLowerCase()
  );

  if (!domain) {
    notFound();
  }

  return <DomainDetailClient domain={domain} />;
}

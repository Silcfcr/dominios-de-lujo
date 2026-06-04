import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import HomeSectionLink from '@/components/home/HomeSectionLink';
import ServicesGrid from '@/components/home/ServicesGrid';
import PartnerValue from '@/components/home/PartnerValue';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      <HomeSectionLink labelKey="home.manifestoLink" href="/nosotros#manifiesto" />
      <ServicesGrid />
      <PartnerValue />
      <HomeSectionLink labelKey="home.lujototalLink" href="/nosotros#lujototal" />
      <CollaborateTeaser />
    </>
  );
}

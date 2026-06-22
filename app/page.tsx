import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
// import HomeSectionLink from '@/components/home/HomeSectionLink';
// import ServicesGrid from '@/components/home/ServicesGrid';
// import BrandsGrid from '@/components/home/BrandsGrid';
import PorQueNosotros from '@/components/home/PorQueNosotros';
import AffiliateEditorial from '@/components/home/AffiliateEditorial';
import ConfianzaCredibilidad from '@/components/home/ConfianzaCredibilidad';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      {/* <HomeSectionLink labelKey="home.lujototalLink" href="/lujototal" imageSrc="/images/lujo-total.webp" imageAlt="LujoTotal™" /> */}
      {/* <ServicesGrid /> */}
      {/* <BrandsGrid /> */}
      <PorQueNosotros />
      <AffiliateEditorial />
      <ConfianzaCredibilidad />
      <CollaborateTeaser />
      {/* <HomeSectionLink labelKey="home.manifestoLink" href="/nosotros#manifiesto" /> */}
    </>
  );
}

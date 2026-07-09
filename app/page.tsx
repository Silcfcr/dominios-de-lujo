import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import PorQueNosotros from '@/components/home/PorQueNosotros';
import AffiliateEditorial from '@/components/home/AffiliateEditorial';
import ConfianzaCredibilidad from '@/components/home/ConfianzaCredibilidad';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';
// import OurBrands from '@/components/home/OurBrands';
export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <CategoryTeaser />
      <PorQueNosotros />
      <AffiliateEditorial />
      <ConfianzaCredibilidad />
      {/* <OurBrands /> */}
      <CollaborateTeaser />
    </>
  );
}

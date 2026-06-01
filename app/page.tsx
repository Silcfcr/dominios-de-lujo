import Hero from '@/components/home/Hero';
import Ticker from '@/components/home/Ticker';
import BrandStrip from '@/components/home/BrandStrip';
import CategoryTeaser from '@/components/home/CategoryTeaser';
import Manifesto from '@/components/home/Manifesto';
import ServicesGrid from '@/components/home/ServicesGrid';
import PartnerValue from '@/components/home/PartnerValue';
import LujoTotal from '@/components/home/LujoTotal';
import PaginasSpotlight from '@/components/home/PaginasSpotlight';
import CollaborateTeaser from '@/components/home/CollaborateTeaser';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Ticker />
      <BrandStrip />
      <CategoryTeaser />
      <Manifesto />
      <ServicesGrid />
      <PartnerValue />
      <LujoTotal />
      <PaginasSpotlight />
      <CollaborateTeaser />
    </>
  );
}

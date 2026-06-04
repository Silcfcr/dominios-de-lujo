import MissionVision from '@/components/about/MissionVision';
import AboutSubNav from '@/components/about/AboutSubNav';

export const metadata = {
  title: 'Quiénes somos | Dominios de Lujo',
  description: 'La misión y visión de Dominios de Lujo — la mayor red editorial de lujo en español.',
};

export default function NosotrosPage() {
  return (
    <>
      <AboutSubNav />
      <MissionVision />
    </>
  );
}

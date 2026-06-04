import MissionVision from '@/components/about/MissionVision';
import Manifesto from '@/components/home/Manifesto';
import LujoTotal from '@/components/home/LujoTotal';

export const metadata = {
  title: 'Quiénes somos | Dominios de Lujo',
  description: 'La misión y visión de Dominios de Lujo — la mayor red editorial de lujo en español.',
};

export default function NosotrosPage() {
  return (
    <main>
      <section id="nosotros">
        <MissionVision />
      </section>
      <section id="manifiesto">
        <Manifesto />
      </section>
      <section id="lujototal">
        <LujoTotal />
      </section>
    </main>
  );
}

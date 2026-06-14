import LujoTotal from '@/components/home/LujoTotal';
import LujoTotalDetail from '@/components/home/LujoTotalDetail';

export const metadata = {
  title: 'LujoTotal™ | Dominios de Lujo',
  description: 'Designación editorial de confianza que identifica marcas y negocios que demuestran autenticidad, transparencia e integridad en el mercado de lujo hispanohablante.',
};

export default function LujoTotalPage() {
  return (
    <main>
      <LujoTotal />
      <LujoTotalDetail />
    </main>
  );
}

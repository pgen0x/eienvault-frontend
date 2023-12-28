import '@/app/globals.css';
// import { Inter } from 'next/font/google';
import { NavbarAdmin, SidebarAdmin } from '@/components/navbar/admin';
import 'react-slideshow-image/dist/styles.css';
import 'react-toastify/dist/ReactToastify.min.css';
import 'swiper/css';
import 'swiper/css/autoplay';

// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'EienVault - The forefront of the digital revolution in the art world',
  description:
    'EienVault - The forefront of the digital revolution in the art world',
};

export default function AdminLayout({ children }) {
  return (
    <div className="flex justify-between gap-5">
      <NavbarAdmin />
      <SidebarAdmin />
      <section className="m-5 mt-20 block w-full overflow-x-hidden">
        {children}
      </section>
    </div>
  );
}

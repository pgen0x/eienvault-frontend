import Footer from '@/components/footer/main';
import Create from './create';
import { notFound } from 'next/navigation';

export default async function Page() {
  let dataChain = [];

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
      {
        cache: 'force-cache',
      },
    );

    if (!res.ok) {
      throw new Error('Network response was not ok');
    }

    dataChain = await res.json();

    // Continue with your code
  } catch (error) {
    console.error('Fetch failed:', error);
    // Handle the error gracefully, e.g., show an error message to the user
  }

  if (dataChain.length <= 0) {
    notFound();
  }

  return (
    <>
      <div className="container m-auto mb-5">
        <section>
          <Create chains={dataChain} />
        </section>
      </div>
      <Footer />
    </>
  );
}

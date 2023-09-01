import Footer from '../../../components/footer/main';
import Create from './create';

const accounts = ['0x30756...Fb179', '0x30756...Zi57G', '0x30756...Gy352'];

export default async function Page() {
  let data = [];
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

    data = await res.json();

    // Continue with your code
  } catch (error) {
    console.error('Fetch failed:', error);
    // Handle the error gracefully, e.g., show an error message to the user
  }
  return (
    <>
      <div className="container m-auto mb-5">
        <section>
          <Create chains={data} blockchains={accounts} />
        </section>
      </div>
      <Footer />
    </>
  );
}

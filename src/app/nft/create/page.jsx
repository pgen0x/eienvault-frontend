import Footer from '../../../components/footer/main';
import Create from './create';

const accounts = ['0x30756...Fb179', '0x30756...Zi57G', '0x30756...Gy352'];

export default async function Page() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/chain/getall`,
    {
      cache: 'no-store',
    },
  );
  const data = await res.json();
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

import { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: '메이키원',
  };
}

export default function RootPage() {
  return (
    <div>
      <h1>&nbsp;</h1>
    </div>
  );
}

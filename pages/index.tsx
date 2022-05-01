import type { NextPage } from "next";
import Head from 'next/head'

const Home: NextPage = () => {
  return (
    <div className="bg-gray-900 flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Rob Schwitzer - Home</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

    </div>
  );
};

export default Home;

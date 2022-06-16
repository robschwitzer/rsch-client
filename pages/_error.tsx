import React from "react";
import Image from "next/image";
import Link from "next/link";

import Layout, { InnerContainer } from "components/Layout";

const img = require("/public/memoji-error.png");

function ErrorPage() {
  return (
    <Layout>
      <InnerContainer>
        <div className="flex flex-col my-12 gap-20">
          <h1 className="text-6xl text-center text-slate-900 dark:text-slate-100 drop-shadow-lg">
            Hmm...
          </h1>
          <div className="flex rounded-full m-auto h-64 w-64 justify-center bg-orange-400 dark:bg-slate-700 border-2 border-slate-700 dark:border-red-400">
            <Image
              alt="Error"
              src={img}
              height={200}
              width={150}
              objectFit="contain"
              className="rotate-2 -translate-y-2"
            />
          </div>
          <h3 className="text-3xl text-center text-slate-900 dark:text-slate-100 drop-shadow-lg">
            That page doesn&apos;t exist.
          </h3>
          <Link href="/resume">
            <a className="text-center text-xl text-slate-900 dark:text-slate-100 underline drop-shadow-lg">
              Go Back
            </a>
          </Link>
        </div>
      </InnerContainer>
    </Layout>
  );
}

export default ErrorPage;

import React from "react";
import Image from "next/image";
import Link from "next/link";
import Footer from "components/Footer";

import type {
  IStrapiApplication,
  IStrapiResume,
  IStrapiLetter,
} from "types/strapi";

export interface ILetterProps {
  company: IStrapiApplication["attributes"]["company"];
  letter: IStrapiLetter;
  publishedAt: string;
  resume: IStrapiResume["attributes"] & {
    icon: IStrapiResume["attributes"]["icon"]["data"]["attributes"];
  };
}

function Letter({ publishedAt, company, letter, resume }: ILetterProps) {
  const publishedDate = new Date(publishedAt);

  const date = `${publishedDate.toLocaleString("default", {
    month: "long",
  })} ${publishedDate.toLocaleString("default", {
    day: "numeric",
  })}, ${publishedDate.getFullYear()}`;

  if (!letter || !company) return null;

  return (
    <div className="md:mt-6 w-full">
      <>
        <div className={styles.baseLetterHeader}>
          <p className={`${styles.baseText} whitespace-pre-wrap`}>
            {letter.from}
          </p>
          <Link href="/resume" passHref>
            <Image
              className="hover:scale-105 hover:rotate-2 transition-all cursor-pointer"
              alt={resume.icon.alternativeText}
              src={resume.icon.url}
              height={140}
              width={140}
              objectFit="contain"
            />
          </Link>
        </div>

        <p className={`${styles.baseText} my-8`}>{date}</p>

        <div className={styles.baseLetterHeader}>
          <p className={`${styles.baseText} whitespace-pre-wrap`}>
            {letter.to}
          </p>
            <a className="flex -rotate-2 rounded-md overflow-hidden hover:scale-105 hover:rotate-0 transition-all" href={company.url} target="blank" rel="noreferrer noopener">
              <Image
                alt={company.logo.data.attributes.alternativeText}
                src={company.logo.data.attributes.url}
                height={120}
                width={120}
                objectFit="contain"
              />
            </a>
        </div>
      </>

      <p className={`${styles.baseText} my-12 whitespace-pre-line`}>
        {letter.body}
      </p>
      <Footer />
    </div>
  );
}

export default Letter;

const styles: { [key: string]: string } = {
  baseText: `text-xl text-slate-50 antialiased`,
  baseLetterHeader: `flex flex-row justify-between items-center`,
};
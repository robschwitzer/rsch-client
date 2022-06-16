import React from "react";
import Image from "next/image";
import Link from "next/link";
import Markdown from "react-markdown";
import Loading from "./Loading";
import Footer from "components/Footer";
import components from "components/Markdown";

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
  const loading = !letter || !company;
  const publishedDate = new Date(publishedAt);

  const date = `${publishedDate.toLocaleString("default", {
    month: "long",
  })} ${publishedDate.toLocaleString("default", {
    day: "numeric",
  })}, ${publishedDate.getFullYear()}`;

  return (
    <div className="md:mt-6">
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className={styles.baseLetterHeader}>
            <Markdown components={components} className={`${styles.baseText} whitespace-pre-wrap`}>
              {letter.from}
            </Markdown>
            <Link href="/resume" passHref>
              <div className="h-24 w-24 rounded-full bg-slate-300 dark:bg-sky-900 border-2 border-rose-400">
                <Image
                  className="hover:scale-105 hover:rotate-2 transition-all -translate-x-1 cursor-pointer"
                  alt={resume.icon.alternativeText}
                  src={resume.icon.url}
                  height={140}
                  width={140}
                  objectFit="contain"
                />
              </div>
            </Link>
          </div>

          <p className={`${styles.baseText} my-8`}>{date}</p>

          <div className={styles.baseLetterHeader}>
            <Markdown components={components} className={`${styles.baseText} whitespace-pre-wrap`}>
              {letter.to}
            </Markdown>
            <a
              className="flex -rotate-2 rounded-md overflow-hidden hover:scale-105 hover:rotate-0 transition-all"
              href={company.url}
              rel="noreferrer noopener"
              target="blank"
            >
              <Image
                alt={company.logo.data.attributes.alternativeText}
                src={company.logo.data.attributes.url}
                height={120}
                width={120}
                objectFit="contain"
              />
            </a>
          </div>
          <Markdown components={components} className={`${styles.baseText} my-12 whitespace-pre-line`}>
            {letter.body}
          </Markdown>
          <Footer />
        </>
      )}
    </div>
  );
}

export default Letter;

const styles: { [key: string]: string } = {
  baseText: `text-xl text-slate-900 dark:text-slate-50`,
  baseLetterHeader: `flex flex-row justify-between items-center`,
};

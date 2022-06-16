import { useEffect } from "react";
import Head from "next/head";

import Layout, { InnerContainer } from "components/Layout";
import Letter, { ILetterProps } from "components/Letter";
import { fetchAPI, getStrapiProperty } from "strapi";
import { event } from "lib/analytics";
import { getStaticPaths as _getStaticPaths } from "./hello";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { IStrapiApplication, IStrapiResume } from "types/strapi";

function Thanks(props: ILetterProps) {
  useEffect(() => {
    if (props.company?.name) {
      /* GA */
      event({
        action: '+page_view',
        params: {
          page: `${props.company.name} Follow Up`
        }
      })
    }
  }, [props.company.name]);

  return (
    <Layout>      
      <Head>
        <title>Rob Schwitzer Follow Up</title>
      </Head>
      <InnerContainer>
        <Letter {...props} />
      </InnerContainer>
    </Layout>
  );
}

export default Thanks;

/**
 *
 *
 *
 * DATA
 *
 *
 *
 */

/* same paths as hello page */
export const getStaticPaths: GetStaticPaths = _getStaticPaths;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const [{ data: resume }, { data: letter }] = await Promise.all([
    fetchAPI<{ data: IStrapiResume }>("/resume", {
      populate: {
        information: "*",
        metadata: {
          populate: "*",
        },
        icon: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiApplication[] }>(`/applications`, {
      filters: {
        company: {
          name: {
            $containsi: params?.company,
          },
        },
      },
      populate: {
        company: {
          populate: "*",
        },
        coverletter: {
          populate: "*",
        },
      },
    }),
  ]);

  // @ts-ignore might be extending strapi base incorrectly...
  const publishedAt = letter[0].attributes.publishedAt;

  return {
    props: {
      resume: {
        ...getStrapiProperty(resume),
        icon: getStrapiProperty(getStrapiProperty(resume, "icon").data),
        metadata: {
          ...getStrapiProperty(resume, "metadata")[0],
          image: getStrapiProperty(resume, "metadata")[0].image,
        },
      },
      company: letter[0].attributes.company,
      letter: letter[0].attributes.followup ?? null,
      publishedAt,
    },
    revalidate: 1000,
  };
};

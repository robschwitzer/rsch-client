import React from "react";

import Layout, { InnerContainer } from "components/Layout";
import Letter, { ILetterProps } from "components/Letter";
import { fetchAPI, getStrapiProperty } from "strapi";

import type { GetStaticPaths, GetStaticProps } from "next";
import type { IStrapiApplication, IStrapiResume } from "types/strapi";

function Hello(props: ILetterProps) {
  return (
    <Layout>
      <InnerContainer>
        <Letter {...props} />
      </InnerContainer>
    </Layout>
  );
}

export default Hello;

/**
 *
 *
 *
 * DATA
 *
 *
 *
 */

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchAPI<{ data: IStrapiApplication[] }>(
    "/applications",
    {
      populate: {
        company: {
          name: "*",
        },
      },
    }
  );

  const paths = data.map((item) => {
    return {
      params: { company: item.attributes.company.name },
    };
  });

  return {
    paths,
    fallback: true,
  };
};

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

  if (!letter) {
    return {
      notFound: true
    }
  }

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
      letter: letter[0].attributes.coverletter,
      publishedAt,
    },
    revalidate: 1000,
  };
};

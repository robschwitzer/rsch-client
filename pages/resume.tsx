import { fetchAPI, getStrapiProperty } from "strapi";

import type { GetStaticProps } from "next";
import type { IStrapiCMS, IStrapiFramework, IStrapiJob } from "types/strapi";

// TODO: these types are going to give you grief due to the Logo munging that you do in getStaticProps
interface Props {
  cms: IStrapiCMS["attributes"]["CMS"][];
  config: any; // TODO
  frameworks: IStrapiFramework["attributes"]["Skill"][];
  jobs: IStrapiJob["attributes"][];
  resume: any; // TODO
}

function Resume({ cms, config, frameworks, jobs, resume }: Props) {
  return <div></div>;
}

export default Resume;

export const getStaticProps: GetStaticProps = async () => {
  const [
    { data: cms },
    { data: config },
    { data: frameworks },
    { data: jobs },
    { data: resume },
  ] = await Promise.all([
    fetchAPI<{ data: IStrapiCMS[] }>("/cmss", {
      populate: {
        CMS: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: any }>("/site-config", {
      populate: "*",
    }),
    fetchAPI<{ data: IStrapiFramework[] }>("/frameworks", {
      populate: {
        Skill: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiJob[] }>("/jobs", {
      populate: {
        Company: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: any }>("/resume", {
      populate: "*",
    }),
  ]);

  return {
    props: {
      config: getStrapiProperty(config),
      resume: getStrapiProperty(resume),
      cms: cms.map((item: any) => {
        const cms = getStrapiProperty(item, "CMS");
        cms["Logo"] = getStrapiProperty(cms["Logo"].data);
        return cms;
      }),
      frameworks: frameworks.map((item) => {
        const framework = getStrapiProperty(item, "Skill");
        framework["Logo"] = getStrapiProperty(framework["Logo"].data);
        return framework;
      }),
      jobs: jobs.map((item) => {
        const job = getStrapiProperty(item);
        job["Company"]["Logo"] = getStrapiProperty(job["Company"]["Logo"].data);
        return job;
      }),
    },
  };
};

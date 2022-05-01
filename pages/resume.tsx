import Head from "next/head";
import { fetchAPI, getStrapiProperty } from "strapi";

import Contact from "components/Resume/Contact";
import Bio from "components/Resume/Bio";
import Section from "components/Resume/Section";

import type { GetStaticProps } from "next";
import type {
  IStrapiCMS,
  IStrapiJob,
  IStrapiMedia,
  IStrapiResume,
  IStrapiSkill,
  IStrapiSocial,
} from "types/strapi";
import Job from "components/Resume/Job";

// TODO: these types are going to give you grief due to the Logo munging that you do in getStaticProps
interface Props {
  jobs: IStrapiJob["attributes"][];
  resume: IStrapiResume["attributes"] & {
    icon: IStrapiResume["attributes"]["icon"]["data"]["attributes"];
  };
  skills: {
    cms: IStrapiCMS["attributes"]["cms"][];
    frameworks: IStrapiSkill["attributes"]["skill"][];
    languages: IStrapiSkill["attributes"]["skill"][];
  };
  socials: (IStrapiSocial["attributes"] & {
    icon: IStrapiMedia["attributes"];
  })[];
}

function Resume({ jobs, resume, skills, socials }: Props) {  
  const { cms, frameworks, languages } = skills;
  const { bio, icon, information, metadata } = resume;

  const jobsList = jobs
    .sort((a, b) => {
      return new Date(a.startDate) < new Date(b.startDate)
        ? 1
        : new Date(a.startDate) > new Date(b.startDate)
        ? -1
        : 0;
    })
    .map((job, i) => <Job key={job.id} job={job as any} isLast={i === jobs.length - 1} />);

  return (
    <div className="bg-slate-900 flex flex-col items-center min-h-screen py-10 px-4">
      <Head>
        <title>{metadata[0].title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-screen-md">
        <Contact icon={icon} information={information} socials={socials} />
        <Bio bio={bio} />
        <Section title={"Experience"}>{jobsList}</Section>
      </div>
    </div>
  );
}

export default Resume;

/**
 *
 *
 *
 * DATA
 *
 *
 *
 */

export const getStaticProps: GetStaticProps = async () => {
  const [
    { data: cms },
    { data: frameworks },
    { data: jobs },
    { data: languages },
    { data: resume },
    { data: socials },
  ] = await Promise.all([
    fetchAPI<{ data: IStrapiCMS[] }>("/cmss", {
      populate: {
        cms: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiSkill[] }>("/frameworks", {
      populate: {
        skill: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiJob[] }>("/jobs", {
      populate: {
        company: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiJob[] }>("/languages", {
      populate: {
        skill: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiResume }>("/resume", {
      populate: "*",
    }),
    fetchAPI<{ data: IStrapiSocial[] }>("/socials", {
      populate: "*",
    }),
  ]);

  const skills = {
    cms: cms.map((item) => {
      const cms = getStrapiProperty(item, "cms");
      cms["logo"] = getStrapiProperty(cms["logo"].data);
      return cms;
    }),
    frameworks: frameworks.map((item) => {
      const framework = getStrapiProperty(item, "skill");
      framework["logo"] = getStrapiProperty(framework["logo"].data);
      return framework;
    }),
    languages: languages.map((item) => {
      const framework = getStrapiProperty(item, "skill");
      framework["logo"] = getStrapiProperty(framework["logo"].data);
      return framework;
    }),
  };

  return {
    props: {
      jobs: jobs.map((item) => {
        const job = getStrapiProperty(item);
        job["company"]["logo"] = getStrapiProperty(job["company"]["logo"].data);
        job.id = item.id;
        return job;
      }),
      resume: {
        ...getStrapiProperty(resume),
        icon: getStrapiProperty(getStrapiProperty(resume, "icon").data),
      },
      skills,
      socials: socials.map((item) => {
        const social = getStrapiProperty(item);
        social["icon"] = getStrapiProperty(social["icon"].data);
        return social;
      }),
    },
  };
};

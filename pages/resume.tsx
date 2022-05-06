import Head from "next/head";
import { fetchAPI, getStrapiProperty } from "strapi";

import Contact from "components/Resume/Contact";
import Blurb from "components/Resume/Blurb";
import Section from "components/Resume/Section";
import SkillSection from "components/Resume/SkillSection";
import Job from "components/Resume/Job";
import Interest from "components/Resume/Interest";
import TimelineItem from "components/Resume/TimelineItem";
import Footer from "components/Footer";

import type { GetStaticProps } from "next";
import type {
  IStrapiCMS,
  IStrapiInterest,
  IStrapiJob,
  IStrapiMedia,
  IStrapiResume,
  IStrapiSchool,
  IStrapiSkill,
  IStrapiSocial,
} from "types/strapi";

interface Props {
  education: IStrapiSchool["attributes"]["school"][];
  interests: IStrapiInterest["attributes"][];
  jobs: IStrapiJob["attributes"][];
  resume: IStrapiResume["attributes"] & {
    icon: IStrapiResume["attributes"]["icon"]["data"]["attributes"];
  };
  skills: {
    cms: IStrapiCMS["attributes"]["cms"][];
    databases: IStrapiSkill["attributes"]["skill"][];
    frameworks: IStrapiSkill["attributes"]["skill"][];
    languages: IStrapiSkill["attributes"]["skill"][];
  };
  socials: (IStrapiSocial["attributes"] & {
    icon: IStrapiMedia["attributes"];
  })[];
}

function Resume({
  education,
  interests,
  jobs,
  resume,
  skills,
  socials,
}: Props) {
  const { blurb1, blurb2, icon, information, metadata } = resume;
  const { cms, databases, frameworks, languages } = skills;

  const jobsList = jobs
    .sort((a, b) => {
      return new Date(a.startDate) < new Date(b.startDate)
        ? 1
        : new Date(a.startDate) > new Date(b.startDate)
        ? -1
        : 0;
    })
    .map((job, i) => (
      <Job key={job.id} job={job as any} isLast={i === jobs.length - 1} />
    ));

  const skillsList = [
    ["Languages", languages],
    ["Databases", databases],
    ["Frameworks", frameworks],
    ["CMS", cms],
  ].map(([category, skills], i) => (
    <SkillSection
      key={category as string}
      skills={skills as IStrapiSkill[]}
      title={category as string}
    />
  ));

  const educationList = education
    .sort((a, b) =>
      new Date(a.endDate ?? new Date()) < new Date(b.endDate ?? new Date())
        ? 1
        : -1
    )
    .map((school, i) => (
      <TimelineItem
        key={school.id}
        date={`${
          school.endDate
            ? new Date(school.endDate).getFullYear()
            : "Currently Enrolled"
        } - ${school.achievement}`}
        description={school.description}
        image={school.logo}
        isLast={i === education.length - 1}
        title={school.name}
        url={school.url}
      />
    ));

  const interestsList = interests.map(({ icon, name }) => (
    <Interest key={name} icon={icon} title={name} />
  ));

  return (
    <div
      className={`bg-slate-900 flex flex-col items-center min-h-screen pt-10 px-4`}
    >
      <Head>
        <title>{metadata.title}</title>
        <meta property={`og:title`} content={metadata.title} />
        <meta property={`og:description`} content={metadata.description} />
        <meta
          property={`og:image`}
          content={metadata.image.data.attributes.url}
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="w-full max-w-screen-md">
        <Contact icon={icon} information={information} socials={socials} />
        
        <Section className="my-12">
          <Blurb blurb={blurb1} />
        </Section>

        <Section title={"Experience"}>{jobsList}</Section>

        <Section title={"Skills"}>
          <div className="masonry md:masonry-md mb-8">{skillsList}</div>
        </Section>

        <Section title={"Education"}>{educationList}</Section>

        <Section>
          {blurb2 && <Blurb blurb={blurb2} />}
        </Section>

        <Section title={"Interests"}>
          <div className="flex flex-row flex-wrap w-5/6">{interestsList}</div>
        </Section>
        <Footer />
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
    { data: databases },
    { data: education },
    { data: frameworks },
    { data: interests },
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
    fetchAPI<{ data: IStrapiSkill[] }>("/databases", {
      populate: {
        database: {
          populate: "*",
        },
      },
    }),
    fetchAPI<{ data: IStrapiJob[] }>("/schools", {
      populate: {
        school: {
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
    fetchAPI<{ data: IStrapiInterest[] }>("/interests", {
      populate: "*",
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
    fetchAPI<{ data: IStrapiSocial[] }>("/socials", {
      populate: "*",
    }),
  ]);

  return {
    props: {
      education: education.map((item) => {
        const school = getStrapiProperty(item, "school");
        school["logo"] = getStrapiProperty(school["logo"].data);
        school.id = item.id;
        return school;
      }),
      interests: interests.map((item) => getStrapiProperty(item)),
      jobs: jobs.map((item) => {
        const job = getStrapiProperty(item);
        job["company"]["logo"] = getStrapiProperty(job["company"]["logo"].data);
        job.id = item.id;
        return job;
      }),
      resume: {
        ...getStrapiProperty(resume),
        icon: getStrapiProperty(getStrapiProperty(resume, "icon").data),
        metadata: {
          ...getStrapiProperty(resume, "metadata")[0],
          image: getStrapiProperty(resume, "metadata")[0].image,
        },
      },
      skills: {
        cms: cms.map((item) => {
          const cms = getStrapiProperty(item, "cms");
          cms["logo"] = getStrapiProperty(cms["logo"].data);
          return cms;
        }),
        databases: databases.map((item) => {
          const database = getStrapiProperty(item, "database");
          database["logo"] = getStrapiProperty(database["logo"].data);
          return database;
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
      },
      socials: socials.map((item) => {
        const social = getStrapiProperty(item);
        social["icon"] = getStrapiProperty(social["icon"].data);
        return social;
      }),
    },
    revalidate: 60,
  };
};

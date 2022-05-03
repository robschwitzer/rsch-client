import Head from "next/head";
import Image from "next/image";
import { fetchAPI, getStrapiProperty } from "strapi";

import Contact from "components/Resume/Contact";
import Bio from "components/Resume/Bio";
import Section from "components/Resume/Section";
import SkillSection from "components/Resume/SkillSection";
import Job from "components/Resume/Job";
import Interest from "components/Resume/Interest";
import TimelineItem from "components/Resume/TimelineItem";

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
  const { bio, icon, information, metadata } = resume;
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

  const educationList = education.map((school, i) => (
    <TimelineItem
      key={school.id}
      date={`${
        school.endDate
          ? new Date(school.endDate).getFullYear()
          : "Currently Enrolled"
      }`}
      description={school.achievement}
      image={school.logo}
      isLast={i === education.length - 1}
      title={school.name}
      url=""
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
        <meta property={`og:image`} content={metadata.image.data.attributes.url} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="w-full max-w-screen-md">
        <Contact icon={icon} information={information} socials={socials} />
        <Bio bio={bio} />
        <Section title={"Experience"}>{jobsList}</Section>
        <Section title={"Skills"}>
          <div className="masonry md:masonry-md mb-8">{skillsList}</div>
        </Section>
        <Section title={"Education"}>{educationList}</Section>
        <Section title={"Interests"}>
          <div className="flex flex-row flex-wrap w-5/6">{interestsList}</div>
        </Section>

        <footer className="flex flex-col">
          <span className={`w-full h-px bg-slate-800 shadow-md mt-12 mb-20`} />
          <p className={`text-sky-50 text-lg text-center antialiased`}>
            Made with ❤️ using{" "}
            <a href={"https://nextjs.org/"} className="underline">
              NextJS
            </a>
            ,{" "}
            <a href={"https://tailwindcss.com/"} className="underline">
              Tailwind
            </a>
            , and{" "}
            <a href={"https://strapi.io/"} className="underline">
              Strapi
            </a>
            .
            <br />
            Icons from{" "}
            <a href={"https://icon-icons.com/"} className="underline">
              Icons-Icons
            </a>
            .
            <br />
          </p>
          <p className={`flex justify-center text-sky-50 text-lg text-center antialiased`}>
              Check out the code on Github{" "}
              <a href="https://github.com/robschwitzer/rsch-client">
                {/* eslint-disable-next-line */}
                <img
                  alt="Github"
                  src="https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165490/thumbnail_github_f09fb8187e.png"
                  className="h-8 w-8 ml-2"
                />
              </a>
            </p>
          <div className="flex justify-center">
            <Image
              alt="byeee"
              src={`https://res.cloudinary.com/dnayvt2gf/image/upload/v1651537870/memoji-bye_eeferd.png`}
              height={200}
              width={200}
            />
          </div>
        </footer>
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
          populate: "*"
        },
        icon: {
          populate: "*"
        }
      }
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
          image: getStrapiProperty(resume, "metadata")[0].image
        }
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
    revalidate: 60
  };
};
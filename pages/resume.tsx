import Head from "next/head";
import { fetchAPI, getStrapiProperty } from "strapi";

import Layout, { InnerContainer } from "components/Layout";
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
    <Layout>
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

      <InnerContainer>
        <Contact icon={icon} information={information} socials={socials} />

        <Section className="my-0">
          <Blurb blurb={blurb1} />
        </Section>

        <Section className="my-12 print:mb-0" title={"Experience"}>
          {jobsList}
        </Section>

        <Section className="my-12 print:mt-2" title={"Skills"}>
          <div className="masonry md:masonry-md mb-8">{skillsList}</div>
        </Section>

        <Section title={"Education"}>{educationList}</Section>

        <Section>{blurb2 && <Blurb blurb={blurb2} />}</Section>

        <Section title={"Interests"}>
          <div className="flex flex-row flex-wrap w-5/6">{interestsList}</div>
        </Section>
        <Footer />
      </InnerContainer>
    </Layout>
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
  return {
    props: {
      education: [
        {
          id: 2,
          name: "Lighthouse Labs",
          location: "Vancouver, BC",
          endDate: "2018-07-05",
          achievement: "Web Development Diploma",
          description:
            "In my time in this immersive 12 week program designed to give students the skills to land their first job as a full stack developer, I spent roughly 1200 hours learning JavaScript, Ruby, and SQL, as well as Node, Rails, and React. I completed 4 full-stack projects, and was the only student in my cohort to receive a job offer from the head instructor upon graduating.",
          url: "https://lighthouselabs.ca",
          logo: {
            name: "lighthouselabs.png",
            alternativeText: "Lighthouse Labs Logo",
            caption: "Lighthouse Labs Logo",
            width: 400,
            height: 400,
            formats: {
              thumbnail: {
                ext: ".png",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651159056/thumbnail_lighthouselabs_0cadb577e7.png",
                hash: "thumbnail_lighthouselabs_0cadb577e7",
                mime: "image/png",
                name: "thumbnail_lighthouselabs.png",
                path: null,
                size: 9.94,
                width: 156,
                height: 156,
                provider_metadata: {
                  public_id: "thumbnail_lighthouselabs_0cadb577e7",
                  resource_type: "image",
                },
              },
            },
            hash: "lighthouselabs_0cadb577e7",
            ext: ".png",
            mime: "image/png",
            size: 13.27,
            url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651159055/lighthouselabs_0cadb577e7.png",
            previewUrl: null,
            provider: "cloudinary",
            provider_metadata: {
              public_id: "lighthouselabs_0cadb577e7",
              resource_type: "image",
            },
            createdAt: "2022-04-28T15:17:36.531Z",
            updatedAt: "2022-04-30T21:59:42.127Z",
          },
        },
        {
          id: 3,
          name: "St. Joseph High Scool",
          location: "Vancouver, BC",
          endDate: "2007-06-28",
          achievement: "Diploma ",
          description: "  ",
          url: "https://en.wikipedia.org/wiki/St._Joseph_High_School_(Edmonton)",
          logo: {
            name: "https://media.istockphoto.com/photos/colorful-gradient-background-picture-id1203084163?b=1\u0026k=20\u0026m=1203084163\u0026s=170667a\u0026w=0\u0026h=13m3tFgQc1UhlRFKwExHtbn4xrUWL-9Xw2FBAXonuzY=",
            alternativeText:
              "https://media.istockphoto.com/photos/colorful-gradient-background-picture-id1203084163?b=1\u0026k=20\u0026m=1203084163\u0026s=170667a\u0026w=0\u0026h=13m3tFgQc1UhlRFKwExHtbn4xrUWL-9Xw2FBAXonuzY=",
            caption:
              "https://media.istockphoto.com/photos/colorful-gradient-background-picture-id1203084163?b=1\u0026k=20\u0026m=1203084163\u0026s=170667a\u0026w=0\u0026h=13m3tFgQc1UhlRFKwExHtbn4xrUWL-9Xw2FBAXonuzY=",
            width: 556,
            height: 310,
            formats: {
              small: {
                ext: "",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651613134/small_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36.jpg",
                hash: "small_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
                mime: "image/jpeg",
                name: "small_https://media.istockphoto.com/photos/colorful-gradient-background-picture-id1203084163?b=1\u0026k=20\u0026m=1203084163\u0026s=170667a\u0026w=0\u0026h=13m3tFgQc1UhlRFKwExHtbn4xrUWL-9Xw2FBAXonuzY=",
                path: null,
                size: 4.15,
                width: 500,
                height: 279,
                provider_metadata: {
                  public_id:
                    "small_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
                  resource_type: "image",
                },
              },
              thumbnail: {
                ext: "",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651613134/thumbnail_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36.jpg",
                hash: "thumbnail_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
                mime: "image/jpeg",
                name: "thumbnail_https://media.istockphoto.com/photos/colorful-gradient-background-picture-id1203084163?b=1\u0026k=20\u0026m=1203084163\u0026s=170667a\u0026w=0\u0026h=13m3tFgQc1UhlRFKwExHtbn4xrUWL-9Xw2FBAXonuzY=",
                path: null,
                size: 1.67,
                width: 245,
                height: 137,
                provider_metadata: {
                  public_id:
                    "thumbnail_colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
                  resource_type: "image",
                },
              },
            },
            hash: "colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
            ext: "",
            mime: "image/jpeg",
            size: 27.24,
            url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651613133/colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36.jpg",
            previewUrl: null,
            provider: "cloudinary",
            provider_metadata: {
              public_id:
                "colorful_gradient_background_picture_id1203084163_b_1_and_k_20_and_m_1203084163_and_s_170667a_and_w_0_and_h_13m3t_Fg_Qc1_Uhl_RF_Kw_Ex_Htbn4xr_UWL_9_Xw2_FBA_Xonuz_Y_1780f9eb36",
              resource_type: "image",
            },
            createdAt: "2022-05-03T21:25:34.781Z",
            updatedAt: "2022-05-03T21:25:34.781Z",
          },
        },
      ],
      interests: [
        {
          name: "Entrepreneurship",
          createdAt: "2022-05-01T05:41:23.373Z",
          updatedAt: "2022-05-03T00:06:01.217Z",
          icon: "💡",
        },
        {
          name: "Music",
          createdAt: "2022-05-01T05:41:47.047Z",
          updatedAt: "2022-05-03T00:06:20.306Z",
          icon: "🎸",
        },
        {
          name: "Subculture",
          createdAt: "2022-05-01T05:41:59.570Z",
          updatedAt: "2022-05-03T00:06:41.776Z",
          icon: "👨‍🎤",
        },
        {
          name: "Technology",
          createdAt: "2022-05-01T05:41:38.517Z",
          updatedAt: "2022-05-03T00:09:03.360Z",
          icon: "🤖",
        },
        {
          name: "The Future",
          createdAt: "2022-05-01T05:42:17.401Z",
          updatedAt: "2022-05-03T00:09:15.901Z",
          icon: "🔮",
        },
        {
          name: "The Past",
          createdAt: "2022-05-01T05:42:09.864Z",
          updatedAt: "2022-05-03T00:10:29.059Z",
          icon: "⌛️",
        },
        {
          name: "Travel",
          createdAt: "2022-05-01T05:42:23.700Z",
          updatedAt: "2022-05-03T00:11:18.291Z",
          icon: "🌇",
        },
      ],
      jobs: [
        {
          title: "Newton Crypto - Senior Software Developer",
          description:
            "As a Senior Software Engineer (Front End) at Newton, my role has been centered on delivering key features and driving advancements in our platform. I have taken charge of implementing client-facing features and initiatives aimed at improving the overall development team's experience. This includes collaborating with cross-functional teams, conducting code reviews, and actively participating in the identification and implementation of tools and processes that streamline our development workflow. My focus has been on enhancing code maintainability and fostering a collaborative and innovative environment within the team.",
          startDate: "2022-10-24",
          endDate: null,
          createdAt: "2022-05-01T05:46:07.397Z",
          updatedAt: "2022-05-05T08:14:02.272Z",
          company: {
            id: 8,
            name: "Newton",
            location: "Toronto, ON",
            url: "newton.co",
            logo: {
              name: "newton.png",
              alternativeText: "Newton Logo",
              caption: "Newton Logo",
              width: 400,
              height: 400,
              formats: {
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1663012471/small_newton_f4434b6ba7.png",
                  hash: "small_newton_f4434b6ba7.png",
                  mime: "image/png",
                  name: "thumbnail_sphere.png",
                  path: null,
                  size: 9.12,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "small_newton_f4434b6ba7.png",
                    resource_type: "image",
                  },
                },
              },
              hash: "small_newton_f4434b6ba7.png",
              ext: ".png",
              mime: "image/png",
              size: 12.08,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1663012471/small_newton_f4434b6ba7.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "small_newton_f4434b6ba7.png",
                resource_type: "image",
              },
              createdAt: "2022-04-28T17:09:09.555Z",
              updatedAt: "2022-04-30T21:59:26.326Z",
            },
          },
          id: 10,
        },
        {
          title: "Sphere - Lead Developer",
          description:
            "In this role, I spearheaded the interviewing and hiring processes, providing guidance to developers to foster their professional growth. Concurrently, I played a central role in the development and maintenance of numerous React, React Native, and Next.js codebases, incorporating GraphQL and REST APIs. My involvement extended to setting up and overseeing sprints, engaging in project planning and management, and collaborating with designers to align the product with specifications. A significant aspect of my role was being the sole manager for releases of the company's flagship product on the App Store and Play Store. Additionally, I managed the extraction and analysis of analytics data from both platforms, contributing valuable insights for the customer success teams.",
          startDate: "2018-09-01",
          endDate: "2022-09-01",
          createdAt: "2022-05-01T05:46:07.397Z",
          updatedAt: "2022-05-05T08:14:02.272Z",
          company: {
            id: 8,
            name: "Sphere",
            location: "Vancouver, BC",
            url: "https://sphere.guide",
            logo: {
              name: "sphere.png",
              alternativeText: "Sphere Logo",
              caption: "Sphere Logo",
              width: 400,
              height: 400,
              formats: {
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165749/thumbnail_sphere_de07a4461d.png",
                  hash: "thumbnail_sphere_de07a4461d",
                  mime: "image/png",
                  name: "thumbnail_sphere.png",
                  path: null,
                  size: 9.12,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_sphere_de07a4461d",
                    resource_type: "image",
                  },
                },
              },
              hash: "sphere_de07a4461d",
              ext: ".png",
              mime: "image/png",
              size: 12.08,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165748/sphere_de07a4461d.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "sphere_de07a4461d",
                resource_type: "image",
              },
              createdAt: "2022-04-28T17:09:09.555Z",
              updatedAt: "2022-04-30T21:59:26.326Z",
            },
          },
          id: 8,
        },
        {
          title: "Lighthouse Labs - Web Development Mentor",
          description:
            "In this position, I regularly met with students from diverse backgrounds throughout the week, guiding them through challenges encountered in the 12-week full-stack development bootcamp. My goal was to provide a clearer grasp of JavaScript, simplify the complexities of React, and offer valuable insights as they entered the software industry. Witnessing the evolution of students—from grappling with fundamental JavaScript concepts to showcasing their fully developed applications at the program's conclusion—proved to be an immensely rewarding experience.",
          startDate: "2020-10-05",
          endDate: "2022-10-01",
          createdAt: "2022-05-01T05:47:20.617Z",
          updatedAt: "2022-06-16T02:23:07.541Z",
          company: {
            id: 9,
            name: "Lighthouse Labs",
            location: "Vancouver, BC",
            url: "https://www.lighthouselabs.ca/",
            logo: {
              name: "lighthouselabs.png",
              alternativeText: "Lighthouse Labs Logo",
              caption: "Lighthouse Labs Logo",
              width: 400,
              height: 400,
              formats: {
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651159056/thumbnail_lighthouselabs_0cadb577e7.png",
                  hash: "thumbnail_lighthouselabs_0cadb577e7",
                  mime: "image/png",
                  name: "thumbnail_lighthouselabs.png",
                  path: null,
                  size: 9.94,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_lighthouselabs_0cadb577e7",
                    resource_type: "image",
                  },
                },
              },
              hash: "lighthouselabs_0cadb577e7",
              ext: ".png",
              mime: "image/png",
              size: 13.27,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651159055/lighthouselabs_0cadb577e7.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "lighthouselabs_0cadb577e7",
                resource_type: "image",
              },
              createdAt: "2022-04-28T15:17:36.531Z",
              updatedAt: "2022-04-30T21:59:42.127Z",
            },
          },
          id: 9,
        },
      ],
      resume: {
        createdAt: "2022-05-01T06:06:06.986Z",
        updatedAt: "2022-05-06T10:31:24.907Z",
        publishedAt: "2022-05-01T06:06:58.117Z",
        blurb1:
          "As a seasoned front-end engineer, I bring a fluent command of JavaScript and a strong grasp of contemporary frameworks. I take pride in crafting clean, scalable, and maintainable code within project timelines, always eager to explore new technologies aligning with business objectives. Rooted in a background in music, I approach problem-solving with creativity and an out-of-the-box mindset, while adhering to industry best practices. I have experience in hiring and providing guidance to junior developers, as well as contributing on an individual level. Since completing my diploma at Lighthouse Labs in 2018, I've thrived in remote startup environments, although I'm equally comfortable contributing from an office setting — especially if there are snacks.",
        blurb2: "",
        information: {
          id: 2,
          email: "robschwitzer@gmail.com",
          profession: "Software Developer",
          firstname: "Rob",
          lastname: "Schwitzer",
          currentlocation: "Vancouver, BC",
          phonenumber: "1-604-217-7338",
        },
        metadata: {
          id: 3,
          title: "Rob Schwitzer - Resume",
          description:
            "An experienced Front End Engineer working with React, React Native, NextJS and more. Lover of TypeScript, small bundles, good documentation, and great coffee.",
          image: {
            data: {
              id: 35,
              attributes: {
                name: "rschogimg.png",
                alternativeText: "rschogimg.png",
                caption: "rschogimg.png",
                width: 1200,
                height: 630,
                formats: {
                  large: {
                    ext: ".png",
                    url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651616861/large_rschogimg_b93ed7d64e.png",
                    hash: "large_rschogimg_b93ed7d64e",
                    mime: "image/png",
                    name: "large_rschogimg.png",
                    path: null,
                    size: 177.19,
                    width: 1000,
                    height: 525,
                    provider_metadata: {
                      public_id: "large_rschogimg_b93ed7d64e",
                      resource_type: "image",
                    },
                  },
                  small: {
                    ext: ".png",
                    url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651616862/small_rschogimg_b93ed7d64e.png",
                    hash: "small_rschogimg_b93ed7d64e",
                    mime: "image/png",
                    name: "small_rschogimg.png",
                    path: null,
                    size: 64,
                    width: 500,
                    height: 263,
                    provider_metadata: {
                      public_id: "small_rschogimg_b93ed7d64e",
                      resource_type: "image",
                    },
                  },
                  medium: {
                    ext: ".png",
                    url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651616862/medium_rschogimg_b93ed7d64e.png",
                    hash: "medium_rschogimg_b93ed7d64e",
                    mime: "image/png",
                    name: "medium_rschogimg.png",
                    path: null,
                    size: 113.56,
                    width: 750,
                    height: 394,
                    provider_metadata: {
                      public_id: "medium_rschogimg_b93ed7d64e",
                      resource_type: "image",
                    },
                  },
                  thumbnail: {
                    ext: ".png",
                    url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651616861/thumbnail_rschogimg_b93ed7d64e.png",
                    hash: "thumbnail_rschogimg_b93ed7d64e",
                    mime: "image/png",
                    name: "thumbnail_rschogimg.png",
                    path: null,
                    size: 24.46,
                    width: 245,
                    height: 129,
                    provider_metadata: {
                      public_id: "thumbnail_rschogimg_b93ed7d64e",
                      resource_type: "image",
                    },
                  },
                },
                hash: "rschogimg_b93ed7d64e",
                ext: ".png",
                mime: "image/png",
                size: 125.26,
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651616860/rschogimg_b93ed7d64e.png",
                previewUrl: null,
                provider: "cloudinary",
                provider_metadata: {
                  public_id: "rschogimg_b93ed7d64e",
                  resource_type: "image",
                },
                createdAt: "2022-05-03T22:27:42.981Z",
                updatedAt: "2022-05-03T22:27:42.981Z",
              },
            },
          },
        },
        icon: {
          name: "memoji-wink.png",
          alternativeText: "Rob Schwitzer Memoji",
          caption: "Rob Schwitzer Memoji",
          width: 421,
          height: 421,
          formats: {
            thumbnail: {
              ext: ".png",
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651430754/thumbnail_memoji_wink_f073bbe2f7.png",
              hash: "thumbnail_memoji_wink_f073bbe2f7",
              mime: "image/png",
              name: "thumbnail_memoji-wink.png",
              path: null,
              size: 19.86,
              width: 156,
              height: 156,
              provider_metadata: {
                public_id: "thumbnail_memoji_wink_f073bbe2f7",
                resource_type: "image",
              },
            },
          },
          hash: "memoji_wink_f073bbe2f7",
          ext: ".png",
          mime: "image/png",
          size: 70.29,
          url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651430754/memoji_wink_f073bbe2f7.png",
          previewUrl: null,
          provider: "cloudinary",
          provider_metadata: {
            public_id: "memoji_wink_f073bbe2f7",
            resource_type: "image",
          },
          createdAt: "2022-05-01T18:45:54.936Z",
          updatedAt: "2022-05-01T19:07:17.630Z",
          related: {
            data: [
              {
                id: 2,
                attributes: {
                  __type: "api::resume.resume",
                  createdAt: "2022-05-01T06:06:06.986Z",
                  updatedAt: "2022-05-06T10:31:24.907Z",
                  publishedAt: "2022-05-01T06:06:58.117Z",
                  blurb1:
                    "Fluent in JavaScript and well versed in modern frameworks, I am an experienced front end engineer who takes pride in delivering clean, scalable, and maintainable code on time, while pushing the envelope to explore new technologies to help meet business goals. With a background in music, I take a creative, outside-the-box approach to problem solving, while being dedicated to staying within the bounds of best practices as outlined by documentation. Over the past year, I have expanded my skill set by interviewing and hiring for developer positions, as well as providing guidance and mentorship to junior developers through code reviews and pair programming. Since graduating from Lighthouse Labs in 2018, I have thrived working remotely in a startup environment, but am just as comfortable showing up to an office (as long as there are snacks). ",
                  blurb2: "",
                },
              },
            ],
          },
        },
      },
      skills: {
        cms: [
          {
            id: 32,
            name: "Strapi",
            proficiency: 9,
            logo: {
              name: "strapi.png",
              alternativeText: "Strapi Icon",
              caption: "Strapi Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165306/small_strapi_77fdf74085.png",
                  hash: "small_strapi_77fdf74085",
                  mime: "image/png",
                  name: "small_strapi.png",
                  path: null,
                  size: 27.93,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_strapi_77fdf74085",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165305/thumbnail_strapi_77fdf74085.png",
                  hash: "thumbnail_strapi_77fdf74085",
                  mime: "image/png",
                  name: "thumbnail_strapi.png",
                  path: null,
                  size: 5.81,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_strapi_77fdf74085",
                    resource_type: "image",
                  },
                },
              },
              hash: "strapi_77fdf74085",
              ext: ".png",
              mime: "image/png",
              size: 5.59,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165305/strapi_77fdf74085.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "strapi_77fdf74085",
                resource_type: "image",
              },
              createdAt: "2022-04-28T17:01:47.051Z",
              updatedAt: "2022-04-30T22:00:20.927Z",
            },
          },
          {
            id: 31,
            name: "Sanity",
            proficiency: 8,
            logo: {
              name: "sanityio.png",
              alternativeText: "Sanity Icon",
              caption: "Sanity Icon",
              width: 364,
              height: 364,
              formats: {
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165281/thumbnail_sanityio_c542814e3e.png",
                  hash: "thumbnail_sanityio_c542814e3e",
                  mime: "image/png",
                  name: "thumbnail_sanityio.png",
                  path: null,
                  size: 12.12,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_sanityio_c542814e3e",
                    resource_type: "image",
                  },
                },
              },
              hash: "sanityio_c542814e3e",
              ext: ".png",
              mime: "image/png",
              size: 3.32,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165280/sanityio_c542814e3e.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "sanityio_c542814e3e",
                resource_type: "image",
              },
              createdAt: "2022-04-28T17:01:21.532Z",
              updatedAt: "2022-04-30T22:00:35.210Z",
            },
          },
          {
            id: 19,
            name: "Ghost",
            proficiency: 7,
            logo: {
              name: "ghost.png",
              alternativeText: "Ghost Icon",
              caption: "Ghost Icon",
              width: 364,
              height: 364,
              formats: {
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165237/thumbnail_ghost_071a2b7eba.png",
                  hash: "thumbnail_ghost_071a2b7eba",
                  mime: "image/png",
                  name: "thumbnail_ghost.png",
                  path: null,
                  size: 6.32,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_ghost_071a2b7eba",
                    resource_type: "image",
                  },
                },
              },
              hash: "ghost_071a2b7eba",
              ext: ".png",
              mime: "image/png",
              size: 2.37,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165237/ghost_071a2b7eba.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "ghost_071a2b7eba",
                resource_type: "image",
              },
              createdAt: "2022-04-28T17:00:38.164Z",
              updatedAt: "2022-04-30T22:00:44.751Z",
            },
          },
        ],
        databases: [
          {
            id: 34,
            name: "Firebase",
            proficiency: 7,
            logo: {
              name: "firebase.png",
              alternativeText: "firebase.png",
              caption: "firebase.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651532912/small_firebase_48b512825d.png",
                  hash: "small_firebase_48b512825d",
                  mime: "image/png",
                  name: "small_firebase.png",
                  path: null,
                  size: 46.44,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_firebase_48b512825d",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651532912/thumbnail_firebase_48b512825d.png",
                  hash: "thumbnail_firebase_48b512825d",
                  mime: "image/png",
                  name: "thumbnail_firebase.png",
                  path: null,
                  size: 9.61,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_firebase_48b512825d",
                    resource_type: "image",
                  },
                },
              },
              hash: "firebase_48b512825d",
              ext: ".png",
              mime: "image/png",
              size: 21.99,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651532911/firebase_48b512825d.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "firebase_48b512825d",
                resource_type: "image",
              },
              createdAt: "2022-05-02T23:08:32.826Z",
              updatedAt: "2022-05-02T23:08:32.826Z",
            },
          },
          {
            id: 35,
            name: "MongoDB",
            proficiency: 3,
            logo: {
              name: "mongodb.png",
              alternativeText: "mongodb.png",
              caption: "mongodb.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651533267/small_mongodb_62533e3abb.png",
                  hash: "small_mongodb_62533e3abb",
                  mime: "image/png",
                  name: "small_mongodb.png",
                  path: null,
                  size: 45.38,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_mongodb_62533e3abb",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651533266/thumbnail_mongodb_62533e3abb.png",
                  hash: "thumbnail_mongodb_62533e3abb",
                  mime: "image/png",
                  name: "thumbnail_mongodb.png",
                  path: null,
                  size: 9.73,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_mongodb_62533e3abb",
                    resource_type: "image",
                  },
                },
              },
              hash: "mongodb_62533e3abb",
              ext: ".png",
              mime: "image/png",
              size: 20.07,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651533266/mongodb_62533e3abb.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "mongodb_62533e3abb",
                resource_type: "image",
              },
              createdAt: "2022-05-02T23:14:27.765Z",
              updatedAt: "2022-05-02T23:14:27.765Z",
            },
          },
        ],
        frameworks: [
          {
            id: 20,
            name: "NextJS",
            proficiency: 9,
            logo: {
              name: "nextjs.png",
              alternativeText: "NextJS Icon",
              caption: "NextJS Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110658/small_nextjs_f02a16e3e1.png",
                  hash: "small_nextjs_f02a16e3e1",
                  mime: "image/png",
                  name: "small_nextjs.png",
                  path: null,
                  size: 25.5,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_nextjs_f02a16e3e1",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110658/thumbnail_nextjs_f02a16e3e1.png",
                  hash: "thumbnail_nextjs_f02a16e3e1",
                  mime: "image/png",
                  name: "thumbnail_nextjs.png",
                  path: null,
                  size: 6.13,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_nextjs_f02a16e3e1",
                    resource_type: "image",
                  },
                },
              },
              hash: "nextjs_f02a16e3e1",
              ext: ".png",
              mime: "image/png",
              size: 6.55,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110658/nextjs_f02a16e3e1.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "nextjs_f02a16e3e1",
                resource_type: "image",
              },
              createdAt: "2022-04-28T01:50:59.067Z",
              updatedAt: "2022-04-30T22:02:21.098Z",
            },
          },
          {
            id: 29,
            name: "React",
            proficiency: 9,
            logo: {
              name: "react.png",
              alternativeText: "React Icon",
              caption: "React Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110316/small_react_212b838c2b.png",
                  hash: "small_react_212b838c2b",
                  mime: "image/png",
                  name: "small_react.png",
                  path: null,
                  size: 71.34,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_react_212b838c2b",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110315/thumbnail_react_212b838c2b.png",
                  hash: "thumbnail_react_212b838c2b",
                  mime: "image/png",
                  name: "thumbnail_react.png",
                  path: null,
                  size: 16.25,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_react_212b838c2b",
                    resource_type: "image",
                  },
                },
              },
              hash: "react_212b838c2b",
              ext: ".png",
              mime: "image/png",
              size: 8.51,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110315/react_212b838c2b.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "react_212b838c2b",
                resource_type: "image",
              },
              createdAt: "2022-04-28T01:45:16.503Z",
              updatedAt: "2022-04-30T22:01:49.251Z",
            },
          },
          {
            id: 28,
            name: "React Native",
            proficiency: 7,
            logo: {
              name: "react-1.png",
              alternativeText: "React Native Icon",
              caption: "React Native Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110561/small_react_1_c8711c471b.png",
                  hash: "small_react_1_c8711c471b",
                  mime: "image/png",
                  name: "small_react-1.png",
                  path: null,
                  size: 36.27,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_react_1_c8711c471b",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110561/thumbnail_react_1_c8711c471b.png",
                  hash: "thumbnail_react_1_c8711c471b",
                  mime: "image/png",
                  name: "thumbnail_react-1.png",
                  path: null,
                  size: 8.41,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_react_1_c8711c471b",
                    resource_type: "image",
                  },
                },
              },
              hash: "react_1_c8711c471b",
              ext: ".png",
              mime: "image/png",
              size: 8.86,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651110560/react_1_c8711c471b.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "react_1_c8711c471b",
                resource_type: "image",
              },
              createdAt: "2022-04-28T01:49:22.232Z",
              updatedAt: "2022-04-30T22:02:50.003Z",
            },
          },
          {
            id: 30,
            name: "NodeJS",
            proficiency: 7,
            logo: {
              name: "nodejs.png",
              alternativeText: "nodejs.png",
              caption: "nodejs.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651530467/small_nodejs_62ca4910ce.png",
                  hash: "small_nodejs_62ca4910ce",
                  mime: "image/png",
                  name: "small_nodejs.png",
                  path: null,
                  size: 58.84,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_nodejs_62ca4910ce",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651530467/thumbnail_nodejs_62ca4910ce.png",
                  hash: "thumbnail_nodejs_62ca4910ce",
                  mime: "image/png",
                  name: "thumbnail_nodejs.png",
                  path: null,
                  size: 13.16,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_nodejs_62ca4910ce",
                    resource_type: "image",
                  },
                },
              },
              hash: "nodejs_62ca4910ce",
              ext: ".png",
              mime: "image/png",
              size: 9.54,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651530466/nodejs_62ca4910ce.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "nodejs_62ca4910ce",
                resource_type: "image",
              },
              createdAt: "2022-05-02T22:27:47.787Z",
              updatedAt: "2022-05-02T22:27:47.787Z",
            },
          },
        ],
        languages: [
          {
            id: 21,
            name: "JavaScript",
            proficiency: 9,
            logo: {
              name: "javascript.png",
              alternativeText: "javascript.png",
              caption: "javascript.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529505/small_javascript_7d4fddb43c.png",
                  hash: "small_javascript_7d4fddb43c",
                  mime: "image/png",
                  name: "small_javascript.png",
                  path: null,
                  size: 25.99,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_javascript_7d4fddb43c",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529504/thumbnail_javascript_7d4fddb43c.png",
                  hash: "thumbnail_javascript_7d4fddb43c",
                  mime: "image/png",
                  name: "thumbnail_javascript.png",
                  path: null,
                  size: 5.79,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_javascript_7d4fddb43c",
                    resource_type: "image",
                  },
                },
              },
              hash: "javascript_7d4fddb43c",
              ext: ".png",
              mime: "image/png",
              size: 6.7,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529504/javascript_7d4fddb43c.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "javascript_7d4fddb43c",
                resource_type: "image",
              },
              createdAt: "2022-05-02T22:11:45.610Z",
              updatedAt: "2022-05-02T22:11:45.610Z",
            },
          },
          {
            id: 22,
            name: "TypeScript",
            proficiency: 9,
            logo: {
              name: "typescript.png",
              alternativeText: "typescript.png",
              caption: "typescript.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529582/small_typescript_a315c27b1a.png",
                  hash: "small_typescript_a315c27b1a",
                  mime: "image/png",
                  name: "small_typescript.png",
                  path: null,
                  size: 13.99,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_typescript_a315c27b1a",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529582/thumbnail_typescript_a315c27b1a.png",
                  hash: "thumbnail_typescript_a315c27b1a",
                  mime: "image/png",
                  name: "thumbnail_typescript.png",
                  path: null,
                  size: 3.09,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_typescript_a315c27b1a",
                    resource_type: "image",
                  },
                },
              },
              hash: "typescript_a315c27b1a",
              ext: ".png",
              mime: "image/png",
              size: 6.25,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651529582/typescript_a315c27b1a.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "typescript_a315c27b1a",
                resource_type: "image",
              },
              createdAt: "2022-05-02T22:13:03.159Z",
              updatedAt: "2022-05-02T22:13:03.159Z",
            },
          },
          {
            id: 23,
            name: "HTML",
            proficiency: 9,
            logo: {
              name: "html-5.png",
              alternativeText: "HTML Icon",
              caption: "HTML Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112022/small_html_5_5a1a2f72ed.png",
                  hash: "small_html_5_5a1a2f72ed",
                  mime: "image/png",
                  name: "small_html-5.png",
                  path: null,
                  size: 28.79,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_html_5_5a1a2f72ed",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112022/thumbnail_html_5_5a1a2f72ed.png",
                  hash: "thumbnail_html_5_5a1a2f72ed",
                  mime: "image/png",
                  name: "thumbnail_html-5.png",
                  path: null,
                  size: 7.57,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_html_5_5a1a2f72ed",
                    resource_type: "image",
                  },
                },
              },
              hash: "html_5_5a1a2f72ed",
              ext: ".png",
              mime: "image/png",
              size: 3.85,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112021/html_5_5a1a2f72ed.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "html_5_5a1a2f72ed",
                resource_type: "image",
              },
              createdAt: "2022-04-28T02:13:42.680Z",
              updatedAt: "2022-04-30T22:02:39.361Z",
            },
          },
          {
            id: 24,
            name: "CSS",
            proficiency: 8,
            logo: {
              name: "css-3.png",
              alternativeText: "CSS Icon",
              caption: "CSS Icon",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112045/small_css_3_f25af9215c.png",
                  hash: "small_css_3_f25af9215c",
                  mime: "image/png",
                  name: "small_css-3.png",
                  path: null,
                  size: 31.76,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_css_3_f25af9215c",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112044/thumbnail_css_3_f25af9215c.png",
                  hash: "thumbnail_css_3_f25af9215c",
                  mime: "image/png",
                  name: "thumbnail_css-3.png",
                  path: null,
                  size: 8.34,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_css_3_f25af9215c",
                    resource_type: "image",
                  },
                },
              },
              hash: "css_3_f25af9215c",
              ext: ".png",
              mime: "image/png",
              size: 3.75,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651112044/css_3_f25af9215c.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "css_3_f25af9215c",
                resource_type: "image",
              },
              createdAt: "2022-04-28T02:14:05.456Z",
              updatedAt: "2022-04-30T22:02:29.423Z",
            },
          },
          {
            id: 25,
            name: "GraphQL",
            proficiency: 6,
            logo: {
              name: "graphql.png",
              alternativeText: "graphql.png",
              caption: "graphql.png",
              width: 512,
              height: 512,
              formats: {
                small: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651400272/small_graphql_571bfd705e.png",
                  hash: "small_graphql_571bfd705e",
                  mime: "image/png",
                  name: "small_graphql.png",
                  path: null,
                  size: 50.53,
                  width: 500,
                  height: 500,
                  provider_metadata: {
                    public_id: "small_graphql_571bfd705e",
                    resource_type: "image",
                  },
                },
                thumbnail: {
                  ext: ".png",
                  url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651400271/thumbnail_graphql_571bfd705e.png",
                  hash: "thumbnail_graphql_571bfd705e",
                  mime: "image/png",
                  name: "thumbnail_graphql.png",
                  path: null,
                  size: 10.37,
                  width: 156,
                  height: 156,
                  provider_metadata: {
                    public_id: "thumbnail_graphql_571bfd705e",
                    resource_type: "image",
                  },
                },
              },
              hash: "graphql_571bfd705e",
              ext: ".png",
              mime: "image/png",
              size: 21.35,
              url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651400271/graphql_571bfd705e.png",
              previewUrl: null,
              provider: "cloudinary",
              provider_metadata: {
                public_id: "graphql_571bfd705e",
                resource_type: "image",
              },
              createdAt: "2022-05-01T10:17:52.281Z",
              updatedAt: "2022-05-01T10:17:52.281Z",
            },
          },
        ],
      },
      socials: [
        {
          name: "Github",
          url: "https://github.com/robschwitzer",
          createdAt: "2022-04-28T17:04:55.414Z",
          updatedAt: "2022-05-01T05:56:54.273Z",
          icon: {
            name: "github.png",
            alternativeText: "Github Icon",
            caption: "Github Icon",
            width: 512,
            height: 512,
            formats: {
              small: {
                ext: ".png",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165491/small_github_f09fb8187e.png",
                hash: "small_github_f09fb8187e",
                mime: "image/png",
                name: "small_github.png",
                path: null,
                size: 37.6,
                width: 500,
                height: 500,
                provider_metadata: {
                  public_id: "small_github_f09fb8187e",
                  resource_type: "image",
                },
              },
              thumbnail: {
                ext: ".png",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165490/thumbnail_github_f09fb8187e.png",
                hash: "thumbnail_github_f09fb8187e",
                mime: "image/png",
                name: "thumbnail_github.png",
                path: null,
                size: 9.46,
                width: 156,
                height: 156,
                provider_metadata: {
                  public_id: "thumbnail_github_f09fb8187e",
                  resource_type: "image",
                },
              },
            },
            hash: "github_f09fb8187e",
            ext: ".png",
            mime: "image/png",
            size: 4.97,
            url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165490/github_f09fb8187e.png",
            previewUrl: null,
            provider: "cloudinary",
            provider_metadata: {
              public_id: "github_f09fb8187e",
              resource_type: "image",
            },
            createdAt: "2022-04-28T17:04:52.054Z",
            updatedAt: "2022-04-30T22:00:09.427Z",
          },
        },
        {
          name: "LinkedIn",
          url: "https://www.linkedin.com/in/robschwitzer/",
          createdAt: "2022-04-28T17:05:47.045Z",
          updatedAt: "2022-05-01T05:57:29.330Z",
          icon: {
            name: "linkedin.png",
            alternativeText: "Linkedin Icon",
            caption: "Linkedin Icon",
            width: 512,
            height: 512,
            formats: {
              small: {
                ext: ".png",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165540/small_linkedin_c2fe07a581.png",
                hash: "small_linkedin_c2fe07a581",
                mime: "image/png",
                name: "small_linkedin.png",
                path: null,
                size: 29.81,
                width: 500,
                height: 500,
                provider_metadata: {
                  public_id: "small_linkedin_c2fe07a581",
                  resource_type: "image",
                },
              },
              thumbnail: {
                ext: ".png",
                url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165539/thumbnail_linkedin_c2fe07a581.png",
                hash: "thumbnail_linkedin_c2fe07a581",
                mime: "image/png",
                name: "thumbnail_linkedin.png",
                path: null,
                size: 7.3,
                width: 156,
                height: 156,
                provider_metadata: {
                  public_id: "thumbnail_linkedin_c2fe07a581",
                  resource_type: "image",
                },
              },
            },
            hash: "linkedin_c2fe07a581",
            ext: ".png",
            mime: "image/png",
            size: 4.15,
            url: "https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165539/linkedin_c2fe07a581.png",
            previewUrl: null,
            provider: "cloudinary",
            provider_metadata: {
              public_id: "linkedin_c2fe07a581",
              resource_type: "image",
            },
            createdAt: "2022-04-28T17:05:40.579Z",
            updatedAt: "2022-04-30T21:59:58.180Z",
          },
        },
      ],
    },
  };
};

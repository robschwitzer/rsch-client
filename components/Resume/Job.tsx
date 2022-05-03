import TimelineItem from "./TimelineItem";

import type { IStrapiJob, IStrapiMedia } from "types/strapi";

interface Props {
  job: IStrapiJob["attributes"] & {
    company: {
      logo: IStrapiMedia["attributes"];
    };
  };
  isLast: boolean;
}

function Job({ job, isLast }: Props) {
  const startDate = new Date(job.startDate);
  const formattedStartDate = `${startDate.toLocaleString("default", {
    month: "long",
  })} ${startDate.getFullYear()}`;
  const endDate = job.endDate ? new Date(job.endDate) : null;
  const formattedEndDate = `${
    endDate
      ? `${endDate.toLocaleString("default", {
          month: "long",
        })} ${endDate.getFullYear()}`
      : "Present"
  }`;

  return (
    <TimelineItem
      description={job.description}
      date={`${formattedStartDate} - ${formattedEndDate}`}
      image={job.company.logo}
      isLast={isLast}
      title={job.title}
      url={job.company.url}
    />
  );
}

export default Job;

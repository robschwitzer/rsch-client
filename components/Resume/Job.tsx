import Image from "next/image";
import Link from "next/link";

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
    <section className="flex flex-row w-full p-6 pb-0 pt-0">
      {/* logo & timeline */}
      <div className="flex flex-col items-center">
        <div className="flex flex-shrink-0 rounded-full h-14 w-14 overflow-hidden object-center hover:scale-105 transition-all border-2 border-rose-400">
          <Link passHref href={job.company.url}>
            <a>
              <Image
                alt={job.company.logo.alternativeText}
                src={job.company.logo.url}
                height={56}
                width={56}
              />
            </a>
          </Link>
        </div>
        {!isLast && <span className="w-px bg-rose-400 h-full" />}
      </div>

      {/* info */}
      <div className="w-full h-full ml-4">
        {/* title and dates */}
        <div className="gap-2 text-xl text-sky-50 mr-4">
          <h2 className="text-sm text-slate-500 font-extrabold whitespace-nowrap">{`${formattedStartDate} - ${formattedEndDate}`}</h2>
          <h1 className="mb-4">{job.title}</h1>
        </div>
        <p className="mb-6 text-neutral-100">{job.description}</p>
      </div>
    </section>
  );
}

export default Job;

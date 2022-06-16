import Image from "next/image";
import { event } from "lib/analytics";

import type { IStrapiMedia } from "types/strapi";

interface Props {
  description: string;
  date: string;
  image: IStrapiMedia["attributes"];
  isLast: boolean;
  title: string;
  url: string;
}

function TimelineItem({ description, date, image, isLast, title, url }: Props) {
  function onClick(): void {
    /* GA */
    event({
      action: 'click_timeline_item',
      params: {
        item: title
      }
    })
  }

  return (
    <section className="flex flex-row w-full p-8 pb-0 pt-0">
      {/* logo & timeline */}
      <div className="flex flex-col items-center">
        <div className="flex flex-shrink-0 rounded-full h-14 w-14 overflow-hidden object-center hover:scale-105 transition-all border-2 border-rose-400">
          <a onClick={onClick} href={url}>
            <Image
              alt={image.alternativeText}
              src={image.url}
              height={56}
              width={56}
            />
          </a>
        </div>
        {!isLast && <span className="w-px bg-rose-400 h-full" />}
      </div>

      {/* info */}
      <div className="w-full h-full ml-4">
        {/* title and dates */}
        <div className="gap-2 text-xl text-slate-900 dark:text-sky-50 mr-4">
          <h2 className="text-sm text-slate-500 font-extrabold whitespace-nowrap">
            {date}
          </h2>
          <h1 className="mb-4">{title}</h1>
        </div>
        <p className="mb-6 text-slate-900 dark:text-neutral-100">{description}</p>
      </div>
    </section>
  );
}

export default TimelineItem;

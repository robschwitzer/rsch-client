import Image from "next/image";
import Link from "next/link";

import type { IStrapiMedia, IStrapiResume, IStrapiSocial } from "types/strapi";

interface Props {
  icon: IStrapiResume["attributes"]["icon"]["data"]["attributes"];
  information: IStrapiResume["attributes"]["information"];
  socials: (IStrapiSocial["attributes"] & {
    icon: IStrapiMedia["attributes"];
  })[];
}

function Contact({ icon, information, socials }: Props) {
  const {
    currentlocation,
    email,
    firstname,
    lastname,
    phonenumber,
    profession,
  } = information;

  const socialLinks = socials.map((social) => (
    <Link key={social.url} passHref href={social.url}>
      <a className="hover:scale-105 transition-all">
        <Image
          alt={social.icon.alternativeText}
          src={social.icon.url}
          height={40}
          width={40}
        />
      </a>
    </Link>
  ));

  return (
    <section className="flex flex-row items-center justify-between text-sky-50 md:text-3xl text-lg font-sans gap-12">
      <div className="flex flex-col py-8">
        <div className="flex flex-row gap-2 md:text-5xl text-3xl font-extrabold">
          <h1>{firstname}</h1>
          <h1>{lastname}</h1>
        </div>

        <div className="flex flex-col md:flex-row md:gap-4 my-2 text-slate-500">
          <h1>{profession}</h1>
          <Separator height={6} />
          <h1>{currentlocation}</h1>
        </div>

        <div className="flex flex-col-reverse md:flex-row w-full md:items-center md:justify-evenly gap-2 md:gap-4 md:self-end text-lg font-extrabold">
          <div className="flex gap-4">{socialLinks}</div>
          <a href={`mailto:${email}`}>
            <h3>{email}</h3>
          </a>
          <Separator height={4} />
          <a href={`callto:${phonenumber}`}>
            <h3>{phonenumber}</h3>
          </a>
        </div>
      </div>

      <div className="hover:rotate-2 hover:scale-105 transition-all">
        <Image
          alt={icon.alternativeText}
          height={icon.formats.thumbnail.height}
          objectFit="cover"
          src={icon.url}
          width={icon.formats.thumbnail.width}
        />
      </div>
    </section>
  );
}

function Separator({ height }: { height: number }) {
  return (
    <span
      className={`hidden md:flex w-px h-${height} self-center bg-rose-400`}
    />
  );
}

export default Contact;

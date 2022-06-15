import Image from "next/image";
import { IStrapiSkill } from "types/strapi";

interface Props {
  logo: IStrapiSkill["attributes"]["skill"]["logo"]["data"]["attributes"];
  name: string;
  proficiency: number;
}

function Skill(props: Props) {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex flex-row items-center self-start">
        <Image
          className="flex drop-shadow-2xl rounded-md"
          src={props.logo.formats.thumbnail.url}
          alt={props.logo.alternativeText}
          height={props.logo.formats.thumbnail.height / 5}
          width={props.logo.formats.thumbnail.width / 5}
        />
        <h1
          className={`text-slate-900 dark:text-sky-50 whitespace-nowrap font-bold text-sm md:text-xl ml-2 antialiased`}
        >
          {props.name}
        </h1>
      </div>
      <ProficiencyBar fill={props.proficiency} />
    </div>
  );
}

function ProficiencyBar({ fill }: { fill: number }) {
  return (
    <div className={`w-full h-1 rounded-md bg-slate-900`}>
      <span
        className={`flex h-full rounded bg-rose-400 dark:bg-sky-50 drop-shadow-lg transition-all`}
        style={{ width: `${fill * 10}%` }}
      />
    </div>
  );
}

export default Skill;

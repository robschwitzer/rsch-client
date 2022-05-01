import Image from 'next/image';
import { getStrapiProperty } from 'strapi';
import { IStrapiSkill } from 'types/strapi';

interface Props {
  logo: IStrapiSkill["attributes"]["skill"]["logo"]["data"]["attributes"];
  name: string;
  proficiency: number;
}

function Skill(props: Props) {
  console.log(props);
  
  return (
    <div className="gap-4">
      <p>{props.name}</p>
      <Image 
        alt={props.logo.alternativeText}
        src={props.logo.url}
        height={props.logo.formats.thumbnail.height}
        width={props.logo.formats.thumbnail.width}
      />
    </div>
  );
}

export default Skill;

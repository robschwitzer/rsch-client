import Skill from "./Skill";

interface Props {
  title: string;
  skills: any[];
}

function SkillSection({ title, skills }: Props) {
  return (
    <div
      className={`break-inside dark:bg-slate-800 w-full overflow-hidden rounded-lg p-4 mb-6 shadow-lg border-2 border-slate-700 print:shadow-none`}
    >
      <h1 className={`dark:text-rose-400 text-2xl mb-8 font-bold antialiased`}>
        {title}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:gap-8">
        {skills
          .sort((a, b) => b.proficiency - a.proficiency)
          .map((item) => (
            <Skill
              key={item.id}
              name={item.name}
              logo={item.logo}
              proficiency={item.proficiency}
            />
          ))}
      </div>
    </div>
  );
}

export default SkillSection;

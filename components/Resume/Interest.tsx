interface Props {
  title: string;
  icon: string;
}

function Interest({ icon, title }: Props) {
  return (
    <div className={`flex flex-row items-center`}>
      <div
        className={`items-center text-center rounded-full p-2 m-2 md:m-4 h-12 w-12 bg-slate-400 dark:bg-slate-800 border-2 border-rose-400`}
      >
        <p className="text-2xl">{icon}</p>
      </div>
      <h3 className={`text-slate-900 dark:text-sky-50 text-lg md:text-2xl antialiased hover:rotate-3 transition-all`}>{title}</h3>
    </div>
  );
}

export default Interest;

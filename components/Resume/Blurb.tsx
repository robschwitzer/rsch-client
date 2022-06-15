interface Props {
  blurb: string;
}

function Blurb({ blurb }: Props) {
  return (
    <section className={`dark:bg-slate-800 border-2 border-rose-400 shadow-xl p-4 rounded-lg leading-8 text-slate-900 dark:text-sky-50 text-sm font-sans antialiased`}>
      <p>{blurb}</p>
    </section>
  );
}

export default Blurb;

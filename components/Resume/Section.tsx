interface Props {
  title?: string;
  children: any;
  className?: string
}

function Section({ title, children, className }: Props) {
  return (
    <section className={`${className ?? `my-12`}`}>
      {title && <h1 className={`md:text-5xl text-3xl font-extrabold text-slate-900 dark:text-sky-50 mb-8`}>{title}</h1>}
      {children}
    </section>
  );
}

export default Section;

interface Props {
  title?: string;
  children: any;
  my?: number
}

function Section({ title, children, my }: Props) {
  return (
    <section className={`my-${my ?? 12}`}>
      {title && <h1 className={`md:text-5xl text-3xl font-extrabold text-sky-50 mb-8`}>{title}</h1>}
      {children}
    </section>
  );
}

export default Section;

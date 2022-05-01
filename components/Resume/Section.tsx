interface Props {
  title: string;
  children: any;
}

function Section({ title, children }: Props) {
  return (
    <section className="my-8">
      <h1 className="md:text-5xl text-3xl font-extrabold text-sky-50 mb-8">{title}</h1>
      {children}
    </section>
  );
}

export default Section;

interface Props {
  bio: string;
}

function Bio({ bio }: Props) {
  return (
    <section className={`bg-slate-800 border-2 border-rose-400 shadow-xl my-4 p-4 rounded-lg leading-8 text-sky-50 text-sm font-sans antialiased`}>
      <p>{bio}</p>
    </section>
  );
}

export default Bio;

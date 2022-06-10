import Image from "next/image";

function Footer() {
  return (
    <footer className="flex flex-col">
      <span className={`w-full h-px bg-slate-800 shadow-md mt-12 mb-20`} />
      <p className={`text-sky-50 text-lg text-center antialiased`}>
        Made with ❤️ using{" "}
        <a href={"https://nextjs.org/"} className="underline">
          NextJS
        </a>
        ,{" "}
        <a href={"https://tailwindcss.com/"} className="underline">
          Tailwind
        </a>
        , and{" "}
        <a href={"https://strapi.io/"} className="underline">
          Strapi
        </a>
        .
        <br />
        Icons from{" "}
        <a href={"https://icon-icons.com/"} className="underline">
          Icons-Icons
        </a>
        .
        <br />
      </p>
      <p
        className={`flex justify-center text-sky-50 text-lg text-center items-center antialiased`}
      >
        Check out the code on {" "}
        <a href="https://github.com/robschwitzer/rsch-client">
          {/* eslint-disable-next-line */}
          <img
            alt="Github"
            src="https://res.cloudinary.com/dnayvt2gf/image/upload/v1651165490/thumbnail_github_f09fb8187e.png"
            className="h-8 w-8 ml-2"
          />
        </a>
      </p>
      <div className="flex justify-center">
        <Image
          alt="byeee"
          src={`https://res.cloudinary.com/dnayvt2gf/image/upload/v1651537870/memoji-bye_eeferd.png`}
          height={200}
          width={200}
        />
      </div>
    </footer>
  );
}

export default Footer;

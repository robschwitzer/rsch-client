import React, { useRef } from "react";
import Switch from "./Switch";

import useToggleDarkmode from "lib/useToggleDarkmode";
interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return (
    <div
      className={`bg-slate-200 dark:bg-slate-900 flex flex-col items-center min-h-screen pt-10 px-4 md:px-0`}
    >
      {children}
    </div>
  );
}

export function InnerContainer({ children }: Props) {
  const ref = useRef<HTMLInputElement>(null); 
  const { toggle, isDarkmode } = useToggleDarkmode(ref);

  return (
    <div className="w-full max-w-screen-md">
      <div className="flex flex-row place-content-end items-start mr-2 mb-4 md:mb-0">
        <p className="mr-4 text-xl text-center">{isDarkmode ? "🌙" : "☀️"}</p>
        <Switch switchRef={ref} onClick={toggle} />
      </div>
      {children}
    </div>
  );
}

export default Layout;

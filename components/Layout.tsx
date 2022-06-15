import React from "react";
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
  const { toggle } = useToggleDarkmode();
  return (
    <div className="w-full max-w-screen-md">
      <div className="flex place-content-end h-12 mr-6">
        <Switch onClick={toggle} />
      </div>
      {children}
    </div>
  );
}

export default Layout;

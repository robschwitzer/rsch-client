import React from "react";
import Darkmode from "./Darkmode";

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
  return (
    <div className="w-full max-w-screen-md">
      <Darkmode />
      {children}
    </div>
  );
}

export default Layout;

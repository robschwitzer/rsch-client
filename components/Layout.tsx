import React from "react";

interface Props {
  children: any;
}

function Layout({ children }: Props) {
  return (
    <div
      className={`bg-slate-900 flex flex-col items-center min-h-screen pt-10 px-4`}
    >
      {children}
    </div>
  );
}

export function InnerContainer({ children }: Props) {
  return (
    <div className="w-full max-w-screen-md">
      {children}
    </div>
  );
}

export default Layout;

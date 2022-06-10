import React from "react";
import ContentLoader from "react-content-loader";

function Loading() {
  return (
    <div className="md:mt-6 w-full">
      <ContentLoader height={"93vh"} width="100vw">
        {loader1()}
        <rect x="0" y="185" rx="4" ry="4" width="300" height="20" />
        {loader2()}
      </ContentLoader>
    </div>
  );
}

export default Loading;

const loader1 = () =>
  [300, 250, 275, 290].map((width, i) => (
    <rect
      key={width}
      rx="4"
      ry="4"
      x="0"
      y={0 + 30 * i}
      width={width}
      height="20"
    />
  ));

const loader2 = () =>
  [270, 295, 220, 200].map((width, i) => (
    <rect
      key={width}
      rx="4"
      ry="4"
      x="0"
      y={270 + 30 * i}
      width={width}
      height="20"
    />
  ));

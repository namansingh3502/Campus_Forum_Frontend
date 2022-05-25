import background from "../../images/bg.jpeg";
import React from "react";

const detailsLoading = () => {
  return (
    <div className="w-full rounded-lg h-32">
      <img
        src={background}
        className="w-full h-full rounded-t-lg"
        alt={"user"}
      />
      <div className={"relative flex justify-center h-16"}>
        <div
          className={
            "absolute h-28 w-28 -top-full bg-slate-500 rounded-full outline outline-offset-2 outline-2 outline-gray-400"
          }
        >
          <div className={"h-28 w-28 bg-gray-900 rounded-full animate-pulse"} />
        </div>
      </div>
      <div className="p-4">
        <div className="relative w-full font-sans ">
          <h2 className="bg-gray-400 animate-pulse h-8 w-1/4 mb-2"></h2>
          <h1 className="w-1/2 mb-4 h-4 animate-pulse bg-gray-500"></h1>
          <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
        </div>
      </div>
    </div>
  );
};
export default detailsLoading;

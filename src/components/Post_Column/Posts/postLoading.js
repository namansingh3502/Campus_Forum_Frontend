import React from "react";

export default function PostLoading() {
  return (
    <div className={"pt-2"}>
      <div
        className={
          "h-full p-4 bg-slate-500 bg-opacity-20 rounded-lg overflow-hidden"
        }
      >
        <div className={"flex items-center h-20 w-full"}>
          <div className={"h-16 w-20"}>
            <div
              className={
                "h-16 w-16 bg-gray-500 rounded-full animate-pulse items-stretch"
              }
            />
          </div>
          <div className={"w-full ml-2 space-y-2"}>
            <div
              className={"leading-relaxed w-1/2 h-4 animate-pulse bg-gray-400"}
            />
            <div
              className={"leading-relaxed w-1/3 h-4 animate-pulse bg-gray-400"}
            />
          </div>
        </div>

        <div className="my-2">
          <h2 className="bg-gray-400 animate-pulse h-4 w-1/4 mb-2"></h2>
          <h1 className="w-1/2 mb-4 h-4 animate-pulse bg-gray-500"></h1>
          <p className="leading-relaxed mb-3 w-full h-3 animate-pulse bg-gray-400"></p>
          <p className="leading-relaxed mb-3 w-2/3 h-3 animate-pulse bg-gray-400"></p>
          <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
        </div>
      </div>
    </div>
  );
}

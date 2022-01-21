import React from "react";
import background from "../../images/bg.jpeg";

export default function PageProfile() {

  return (
    <div className={"bg-gray-400 rounded-2xl bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto"}>
      <div className="w-full rounded-lg h-40">
        <img
          src={background}
          className="w-full h-full rounded-t-2xl"
          alt={"user"}
        />
      </div>
      <div className="p-4">
        <div className="relative w-full font-sans ">
          <h1 className={"text-3xl font-extrabold text-amber-50"}>Channel Name </h1>
          <h1 className={"mt-2 text-amber-50"}>Admin:  Admin name </h1>
          <h1 className={"mt-1 text-amber-50"}>Total members:  Member Count </h1>
        </div>
      </div>
    </div>
  )
}
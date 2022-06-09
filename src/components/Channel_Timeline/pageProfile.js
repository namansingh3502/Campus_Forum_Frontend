import React from "react";
import background from "../../images/bg.jpeg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import FetchData from "../../api/fetchData";

export default function PageProfile() {
  let { name } = useParams();
  const { data, status } = useQuery(
    [`channel-profile : ${name}`, `/api/forum/channel/${name}/profile`],
    FetchData
  );

  return (
    <div className={"bg-slate-500 bg-opacity-20 rounded-lg text-white h-auto"}>
      <div className={"w-full rounded-lg h-40"}>
        <img
          src={background}
          className={"w-full h-full rounded-t-lg"}
          alt={"user"}
        />
      </div>
      {status === "loading" && (
        <div className="p-4">
          <div className="relative w-full font-sans ">
            <h2 className="bg-gray-400 animate-pulse h-8 w-1/4 mb-2"></h2>
            <h1 className="w-1/2 mb-4 h-4 animate-pulse bg-gray-500"></h1>
            <p className="leading-relaxed mb-3 w-1/2 h-3 animate-pulse bg-gray-400"></p>
          </div>
        </div>
      )}

      {status === "success" && (
        <div className="p-4">
          <div className="relative w-full font-sans ">
            <h1 className={"text-3xl font-extrabold text-amber-50"}>
              {data.data.name}
            </h1>
            <h1 className={"mt-2 text-amber-50"}>
              Admin: {data.data.admin.full_name}
            </h1>
            <h1 className={"mt-1 text-amber-50"}>
              Total members: {data.data.member_count}
            </h1>
          </div>
        </div>
      )}
    </div>
  );
}

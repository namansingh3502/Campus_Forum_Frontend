import React from "react";
import background from "../../images/bg.jpeg";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";
import DetailsLoading from "./detailsLoading";

export default function UserDetails() {
  let { username } = useParams();

  const { data, status } = useQuery(
    [`user-details-timeline : ${username}`, `/api/auth/user/${username}`],
    fetchData
  );

  return (
    <div
      className={
        "h-auto w-full bg-slate-500 bg-opacity-20 lg:rounded-lg text-white"
      }
    >
      {status === "loading" && <DetailsLoading />}
      {status === "success" && (
        <div>
          <div className="w-full rounded-lg h-32">
            <img
              src={background}
              className="w-full h-full rounded-t-lg"
              alt={"user"}
            />
          </div>
          <div className={"relative flex justify-center h-16"}>
            <img
              className={
                "absolute h-28 w-28 -top-full rounded-full outline outline-offset-2 outline-2 outline-gray-400"
              }
              src={`${process.env.HOST}/media/${data?.data.user_image}`}
            />
          </div>
          <div className="p-4">
            <div className={"w-full px-4 text-left inline-block mb-4"}>
              <h1 className={"text-2xl font-semibold"}>
                {data?.data.full_name}
              </h1>
              <h1 className={"text-lg"}>@{data?.data.username}</h1>
              <h1 className={"text-lg"}>{data?.data.department}</h1>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

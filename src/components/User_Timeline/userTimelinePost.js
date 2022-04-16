import React, {useState} from "react";

import { useParams } from "react-router-dom";

import UserDetail from "./UserTimelineUserDetail";
import Posts from "../Post_Column/posts";
import PostLoading from "../Post_Column/Posts/postLoading";
import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";

export default function UserTimelinePost() {
  let { username } = useParams();
  const [lastPost, setLastPost] = useState(0)

  const { data, status } = useQuery(
    ["user_timeline_post", `forum/user/${username}/post/${lastPost}`],
    fetchData
  );
  return (
    <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2 space-y-2">
      <UserDetail />
      {status === "loading" && (
        <>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </>
      )}
      {status === "success" && (
        <div className={"space-y-2"}>
          {data.data.map((item) => {
            return <Posts key={item.post.id} data={item} />;
          })}
        </div>
      )}
    </div>
  );
}

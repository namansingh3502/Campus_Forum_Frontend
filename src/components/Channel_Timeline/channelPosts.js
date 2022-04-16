import React, { useEffect, useRef, useState } from "react";

import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchPost from "../../api/fetchPost";

import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import Posts from "../Post_Column/posts";
import PostLoading from "../Post_Column/Posts/postLoading";
import PageProfile from "./pageProfile";

export default function ChannelPost() {
  let { name } = useParams();
  const [page, setPage] = useState(1);
  const { isLoading, isError, error, data, isPreviousData } = useQuery(
    ["post", `/forum/channel/${name}/posts`],
    fetchPost,
    { keepPreviousData: true }
  );

  return (
    <div>
      <PageProfile />

      <div className={"pt-2 space-y-2"}>
        <CreatePost />
        {isLoading ? (
          <>
            <PostLoading />
            <PostLoading />
            <PostLoading />
          </>
        ) : isError ? (
          <div>Some error Occurred</div>
        ) : (
          <>
            {data?.data.map((item) => {
              return <Posts key={item.post.id} data={item} />;
            })}
          </>
        )}
      </div>
    </div>
  );
}

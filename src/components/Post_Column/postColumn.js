import React, { useEffect, useState, Fragment } from "react";
import axios from "axios";

import CreatePost from "./Create_Edit_Post/createPost";
import Posts from "./posts";
import PostLoading from "./Posts/postLoading";
import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";

export default function PostColumn() {
  const { data, status, error } = useQuery(
    ["posts", "/forum/posts"],
    fetchData
  );

  return (
    <div>
      <CreatePost />

      {status === "loading" && (
        <>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </>
      )}
      {status === "success" && (
        <div className={"pt-2 space-y-2"}>
          {data.data.map((item) => {
            return <Posts key={item.post.id} data={item} />;
          })}
        </div>
      )}
    </div>
  );
}

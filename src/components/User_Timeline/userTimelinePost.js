import React, {useState} from "react";

import { useParams } from "react-router-dom";

import UserDetail from "./UserTimelineUserDetail";
import Posts from "../Post_Column/posts";
import PostLoading from "../Post_Column/Posts/postLoading";
import {useInfiniteQuery, useQuery} from "react-query";
import fetchData from "../../api/fetchData";
import {useInView} from "react-hook-inview";
import FetchChannelPost from "../../api/fetchChannelPost";
import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import FetchUserPost from "../../api/fetchUserPost";

export default function UserTimelinePost() {
  let { username } = useParams();
  const [ ref, inView ] = useInView();

  const {
    status,
    data,
    error,
    isFetching,
    isFetchingNextPage,
    isFetchingPreviousPage,
    fetchNextPage,
    fetchPreviousPage,
    hasNextPage,
    hasPreviousPage,
  } = useInfiniteQuery(
      "column posts",
      ({ pageParam = 10000 }) => FetchUserPost(pageParam, username),
      {
        getNextPageParam: (lastPage, allPages) =>
            lastPage.data.has_more ? lastPage.data.next : undefined,
      }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage()
    }
  }, [inView])
  return (
    <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2 space-y-2">
      <UserDetail />
      <div className={"mt-2 space-y-2"}>
        <CreatePost />
        {isFetching && !isFetchingNextPage ? (
            <div>
              <PostLoading />
              <PostLoading />
              <PostLoading />
            </div>
        ) : null}
        <div className={"space-y-2"}>
          {data?.pages?.map((page, index) =>
              page.data.posts?.map((item) => (
                  <Posts key={item.post.id} data={item} />
              ))
          )}
        </div>
        <div ref={ref} className={"w-full h-1"}></div>
        {isFetching && isFetchingNextPage ? (
            <div>
              <PostLoading />
              <PostLoading />
              <PostLoading />
            </div>
        ) : null}
      </div>
    </div>
  );
}

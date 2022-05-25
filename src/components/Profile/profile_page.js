import React, { useState } from "react";

import ChannelList from "../Menu_Column/channelList";
import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import Posts from "../Post_Column/posts";
import { useParams } from "react-router-dom";
import { useInfiniteQuery, useQuery } from "react-query";
import PostLoading from "../Post_Column/Posts/postLoading";
import Profile from "./profile";
import FetchUserPost from "../../api/fetchUserPost";
import { useInView } from "react-hook-inview";

export default function ProfilePage() {
  let { username } = useParams();
  const [ref, inView] = useInView();

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
    `user-profile-posts : ${username}`,
    ({ pageParam = 1000 }) => FetchUserPost(pageParam, username),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.data.has_more ? lastPage.data.next : undefined,
    }
  );

  React.useEffect(() => {
    if (inView && status !== "error") {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div className={"min-h-screen w-full flex justify-center mt-4 px-2"}>
      <div
        className={
          "container w-full md:w-4/5 lg:w-4/5 max-w-screen-lg mx-auto md:mx-0 flex-row space-y-2"
        }
      >
        <Profile />

        <div className={"flex w-full mx-auto max-w-screen-lg"}>
          <div className={"hidden md:block basis-1/3 pr-2"}>
            <ChannelList />
          </div>
          <div className={"mt-2 w-full md:basis-2/3"}>
            <CreatePost />
            {isFetching && !isFetchingNextPage ? (
              <div>
                <PostLoading />
                <PostLoading />
                <PostLoading />
              </div>
            ) : null}
            <div className={"mt-2 space-y-2"}>
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
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}

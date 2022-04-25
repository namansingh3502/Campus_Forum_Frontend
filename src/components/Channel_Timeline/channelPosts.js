import React from "react";

import { useParams } from "react-router-dom";
import {useInfiniteQuery, useQuery} from "react-query";

import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import Posts from "../Post_Column/posts";
import PostLoading from "../Post_Column/Posts/postLoading";
import PageProfile from "./pageProfile";
import {useInView} from "react-hook-inview";
import FetchChannelPost from "../../api/fetchChannelPost";

export default function ChannelPost() {
  const [ ref, inView ] = useInView();
  let { name } = useParams();

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
      `channel-posts : ${name}`,
      ({ pageParam = 10000 }) => FetchChannelPost(pageParam, name),
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
    <div>
      <PageProfile />

      <div className={"mt-2 space-y-2"}>
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
            <PostLoading />
            <PostLoading />
          </div>
        ) : null}
      </div>
    </div>
  );
}

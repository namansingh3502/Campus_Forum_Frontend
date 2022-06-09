import React from "react";
import { useInView } from "react-hook-inview";
import { useInfiniteQuery } from "react-query";

import CreatePost from "./Create_Edit_Post/createPost";
import Posts from "./posts";
import PostLoading from "./Posts/postLoading";
import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";
import FetchPost from "../../api/fetchPost";

export default function PostColumn() {
  const [ref, inView] = useInView();

  const {
    data,
    isFetching,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery(
    "posts",
    ({ pageParam = 10000 }) => FetchPost(pageParam),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.data.has_more ? lastPage.data.next : undefined,
    }
  );

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <div>
      <CreatePost />

      {isFetching && !isFetchingNextPage ? (
        <div>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </div>
      ) : null}
      <div className={"mt-2 space-y-2"}>
        {data?.pages?.map((page) =>
          page.data.posts?.map((item) => (
            <Posts key={item.post.id} data={item} />
          ))
        )}
      </div>
      <div ref={ref} className={"w-full h-1"}></div>
      {isFetching && !isFetchingNextPage ? (
        <div>
          <PostLoading />
          <PostLoading />
          <PostLoading />
        </div>
      ) : null}
    </div>
  );
}

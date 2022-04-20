import React, { useEffect, useState } from "react";

import NewComment from "./newComment";
import { useInfiniteQuery, useQuery } from "react-query";
import Comments from "./comments";
import CommentLoading from "./commentLoading";
import FetchComment from "../../../../api/fetchComment";

export default function CommentModal(props) {
  const [comments, setComments] = useState([]);

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
    `post ${props.post_id} comments`,
    ({ pageParam = 100 }) => FetchComment(pageParam, props.post_id),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.data.has_more ? lastPage.data.next : undefined,
    }
  );

  return (
    <div className={"text-white border-t mt-2 border-gray-600 pt-2"}>
      {hasNextPage &&
          <button
              type={"button"}
              onClick={() => fetchNextPage()}
              className={"mx-2 bg-transparent outline-0 text-left hover:text-blue-600"}>
            load older comments.
          </button>
      }
      {status === "loading" && <CommentLoading />}
      {status === "success" && (
        <div className={"mx-2 flex-row flex-col-reverse"}>
          {[...data?.pages]
            .reverse()
            .map((page) =>
              [...page.data?.comment]
                .reverse()
                .map((item) => <Comments data={item} key={item.id} />)
            )}
        </div>
      )}

      {comments.length > 0
        ? comments.map((item) => <Comments data={item} key={item.id} />)
        : null}

      <div className={"flex items-start "}>
        <NewComment
          post_id={props.post_id}
          addComment={(data) => setComments([...comments, data])}
        />
      </div>
    </div>
  );
}

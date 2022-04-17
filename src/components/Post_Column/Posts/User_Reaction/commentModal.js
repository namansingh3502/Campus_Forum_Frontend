import React, { useEffect, useState } from "react";

import NewComment from "./newComment";
import { useQuery } from "react-query";
import fetchData from "../../../../api/fetchData";
import Comments from "./comments";
import CommentLoading from "./commentLoading";

export default function CommentModal(props) {
  const [comments, setComments] = useState([]);
  const [lastComment, setLastComment] = useState(0);

  const { data, status, error } = useQuery(
    ["posts", `/forum/comment/${props.post_id}/comments/${lastComment}`],
    fetchData
  );

  useEffect(() => {}, [comments]);

  return (
    <div className={"text-white border-t mt-2 border-gray-600 pt-2"}>
      <div className={"flex items-start "}>
        <NewComment
          post_id={props.post_id}
          addComment={(data) => setComments([...comments, data])}
        />
      </div>

      {status === "loading" && (
        <>
          <CommentLoading />
          <CommentLoading />
        </>
      )}
      {status === "success" && (
        <div className={"mx-2"}>
          {data.data?.map((item) => (
            <Comments data={item} key={item.id} />
          ))}
        </div>
      )}

      {comments.length > 0
        ? comments.map((item) => <Comments data={item} key={item.id} />)
        : null}
    </div>
  );
}

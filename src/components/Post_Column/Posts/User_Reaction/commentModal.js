import React, {useState} from "react";

import NewComment from "./newComment";
import {useQuery} from "react-query";
import fetchData from "../../../../api/fetchData";
import Comments from "./comments";
import CommentLoading from "./commentLoading";

export default function CommentModal(props) {
  const [comments, setComments] = useState([]);
  const [lastPost, setLastPost] = useState(0);

  const { data, status, error } = useQuery(
      ["posts", `/forum/comment/${props.post_id}/comments/${lastPost}`],
      fetchData
  );

  return (
    <div className={"text-white border-t mt-2 border-gray-600 pt-2"}>
      <div className={"flex items-start "}>
        <NewComment
          post_id={props.post_id}
          addComment={(data)=>setComments(comments.concat(data))}
        />

      </div>
      {status === 'loading' &&
        <>
          <CommentLoading/>
          <CommentLoading/>
        </>
      }
      {status === 'success' &&
        <div className={"mt-2 mx-2"}>
          {data.data?.map((item) => {
            return <Comments data={item} key={item.id}/>;
          })}
        </div>
      }
    </div>
  );
}
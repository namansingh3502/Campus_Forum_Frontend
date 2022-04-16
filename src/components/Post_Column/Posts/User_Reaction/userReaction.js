import React, { useEffect, useState } from "react";
import LikeDetails from "./likeDetails";
import axios from "axios";
import CommentModal from "./commentModal";

export default function UserReaction(props) {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  const [postLiked, updatePostLiked] = useState(false);
  const [userLiked, updateUserLiked] = useState(props.likes);
  const [commentModalVisibility, showCommentModal] = useState(false);

  function getDerivedStateFromProps(props, state) {
    if (props.likes !== state.UserLiked) {
      return { UserLiked: props.likes };
    }
    return null;
  }

  function handleLike() {
    const user = JSON.parse(localStorage.getItem("user_profile"));

    axios
      .post(
        `${process.env.HOST}/api/forum/${props.post_id}/like_post`,
        {},
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          let data = userLiked;

          postLiked
            ? data.pop()
            : data.push({
                username: user.username,
                user_id: user.user_id,
              });

          updatePostLiked(!postLiked);
          updateUserLiked(data);
        }
      })
      .catch((error) => {
        console.log("check Posts like update.", error);
      });
  }

  useEffect(() => {
    const data = props.likes;
    for (let i = 0; i < data.length; i++) {
      if (user.id === data[i].user_id) {
        updatePostLiked(true);
        break;
      }
    }
  }, []);

  return (
    <div>
      <LikeDetails Liked={postLiked} UserLiked={userLiked} />
      <div className="grid grid-cols-2 gap-x-3 justify-items-center border-t border-gray-600 pt-1">
        <button
          className="hover:bg-gray-400 rounded-full hover:bg-opacity-20 h-8 w-full flex items-center justify-center"
          onClick={handleLike}
        >
          <div className={"flex items-center justify-center"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5"
              />
            </svg>
            <span className={"ml-4 text-md font-medium"}>
              {postLiked ? "Liked" : "Like"}
            </span>
          </div>
        </button>
        <button
          className="hover:bg-gray-400 rounded-full hover:bg-opacity-20 h-8 w-full flex items-center justify-center"
          onClick={() => {
            showCommentModal(true);
          }}
        >
          <div className={"flex items-center justify-center"}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <span className={"ml-4 text-md font-medium"}>Comment</span>
          </div>
        </button>
      </div>
      {commentModalVisibility ? <CommentModal post_id={props.post_id} /> : null}
    </div>
  );
}

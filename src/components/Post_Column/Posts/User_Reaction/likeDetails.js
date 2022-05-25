import React from "react";

export default function LikeDetails(props) {
  const liked = props.Liked;
  const user0 = props.UserLiked[0]?.full_name;
  const length = props.UserLiked.length;

  return (
    <div className="text-md px-3 py-1 w-full overflow-auto">
      <div className={"inline w-4/5"}>
        {length > 0 ? "Post liked by " : ""}
        {length === 1 ? (liked ? "You" : user0) + " " : ""}
        {length === 2
          ? liked
            ? "You and " + user0
            : user0 + " and 1 other"
          : ""}
        {length > 2
          ? liked
            ? "You, " + user0 + " and " + JSON.stringify(length - 2) + " other"
            : user0 + " and " + JSON.stringify(length - 1) + " other"
          : ""}
      </div>

      {props.comment_count !== "0" ? (
        <button className={"inline float-right mx-2"}
          onClick={() => props.showCommentModal()}
        >
          <span className={"hover:underline underline-offset-4"}>
            comments {props.comment_count}
          </span>
        </button>
      ) : null}
    </div>
  );
}

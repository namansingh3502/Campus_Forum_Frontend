import React from "react";

export default function LikeDetails(props) {
  const liked = props.Liked;
  const user0 = props.UserLiked[0]?.full_name;
  const length = props.UserLiked.length;

  return (
    <div className="text-md ml-2 py-1">
      <p>
        {length > 0 ? "Post liked by " : ""}
        {length === 1 ? (liked ? "You" : user0) + " " : ""}
        {length === 2
          ? liked
            ? "You and " + user0
            : user0 + " and 1 other"
          : ""}
        {length > 2
          ? liked
            ? "You, " +
                user0 +
              " and " +
              JSON.stringify(length - 2) +
              " other"
            : user0 +
              " and " +
              JSON.stringify(length - 1) +
              " other"
          : ""}
      </p>
    </div>
  );
}

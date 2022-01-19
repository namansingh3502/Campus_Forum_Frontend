import userImage from "../../../images/userimg.jpeg";
import React from "react";

export default function UserDetails(data) {
  return (
    <div className="flex">
      <img
        src={userImage}
        className="rounded-full"
        style={{ height: 45, width: 45 }}
        alt={"user"}
      />
      <div className="ml-4 mt-1 text-xl">
        <h1 className="text-md" id={data.user_id}>
          {data.username}
        </h1>
      </div>
    </div>
  );
}

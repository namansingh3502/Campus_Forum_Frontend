import React from "react";

import user_image from "../../../images/userimg.jpeg"

export default function UserDetails(props) {
  const user = props.user
  console.log(props)
  return (
    <div className="flex">
      <img
        // src={`${process.env.HOST}${props.user.user_image}`}
        src={user_image}
        className="rounded-full"
        style={{ height: 45, width: 45 }}
        alt={"user"}
      />
      <div className="ml-4">
        <h1 className="text-lg font-semibold" id={user.id}>
          {user.prefix} {user.first_name} {user.middle_name} {user.last_name}
        </h1>
        <p className={"text-sm"}>@{user.username}</p>
      </div>
    </div>
  );
}

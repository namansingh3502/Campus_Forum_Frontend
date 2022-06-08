import React from "react";

export default function UserDetails() {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  return (
    <div className={"mt-4 flex items-center justify-items-center"}>
      <div className="flex px-4 items-center flex items-center justify-items-center">
        <img
          src={`${user.user_image}`}
          className="rounded-full outline outline-offset-2 outline-2 outline-gray-400"
          style={{ height: 54 , width: 54 }}
          alt={"user"}
        />
        <div className="ml-4 text-bold">
          <span className={"text-lg font-semibold"}>{user.full_name}</span>
          <br />
          <span className={"text-md"}>@{user.username}</span>
        </div>
      </div>
    </div>
  );
}

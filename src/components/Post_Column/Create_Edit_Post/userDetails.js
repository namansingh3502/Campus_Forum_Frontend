import React from "react";

export default function UserDetails(){
  const user = JSON.parse(localStorage.getItem('user_profile'))
  return(
    <div className={"mt-4"}>
      <div className="flex px-4 items-center">
        <img
          src={`${user.user_image}`}
          className="rounded-full"
          style={{ height: 60, width: 60 }}
          alt={"user"}
        />
        <div className="ml-4 text-bold">
          <span className={"text-lg font-semibold"}>{user.first_name} {user.middle_name} {user.last_name}</span><br/>
          <span className={"text-md"}>@{user.username}</span>
        </div>
      </div>
    </div>
  )
}
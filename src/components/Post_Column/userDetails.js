import React from "react";

import user_image from "../../images/userimg.jpeg"


export default function UserDetails(){
  const user = JSON.parse(localStorage.getItem('user_profile'))
  return(
    <div className={"mt-4"}>
      <div className="flex px-4 items-center">
        <img
          // src={`${process.env.HOST}${user.user_image}`}
          src={user_image}
          className="rounded-full"
          style={{ height: 60, width: 60 }}
          alt={"user"}
        />
        <div className="ml-4">
          <h1 className="text-lg font-semibold" id={user.id}>
            {user.prefix} {user.first_name} {user.middle_name} {user.last_name}
          </h1>
          <p className={"text-sm"}>@{user.username}</p>
        </div>
      </div>
    </div>
  )
}
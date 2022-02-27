import React from "react";
import {user} from "../../globalData";

export default function UserDetails(){
  return(
    <div className={"mt-4"}>
      <div className="flex px-4 items-center">
        <img
          src={`${process.env.HOST}${user.user_image}`}
          className="rounded-full"
          style={{ height: 60, width: 60 }}
          alt={"user"}
        />
        <div className="ml-4 text-bold">
          <h1 className="text-xl font-bold" id={user.user_id}>
            {user.username}
          </h1>
        </div>
      </div>
    </div>
  )
}
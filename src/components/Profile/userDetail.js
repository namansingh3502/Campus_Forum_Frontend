import userImage from "../../images/userimg.jpeg";
import React from "react";
import background from "../../images/bg.jpeg";

export default function UserDetail(props){
  // const user = props.user
  const user = JSON.parse(localStorage.getItem('user_profile'))

  return(
    <div className={"h-auto w-full mt-10 bg-slate-500 bg-opacity-20 lg:rounded-lg text-white"}>
      <div className="w-full rounded-lg h-32">
        <img
          src={background}
          className="w-full h-full rounded-t-lg"
          alt={"user"}
        />
      </div>
      <div className={"relative flex justify-center h-16"}>
        <img
          className={"absolute h-28 w-28 -top-full rounded-full outline outline-offset-2 outline-2 outline-indigo-700"}
          src={userImage}
        />
      </div>
      <div className={"w-full px-4 text-center inline-block "}>
        <h1 className={"text-2xl font-semibold"}>{user.first_name} {user.middle_name} {user.last_name} </h1>
        <h1 className={"text-lg"}>@{user.username}</h1>
        <h1 className={"text-lg"}>{user.department}</h1>
      </div>
    </div>
  )
}
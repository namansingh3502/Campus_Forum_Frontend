import React from "react";

export default function UserDetails(props) {
  const user = props.userdetail

  return (
    <div className="flex items-center">
      <img
        src={`${process.env.HOST}${user.user_image}`}
        className={"rounded-full h-16 w-16"}
        alt={"user"}
      />
      <div className={"ml-4"}>
        <span className={"text-lg"}>{user.first_name} {user.middle_name} {user.last_name}</span><br/>
        <span className={"text-md"}>@{user.username}</span>
        {/*<span className={"text-md"}>{props.time}</span>*/}
      </div>
    </div>
  );
}

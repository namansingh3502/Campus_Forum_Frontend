import React from "react";
import { Link } from "react-router-dom";

export default function UserDetails(props) {
  const user = props.userdetail;

  return (
    <div className="flex items-center px-2">
      <img
        src={`${process.env.HOST}/media/${user.user_image}`}
        className={"rounded-full h-14 w-14"}
        alt={"user"}
      />
      <div className={"ml-4"}>
        <Link to={`/user/${user.username}`}>
          <span className={"text-lg hover:border-b"}>{user.full_name}</span>
        </Link>
        <br />
        <span className={"text-md"}>@{user.username}</span>
        {/*<span className={"text-md"}>{props.time}</span>*/}
      </div>
    </div>
  );
}

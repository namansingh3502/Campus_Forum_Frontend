import React from "react";
import {Link} from "react-router-dom";

export default function UserDetails(props) {
  const user = props.userdetail

  return (
    <div className="flex items-center">
      <img
        src={`${user.user_image}`}
        className={"rounded-full h-16 w-16"}
        alt={"user"}
      />
      <div className={"ml-4"}>
        <Link
          to={`/user/${user.username}`}
        >
          <span className={"text-lg hover:border-b"}>
            {user.first_name} {user.middle_name} {user.last_name}
          </span>
        </Link><br/>
        <span className={"text-md"}>@{user.username}</span>
        {/*<span className={"text-md"}>{props.time}</span>*/}
      </div>
    </div>
  );
}

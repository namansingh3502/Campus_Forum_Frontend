import React from "react";

export default function UserDetails(props) {
  const host =  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000'
    :
    'https://campus-forum-naman.herokuapp.com'

  return (
    <div className="flex">
      <img
        src={`${host}${props.user.user_image}`}
        className="rounded-full"
        style={{ height: 45, width: 45 }}
        alt={"user"}
      />
      <div className="ml-4 mt-1 text-xl">
        <h1 className="text-md" id={props.user.user_id}>
          {props.user.username}
        </h1>
      </div>
    </div>
  );
}

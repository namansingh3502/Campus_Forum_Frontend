import React from "react";
import background from "../../images/background.jpeg"
import {user} from "../../globalData";

const UserProfile = () => {
  const user = JSON.parse(localStorage.getItem('user_profile'))

  return (
    <div className="h-auto bg-slate-500 bg-opacity-20 rounded-lg text-lg py-6">
      <div className="h-36 w-full bg-contain bg-no-repeat rounded-t-xl flex justify-center items-center">
        <img
          className="rounded-full h-36 w-36 border-2 border-amber-100 p-0.5"
          src={`${user.user_image}`}
          alt={"profile"}
        />
      </div>
      <div className="text-center text-amber-50 mt-4">
        <h1 className={"font-extrabold text-xl"}>{user.first_name} {user.middle_name} {user.last_name}</h1>
        <p className={"text-sm lg:text-lg py-0.5"}>@{user.username}</p>
        <p className={"text-sm lg:text-lg"}>{user.department}</p>
      </div>
    </div>
  );
};

export default UserProfile;

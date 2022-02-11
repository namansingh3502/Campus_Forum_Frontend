import React, {useEffect, useState} from "react";
import background from "../../images/background.jpeg"

const UserProfile = () => {
  const profile = JSON.parse(localStorage.getItem('user_profile'))

  return (
    <div className="bg-gray-400 h-auto rounded-xg bg-opacity-10 backdrop-filter backdrop-blur-lg text-lg pb-5">
      <div className="h-36 w-full rounded-t-xl">
        <div
          className="h-full w-full bg-contain bg-no-repeat rounded-t-xl flex justify-center items-center"
          style={{backgroundImage: `url(${background})`}}
        >
          <img
            className="rounded-full h-28 w-28 border-2 border-amber-100 p-0.5 "
            src={`${process.env.HOST}${profile.user_image}`}
            alt={"profile"}
          />
        </div>
      </div>
      <div className="text-center text-amber-50">
        <h1 className={"font-extrabold text-xl"}>{profile.first_name} {profile.middle_name} {profile.last_name}</h1>
        <h1 className={"text-sm"}>{profile.username}</h1>
        <h1 className={"text-sm"}>{profile.department}</h1>

      </div>
    </div>
  );
};

export default UserProfile;

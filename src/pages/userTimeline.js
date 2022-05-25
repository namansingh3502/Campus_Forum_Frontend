import React from "react";

import MenuColumn from "../components/Menu_Column/menuColumn";
import ActivityColumn from "../components/Activty_Column/activityColumn";
import UserTimelinePost from "../components/User_Timeline/userTimelinePost";

export default function UserTimeline() {
  return (
    <div className="min-h-screen w-full xl:w-10/12 max-w-screen-xl mx-auto container mt-4 px-2">
      <div className="flex flex-row w-full justify-center">
        <div className={"md:basis-1/3 xl:basis-4/12 hidden md:block"}>
          <MenuColumn />
        </div>
        <div className="w-full md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2">
          <UserTimelinePost />
        </div>
        <div className={"lg:basis-5/12 xl:basis-4/12 hidden lg:block"}>
          <ActivityColumn />
        </div>
      </div>
    </div>
  );
}

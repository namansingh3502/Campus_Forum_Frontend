import MenuColumn from "../components/Menu_Column/menuColumn";
import PostColumn from "../components/Post_Column/postColumn";
import ActivityColumn from "../components/Activty_Column/activityColumn";
import React from "react";

export default function Dashboard(){
  return(
    <div className="min-h-screen w-full xl:w-10/12 max-w-screen-xl mx-auto container mt-4 px-2">
      <div className="flex flex-row w-full justify-center">

        <div className={"md:basis-1/3 xl:basis-4/12 hidden md:block"}>
          <MenuColumn/>
        </div>
        <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2">
          <PostColumn/>
        </div>
        <div className={"lg:basis-5/12 xl:basis-4/12 hidden lg:block"}>
          <ActivityColumn/>
        </div>
      </div>
    </div>
  )
}
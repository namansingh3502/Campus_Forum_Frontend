import MenuColumn from "../components/Menu_Column/menuColumn";
import PostColumn from "../components/Post_Column/postColumn";
import ActivityColumn from "../components/Activty_Column/activityColumn";
import React from "react";

export default function Dashboard(){
  return(
    <div className="min-h-screen w-full xl:w-10/12 max-w-screen-xl mx-auto container mt-4">
      <div className="flex flex-row w-full justify-center">
        <MenuColumn/>
        <PostColumn/>
        <ActivityColumn/>
      </div>
    </div>
  )
}
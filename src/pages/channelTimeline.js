import React from "react";

import MenuColumn from "../components/Menu_Column/menuColumn";
import ActivityColumn from "../components/Activty_Column/activityColumn";
import ChannelPost from "../components/Post_Column/Posts/channelPosts";

export default function ChannelTimeline(props){
  return(
    <div className="min-h-screen w-full xl:w-10/12 max-w-screen-xl mx-auto container mt-4">
      <div className="flex flex-row w-full justify-center">
        <MenuColumn />
        <ChannelPost />
        <ActivityColumn />
      </div>
    </div>
  )
}
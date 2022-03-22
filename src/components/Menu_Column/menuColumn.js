import React from "react";

import UserProfile from "./userProfile";
import ChannelList from "./channelList";

export default function MenuColumn (props){
  return (
    <div className="md:basis-1/3 xl:basis-4/12 hidden md:block">
      <UserProfile />
      <ChannelList
        ChannelList={props.ChannelList}
      />
    </div>
  )
}

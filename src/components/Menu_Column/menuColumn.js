import React from "react";

import UserProfile from "./userProfile";
import ChannelList from "./channelList";

export default function MenuColumn (){
  return (
    <div>
      <UserProfile/>
      <ChannelList/>
    </div>
  )
}

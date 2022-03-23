import React, {useEffect, useState} from "react";

import MenuColumn from "../components/Menu_Column/menuColumn";
import PostColumn from "../components/Post_Column/postColumn";
import ActivityColumn from "./Activty_Column/activityColumn";
import axios from "axios";

export default function Forum() {
  const [channelList, updateChannelList] = useState([])

  function loadChannelList() {
    axios.get(
      `${process.env.HOST}/forum/channel-list`,
      {
        headers: {
          Authorization: localStorage.getItem("Token")
        }
    })
    .then((response) => {
      if( response.status === 200) {
        updateChannelList(response.data);
      }
    })
    .catch((error) => {
      console.log("check login error", error);
    });
  }

  useEffect(()=>{
    loadChannelList()
  },[])

  return (
    <div className="min-h-screen w-full xl:w-10/12 max-w-screen-xl mx-auto container mt-4">
      <div className="flex flex-row w-full justify-center">

        {/*Menu Column*/}
        <MenuColumn
          ChannelList={channelList}
        />

        {/*Post Column*/}
        <PostColumn
          ChannelList={channelList}
        />

        {/* Activity Column*/}
        <ActivityColumn />
      </div>
    </div>
  );
}
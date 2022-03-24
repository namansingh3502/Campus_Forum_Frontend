import React, {useEffect, useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import axios from "axios";
import Dashboard from "./dashboard";
import ChannelTimeline from "./channelTimeline";
import Profile from "../components/Profile/profile";
import Settings from "../components/Settings/settings";
import Page404 from "./page404";

export default function Router() {
  const [channelLoadStatus, setChannelLoadStatus] = useState(false)

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
        localStorage.setItem('channels', JSON.stringify(response.data))
        setChannelLoadStatus(true)
      }
    })
    .catch((error) => {
      console.log("check login error", error);
    });
  }

  useEffect(()=>{
    loadChannelList()
  },[])

  if(!channelLoadStatus){
    return (<div className={"text-white"}>Loading......</div>)
  }

  return (
      <Routes>
        <Route
          path={""}
          element={
            <Dashboard/>
          }
        />
        <Route
          path={"Channel-Post/:id"}
          element={
            <ChannelTimeline/>
          }
        />
        <Route
          path={"profile"}
          element={
            <Profile/>
          }
        />
        <Route
          path={"settings"}
          element={
            <Settings/>
          }
        />
        <Route
          path={"*"}
          element={
            <Page404/>
          }
        />
      </Routes>

  );
}
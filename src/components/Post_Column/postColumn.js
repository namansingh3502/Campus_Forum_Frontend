import React from "react";
import Posts from "./posts";
import {Route, Routes} from "react-router-dom";
import ChannelPost from "./Post_Modal/channelPosts";

export default function PostColumn (props) {
  return (
    <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2">
      <Routes>
        <Route
          path="/"
          element={
            <Posts
              ChannelList={props.ChannelList}
            />
          }
        />
        <Route
          path="/Channel-Post/:id/"
          element={
            <ChannelPost
              ChannelList={props.ChannelList}
            />
          }
        />
      </Routes>
    </div>
  )
}

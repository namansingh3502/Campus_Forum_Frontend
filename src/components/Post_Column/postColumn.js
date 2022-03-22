import React, {useState} from "react";
import Posts from "./posts";
import {Navigate, Route, Routes} from "react-router-dom";
import ChannelPost from "./post/channelPosts";

export default function PostColumn (props) {

  return (
    <div className="md:basis-2/3 lg:w-4/5  text-white px-2">
      <Routes>
        <Route path="" element={
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
        <Route
          path="*"
          element={<Navigate to={``} replace />}
        />
      </Routes>

    </div>
  )
}


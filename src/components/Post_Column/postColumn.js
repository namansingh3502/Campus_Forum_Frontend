import React, {useState} from "react";
import Posts from "./posts";
import {Navigate, Route, Routes} from "react-router-dom";
import ChannelPost from "./post/channelPosts";
import PostCreateModal from "./post/Create_Post/postCreateModal";


export default function PostColumn (props) {

  return (
    <div className="mx-3 w-5/12 text-white">

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


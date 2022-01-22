import React, {Component, useState} from "react";
import Posts from "./posts";
import {Navigate, Route, Routes} from "react-router-dom";
import ChannelPost from "./post/channelPosts";
import PostCreateModal from "./post/Create_Post/postCreateModal";


export default function PostColumn (props) {
  const [createPostModal, updatePostModalVisibility] = useState(false)


  return (
    <div className="mx-3 w-5/12 text-white">

      <Routes>
        <Route path="" element={
          <Posts
            showPostCreateModal={()=>{
              updatePostModalVisibility(!createPostModal)
            }}
          />
        }
        />
        <Route
          path="/Channel-Post/:id/"
          element={
            <ChannelPost
              showPostCreateModal={()=>{
                updatePostModalVisibility(!createPostModal)
              }}
            />
          }
        />
        <Route
          path="*"
          element={<Navigate to={``} replace />}
        />
      </Routes>
      { createPostModal ?
        <PostCreateModal
          showPostCreateModal={()=>{
            updatePostModalVisibility(!createPostModal)
          }}
          ChannelList={props.ChannelList}

        />
        : null }
    </div>
  )
}


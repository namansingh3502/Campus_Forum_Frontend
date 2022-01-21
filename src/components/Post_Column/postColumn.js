import React, { Component } from "react";
import CreatePost from "./post/Create_Post/createPost";
import Posts from "./posts";
import PostCreateModal from "./post/Create_Post/postCreateModal";
import {Route, Routes} from "react-router-dom";
import PageProfile from "./pageProfile";
import ChannelPost from "./post/channelPosts";


export default function PostColumn (props) {


  // updateModalVisibility(){
  //   this.setState({
  //     showNewPostModal: !this.state.showNewPostModal
  //   })
  // }

  return (
    <div className="mx-3 w-5/12 text-white">

      <Routes>
        <Route path="" element={<div>Home</div>} />
        <Route
          path="/Channel-Post/:id/"
          element={
            <ChannelPost
              ChannelList={props.ChannelList}
            />
          }
        />
        <Route
          path="/Channel-Post/"
          element={<div >Channel</div>}
        />
        <Route
          path="*"
          element={<div >Nothing to show</div>}
        />

      </Routes>

      {/*<CreatePost*/}
      {/*  updateNewPost={()=>{this.updateModalVisibility()}}*/}
      {/*/>*/}
      {/*<Posts />*/}
      {/*<PostCreateModal*/}
      {/*  ChannelList={this.props.ChannelList}*/}
      {/*  updateNewPost={()=>{this.updateModalVisibility()}}*/}
      {/*  ShowModal={this.state.showNewPostModal}*/}
      {/*/>*/}

    </div>
  )
}


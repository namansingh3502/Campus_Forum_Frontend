import React, {useEffect, useState} from "react"
import PageProfile from "../pageProfile";
import CreatePost from "./Create_Post/createPost";
import Posts from "../posts";
import PostModal from "./postModal";
import axios from "axios";
import {useParams} from "react-router-dom";
import CreatePostModal from "./Create_Post/createPostModal";


export default function ChannelPost (props){
  let {id} = useParams();
  const [post, updateChannelPosts] = useState([])
  const [postLoadStatus, updatePostLoadStatus] = useState(true)

  function loadPost(){
    const Token = localStorage.getItem("Token");

    axios
      .get(`${process.env.HOST}/forum/channel/${id}/posts`, {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          updateChannelPosts(response.data)
          updatePostLoadStatus(false)
        } else {
          console.log('error at channel post')
        }})
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  function updatePosts(newPost){
    let data = post
    data.unshift(newPost)
    updateChannelPosts([...data])
  }

  useEffect( ()=>{
    if(postLoadStatus) loadPost()
  },[id])

  return(
    <div>
      <PageProfile/>
      <div className={"mt-4"}>
        <CreatePost
          ChannelList={props.ChannelList}
          updatePosts={(newPost)=>{
            updatePosts(newPost)
          }}
        />

      {post.map((item) => {
        return (
          <div key={item.post.id}>
            <PostModal
              data={item}
            />
          </div>
        );
      })}</div>
    </div>
  )
}
import React, {useEffect, useRef, useState} from "react"

import axios from "axios";
import {useParams} from "react-router-dom";

import PageProfile from "./pageProfile";
import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import Posts from "../Post_Column/posts";

export default function ChannelPost (){
  let {id} = useParams();
  const [posts, setPosts] = useState([])
  const [postLoaded, updateLoadStatus] = useState(false)
  const [postAdded, updatePostAdded] = useState(false)
  const [postUpdated, updatePostUpdated] = useState(false)

  const prevIdRef = useRef()

  function loadPost(){
    axios.get(
      `${process.env.HOST}/forum/channel/${id}/posts`,
      {
        headers: {
          Authorization: localStorage.getItem("Token")
        }
    })
    .then((response) => {
      if (response.status === 200) {
        updateLoadStatus(true)
        setPosts(response.data)
      }
    })
    .catch((error) => {
      console.log("check login error", error);
    });
  }

  function addPost(newPost){
    let data = posts
    data.unshift(newPost)
    setPosts(data)
    updatePostAdded(true)
  }

  function updatePost(post){
    const post_id = post.post.id
    let data = posts

    for( let i = 0; i < data.length; i++){
      if(data[i].post.id === post_id ) {
        data[i] = post
        break
      }
    }
    setPosts(data)
    updatePostUpdated(true)
  }

  useEffect( ()=>{
    if( prevIdRef.current !== id) loadPost()
    prevIdRef.current = id
  },[id,posts])

  return(
    <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2 space-y-2">
      <PageProfile/>
      <CreatePost
        updatePosts={(newPost)=>{
          addPost(newPost)
        }}
      />
      {postLoaded ?
        <div className={"space-y-2"}>
          {posts.map((item) => {
            return (
              <Posts
                key={item.post.id}
                data={item}
              />
            )
          })}
        </div>
        :
        <div className={"text-white text-center"}>Loading.....</div>
      }
    </div>
  )
}
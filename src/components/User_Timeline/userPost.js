import React, {useEffect, useRef, useState} from "react"

import axios from "axios";
import {useParams} from "react-router-dom";

import UserDetail from "./userDetail";
import Posts from "../Post_Column/posts";

export default function UserPost (props){
  let {username} = useParams();
  const [posts, setPosts] = useState([])
  const [postLoaded, updateLoadStatus] = useState(false)

  const prevIdRef = useRef()

  function loadPost(){
    axios.get(
      `${process.env.HOST}/forum/channel/1/posts`,
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

  useEffect( ()=>{
    if( prevIdRef.current !== username) loadPost()
    prevIdRef.current = username
  },[username])

  return(
    <div className="md:basis-2/3 lg:basis-4/5 text-white md:pl-2 lg:pr-2 space-y-2">
      <UserDetail
        userdetail={props.user}
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
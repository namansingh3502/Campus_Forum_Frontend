import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";

import CreatePost from "./Create_Post/createPost";
import Posts from "./posts";

export default function PostColumn() {
  const [posts, setPosts] = useState([])
  const [postLoaded, updateLoadStatus] = useState(false)
  const [postAdded, updatePostAdded] = useState(false)
  const [postUpdated, updatePostUpdated] = useState(false)

  function loadPost(posts) {
    axios.get(
      `${process.env.HOST}/forum/posts`,
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

  useEffect(()=>{
    if( !postLoaded )
      loadPost()
  },[postAdded, postUpdated])

  return (
    <div>
      <CreatePost
        updatePosts={(newPost)=>{
          addPost(newPost)
        }}
      />
      {postLoaded ?
        <div className={"pt-2 space-y-2"}>
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
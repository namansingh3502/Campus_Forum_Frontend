import React, {useEffect, useState, Fragment} from "react";
import axios from "axios";

import PostModal from "./Post_Modal/postModal";
import CreatePost from "./Create_Post/createPost";
import CreatePostModal from "./Edit_Post/editPostModal";

export default function Posts(props) {
  const [postLoaded, updateLoadStatus] = useState(false)
  const [postAdded, updatePostAdded] = useState(false)
  const [postUpdated, updatePostUpdated] = useState(false)
  const [postData, updatePostData ] = useState([])
  const [showPostModal, updatePostModalVisibility] = useState(false)
  const [postUpdateData, updatePostUpdateData] = useState({})

  function loadPost() {
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
        updatePostData(response.data)
      }
    })
    .catch((error) => {
      console.log("check login error", error);
    });
  }

  function addPost(newPost){
    let data = postData
    data.unshift(newPost)
    updatePostData(data)
    updatePostAdded(true)
  }

  function updatePost(post){
    const post_id = post.post.id
    let data = postData

    for( let i = 0; i < data.length; i++){
      if(data[i].post.id === post_id ) {
        data[i] = post
        break
      }
    }
    updatePostData(data)
    updatePostUpdated(true)
  }

  useEffect(()=>{
    if( !postLoaded )
      loadPost()
  },[postAdded, postUpdated])

  return (
    <div>
      <CreatePost
        ChannelList={props.ChannelList}
        updatePosts={(newPost)=>{
          addPost(newPost)
        }}
      />
      <CreatePostModal
        ChannelList={props.ChannelList}
        data={postUpdateData}
        modalVisibility={showPostModal}
        updatePost={(post)=>{
          updatePostModalVisibility(false)
          updatePost(post)
        }}
        showEditPostModal={() => {
          updatePostModalVisibility(false)
        }}
      />
      {postData.map((item) => {
        return (
          <PostModal
            key={item.post.id}
            data={item}
            showEditPostModal={() => {
              updatePostModalVisibility(true)
              updatePostUpdateData(item)
            }}
          />
        );
      })}
    </div>
  )
}

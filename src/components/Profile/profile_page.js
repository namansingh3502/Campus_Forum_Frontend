import React, { useState } from "react";

import UserDetail from "./profile";
import ChannelList from "../Menu_Column/channelList";
import CreatePost from "../Post_Column/Create_Edit_Post/createPost";
import Posts from "../Post_Column/posts";
import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import fetchPost from "../../api/fetchPost";
import PostLoading from "../Post_Column/Posts/postLoading";
import Profile from "./profile";

export default function ProfilePage() {
  let { username } = useParams();
  const { data, status } = useQuery(
    ["user_timeline_post", `forum/user/${username}/post`],
    fetchPost
  );

  return (
    <div className={"min-h-screen w-full flex justify-center mt-4 px-2"}>
      <div
        className={
          "container w-full md:w-4/5 lg:w-4/5 max-w-screen-lg mx-auto md:mx-0 flex-row space-y-2"
        }
      >
        <Profile />

        <div className={"flex w-full mx-auto max-w-screen-lg"}>
          <div className={"hidden md:block basis-1/3 pr-2"}>
            <ChannelList />
          </div>
          <div className={"mt-2 w-full md:basis-2/3"}>
            <CreatePost />

            {status === "loading" && (
              <>
                <PostLoading />
                <PostLoading />
                <PostLoading />
              </>
            )}

            {status === "success" && (
              <div className={"pt-2 space-y-2"}>
                {data.data.map((item) => {
                  return <Posts key={item.post.id} data={item} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/*
function Profile_page(){
  const user = JSON.parse(localStorage.getItem('user_profile'))

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

  return(
    <div className={"min-h-screen w-full flex justify-center mt-4 px-2"}>
      <div className={"container w-full md:w-4/5 lg:w-4/5 max-w-screen-lg mx-auto md:mx-0 flex-row space-y-2"}>

        <UserDetail/>

        <div className={"flex w-full mx-auto max-w-screen-lg"}>
          <div className={"hidden md:block basis-1/3 pr-2"} >
            <ChannelList/>
          </div>
          <div className={"mt-2 w-full md:basis-2/3"}>
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
        </div>

      </div>
    </div>
  )
}*/

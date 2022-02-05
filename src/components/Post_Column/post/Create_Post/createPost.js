import React, {useState} from "react";
import PostCreateModal from "./postCreateModal";

export default function CreatePost(props) {

  const [createPostModal, updatePostModalVisibility] = useState(false)

  const host =  process.env.NODE_ENV === 'development' ?
    'http://127.0.0.1:8000'
    :
    'https://campus-forum-naman.herokuapp.com'
  const profile = JSON.parse(localStorage.getItem('user_profile'))

  return (
    <div>
    <div className="py-3 px-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto">
      <div className="flex items-center">
        <img
          src={`${host}${profile.user_image}`}
          className="rounded-full bg-black"
          alt={"logo"}
          style={{ width: 45, height: 45 }}
        />
        <button
          className="bg-gray-400 rounded-full bg-opacity-20 w-full ml-4 h-12 px-4 text-left text-white text-lg"
          onClick ={() => {
            updatePostModalVisibility(true)
          }}
        >
          Start a Post...
        </button>
      </div>
    </div>
      { createPostModal ?
        <PostCreateModal
          showPostCreateModal={()=>{
            updatePostModalVisibility(!createPostModal)
          }}
          ChannelList={props.ChannelList}
          updatePosts={(newPost)=>{
            props.updatePosts(newPost)}}
        />
        : null }
    </div>
  );
}

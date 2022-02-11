import React, {useEffect, useState} from 'react'
import UserDetails from "./userDetails";
import ChannelTags from "./channelTags";
import PostText from "./postText";
import UserReaction from "./User_Reaction/userReaction";
import {FaPen} from "react-icons/all";

export default function (props){
  const [editButton, showEditButton] = useState(false)

  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem('user_profile')).id
    if( props.data.user.id === user){
      showEditButton(true)
    }
  },[])
  return(
    <div className="p-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto mt-4">
      {editButton ?
        <button
          className={"float-right text-sm"}
          aria-label="Edit Post"
          onClick={()=>{props.editPost(props.data, true)}}
        >
          <FaPen/>
        </button> : null
      }
      <UserDetails user={props.data.user} />
      <ChannelTags channels={props.data.post.posted_in} />
      <PostText text={props.data.post.body} />
      <UserReaction
        likes={props.data.post.Liked_Post}
        post_id={props.data.post.id}
      />
    </div>
  )
}
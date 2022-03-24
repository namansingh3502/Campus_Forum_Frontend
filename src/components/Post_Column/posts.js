import React, {useEffect, useState} from 'react'

import {FaPen} from "react-icons/all";
import ChannelTags from "./Posts/channelTags";
import PostText from "./Posts/postText";
import PostImage from "./Posts/postImage";
import UserReaction from "./Posts/User_Reaction/userReaction";
import UserDetails from "./Posts/userDetails";

export default function Posts (props){
  const [editButton, showEditButton] = useState(false)
  const user = JSON.parse(localStorage.getItem('user_profile'))

  useEffect(()=>{
    if( props.data.user.id === user.id){
      showEditButton(true)
    }
  },[])

  return(
    <div className="p-4 bg-slate-500 bg-opacity-20 rounded-lg text-white h-auto">
      {editButton ?
        <button
          className={"float-right text-sm"}
          aria-label={"Edit Post"}
          onClick={()=>{props.showEditPostModal()}}
        >
          <FaPen/>
        </button> : null
      }
      <UserDetails
        userdetail={props.data.user}
        time={props.data.post.time}
      />
      <ChannelTags channels={props.data.post.posted_in} />
      <PostText text={props.data.post.body} />
      <PostImage images={props.data.media} />
      <UserReaction
        likes={props.data.post.Liked_Post}
        post_id={props.data.post.id}
      />
    </div>
  )
}
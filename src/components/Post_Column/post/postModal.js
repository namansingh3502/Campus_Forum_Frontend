import React from 'react'
import UserDetails from "./userDetails";
import ChannelTags from "./channelTags";
import PostText from "./postText";
import UserReaction from "./User_Reaction/userReaction";

export default function (props){

  return(
    <div className="p-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto mt-4">

      <UserDetails user={props.data.user} />
      <ChannelTags channels={props.data.post.posted_in} />
      <PostText text={props.data.post.body} />
      {/* <PostImage/>  */}
      <UserReaction
        likes={props.data.post.Liked_Post}
        post_id={props.data.post.id}
      />
    </div>
  )
}
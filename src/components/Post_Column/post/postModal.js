import React from 'react'
import UserDetails from "./userDetails";
import ChannelTags from "./channelTags";
import PostText from "./postText";
import UserReaction from "./User_Reaction/userReaction";

export default function (props){
  const Post = props.Post
  return(
    <div
      className="p-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto mt-4"
      key={Post.post_data.id}
    >
      <UserDetails
        username={Post.username}
        user_id={Post.user_id}
      />
      <ChannelTags channel_list={Post.post_data.channel_name} />
      <PostText text={Post.post_data.body} />
      {/* <PostImage/>  */}
      <UserReaction post={Post.post_data.id} />
    </div>
  )
}
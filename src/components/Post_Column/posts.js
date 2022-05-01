import React, { useEffect, useState } from "react";

import ChannelTags from "./Posts/channelTags";
import PostText from "./Posts/postText";
import PostImage from "./Posts/postImage";
import UserReaction from "./Posts/userReaction";
import UserDetails from "./Posts/userDetails";
import EditPostModal from "./Create_Edit_Post/editPostDialog";
import PostOptions from "./Posts/postOptionsButton";
import { useQueries } from "react-query";
import FetchImage from "../Images/fetchImage";

export default function Posts(props) {
  const user = JSON.parse(localStorage.getItem("user_profile"));

  const [postVisibility, setPostVisibility] = useState(true);
  const [postData, setPostData] = useState(props.data);
  const [dialogVisibility, setDialogVisibility] = useState(false);

  const postImages = useQueries(
    postData.media.map((item) => {
      return {
        queryKey: ["post-images", item.file],
        queryFn: () => FetchImage(item.file),
      };
    })
  );

  return !postVisibility ? (
    <></>
  ) : (
    <div className="py-4 px-2 bg-slate-500 bg-opacity-20 rounded-lg text-white h-auto">
      {props.data.user.id === user.id ? (
        <PostOptions
          post_id={postData.post.id}
          setPostVisibility={() => setPostVisibility(false)}
          setDialogVisibility={() => setDialogVisibility(true)}
        />
      ) : null}
      <UserDetails userdetail={postData.user} time={postData.post.time} />
      <ChannelTags channels={postData.post.posted_in} />
      <PostText text={postData.post.body} is_edited={postData.post.is_edited} />
      <PostImage images={postImages} />
      <UserReaction
        likes={postData.post.likes}
        post_id={postData.post.id}
        comments_count={postData.post.comments_count}
      />
      {dialogVisibility ? (
        <EditPostModal
          dialogVisibility={dialogVisibility}
          setDialogVisibility={() => {
            setDialogVisibility(false);
          }}
          setPostData={(newPost) => {
            setPostData(newPost);
          }}
          data={postData}
          images={postImages}
        />
      ) : null}
    </div>
  );
}

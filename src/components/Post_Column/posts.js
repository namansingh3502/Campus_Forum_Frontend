import React, { useEffect, useState } from "react";

import { FaPen } from "react-icons/all";
import ChannelTags from "./Posts/channelTags";
import PostText from "./Posts/postText";
import PostImage from "./Posts/postImage";
import UserReaction from "./Posts/User_Reaction/userReaction";
import UserDetails from "./Posts/userDetails";
import EditPostModal from "./Create_Edit_Post/editPostDialog";

export default function Posts(props) {
  const user = JSON.parse(localStorage.getItem("user_profile"));

  const [postData, setPostData] = useState(props.data);
  const [editButton, showEditButton] = useState(false);
  const [dialogVisibility, setDialogVisibility] = useState(false);

  useEffect(() => {
    if (props.data.user.id === user.id) {
      showEditButton(true);
    }
  }, []);

  return (
    <div className="py-4 px-2 bg-slate-500 bg-opacity-20 rounded-lg text-white h-auto">
      {/*{editButton ? (*/}
      {/*  <button*/}
      {/*    className={"float-right text-sm"}*/}
      {/*    aria-label={"Edit Post"}*/}
      {/*    onClick={() => {*/}
      {/*      setDialogVisibility(!dialogVisibility);*/}
      {/*    }}*/}
      {/*  >*/}
      {/*    <FaPen />*/}
      {/*  </button>*/}
      {/*) : null}*/}
      {/*{dialogVisibility ? (*/}
      {/*  <EditPostModal*/}
      {/*    dialogVisibility={dialogVisibility}*/}
      {/*    setDialogVisibility={() => {*/}
      {/*      setDialogVisibility(false);*/}
      {/*    }}*/}
      {/*    setPostData={(newPost) => {*/}
      {/*      setPostData(newPost);*/}
      {/*    }}*/}
      {/*    data={postData}*/}
      {/*  />*/}
      {/*) : null}*/}
      <UserDetails userdetail={postData.user} time={postData.post.time} />
      <ChannelTags channels={postData.post.posted_in} />
      <PostText text={postData.post.body} />
      <PostImage images={postData.media} />
      <UserReaction likes={postData.post.likes} post_id={postData.post.id} />
    </div>
  );
}

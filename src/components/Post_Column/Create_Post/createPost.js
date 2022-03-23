import React, {useState} from "react";
import CreatePostDialog from "./createPostDialog";

export default function CreatePost(props) {
  const [dialogVisibility, setDialogVisibility] = useState(false)
  const user = JSON.parse(localStorage.getItem('user_profile'))

  return (
    <>
      <div className="py-4 px-4 bg-gray-400 rounded-lg bg-opacity-10 text-white">
        <div className="flex items-center">
          <img
            src={`${process.env.HOST}${user.user_image}`}
            className="rounded-full bg-black h-14 w-14"
            alt={"userprofile"}
          />
          <button
            type={"button"}
            className={"bg-gray-400 rounded-full bg-opacity-20 w-full ml-4 h-12 px-4 text-left text-white text-lg"}
            onClick={() => {
              setDialogVisibility(true)
            }}
          >
            Start a Post...
          </button>
        </div>
      </div>

      <CreatePostDialog
        dialogVisibility={dialogVisibility}
        setDialogVisibility={() => {
          setDialogVisibility(!dialogVisibility)
        }}
        ChannelList={props.ChannelList}
        updatePosts={(newPost) => {
          props.updatePosts(newPost)
        }}
      />
    </>
  )
}
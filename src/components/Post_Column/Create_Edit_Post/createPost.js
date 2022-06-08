import React, { useState } from "react";
import CreatePostDialog from "./createPostDialog";
import Posts from "../posts";

export default function CreatePost() {
  const [post, setPost] = useState([]);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const user = JSON.parse(localStorage.getItem("user_profile"));

  return (
    <div>
      <div className="py-4 px-4 bg-slate-500 bg-opacity-20 rounded-lg text-white">
        <div className="flex items-center justify-items-center h-16 w-full ">
          <div className={"rounded-full h-16 w-16 flex items-center justify-items-center"}>
            <img
              src={`${user.user_image}`}
              className="rounded-full bg-black h-14 w-14 outline outline-offset-2 outline-2 outline-gray-400"
              alt={"userprofile"}
            />
          </div>

          <div className={"h-16 w-full pl-4 flex items-center justify-items-center"}>
            <button
                type={"button"}
                className={
                  "bg-gray-400 rounded-full bg-opacity-20 w-full h-12 px-4 text-left text-white text-lg"
                }
                onClick={() => {
                  setDialogVisibility(true);
                }}
            >
              Start a Post...
            </button>
          </div>
        </div>
      </div>

      {post.length !== 0 ? (
        <div className={"mt-2 space-y-2"}>
          {post.map((item) => {
            return <Posts key={item.post.id} data={item} />;
          })}
        </div>
      ) : null}

      {dialogVisibility && (
        <CreatePostDialog
          dialogVisibility={dialogVisibility}
          setDialogVisibility={() => {
            setDialogVisibility(false);
          }}
          addPost={(data) => {
            setPost([data, ...post]);
          }}
        />
      )}
    </div>
  );
}

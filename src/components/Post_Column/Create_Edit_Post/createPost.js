import React, { useState } from "react";
import CreatePostDialog from "./createPostDialog";
import PostLoading from "../Posts/postLoading";
import Posts from "../posts";

export default function CreatePost() {
  const [post, setPost] = useState([]);
  const [dialogVisibility, setDialogVisibility] = useState(false);
  const user = JSON.parse(localStorage.getItem("user_profile"));

  return (
    <div>
      <div className="py-4 px-4 bg-slate-500 bg-opacity-20 rounded-lg text-white">
        <div className="flex items-center">
          <img
            src={`${process.env.HOST}/media/${user.user_image}`}
            className="rounded-full bg-black h-14 w-14"
            alt={"userprofile"}
          />
          <button
            type={"button"}
            className={
              "bg-gray-400 rounded-full bg-opacity-20 w-full ml-4 h-12 px-4 text-left text-white text-lg"
            }
            onClick={() => {
              setDialogVisibility(true);
            }}
          >
            Start a Post...
          </button>
        </div>
      </div>

      {post.length !== 0 ?
        <div className={"mt-2 space-y-2"}>
          {post.map((item) => {
            return <Posts key={item.post.id} data={item} />;
          })}
        </div>
        : null
      }

      {dialogVisibility && (
        <CreatePostDialog
          dialogVisibility={dialogVisibility}
          setDialogVisibility={() => {
            setDialogVisibility(false);
          }}
          addPost={(data) => {
            console.log(data);
            setPost([...post, data])
          }}
        />
      )}
    </div>
  );
}

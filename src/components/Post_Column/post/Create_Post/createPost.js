import React from "react";

import image from "../../../../images/userimg.jpeg";

export default function CreatePost(props) {

  return (
    <div className="py-3 px-4 bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-white h-auto">
      <div className="flex items-center">
        <img
          src={image}
          className="rounded-full bg-black"
          alt={"logo"}
          style={{ width: 45, height: 45 }}
        />
        <button
          className="bg-gray-400 rounded-full bg-opacity-20 w-full ml-4 h-12 px-4 text-left text-white text-lg"
          onClick ={() => {
            props.updateNewPost();
          }}
        >
          Start a Post...
        </button>
      </div>
    </div>
  );
}

import React from "react";

export default function PostText(data) {
    return (
    <div className="px-2 my-2">
      <p className="text-md leading-6 whitespace-pre-line">{data.text}</p>
    </div>
  );
}

import React from "react";

export default function PostText(data) {
  return (
    <div className="my-2 lg:px-4 px-2">
      <p className="text-md leading-6 whitespace-pre-line">{data.text}</p>
    </div>
  );
}

import React from "react";

export default function PostText(text) {
  return (
    <div className="my-2 px-2">
      {text.is_edited && (
        <p>
          Edited : <br />
          <br />
        </p>
      )}
      <p className="text-md leading-6 whitespace-pre-line">{text.text}</p>
    </div>
  );
}

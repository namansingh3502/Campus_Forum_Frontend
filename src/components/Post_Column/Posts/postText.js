import React from "react";
import Linkify from "linkify-react";

export default function PostText(text) {
  return (
    <div className="my-2 px-2">
      {text.is_edited && (
        <p>
          Edited : <br />
          <br />
        </p>
      )}
      <div className={"text-md leading-6 whitespace-pre-line"}>
        <Linkify
          options={{
            tagName: "a",
            className: "text-blue-400 hover:underline underline-offset-2 px-1"
          }}
        >
          <p className="text-md leading-6 whitespace-pre-line">{text.text}</p>
        </Linkify>
      </div>
    </div>
  );
}

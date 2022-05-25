import React from "react";

export default function ChannelTags(props) {
  return (
    <div className="m-2 flex flex-wrap">
      {props.channels.map((channel) => {
        return (
          <div
            className={
              "bg-gray-400 bg-opacity-30 rounded-xl py-1 px-2 m-1 inline-block flex items-center max-w-fit text-sm text-slate-200 font-medium"
            }
            key={channel.id}
          >
            <span># {channel.name}</span>
          </div>
        );
      })}
    </div>
  );
}

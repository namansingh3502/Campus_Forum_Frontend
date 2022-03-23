import React from "react";
import {Link} from "react-router-dom";

export default function ChannelList(props) {
  const Channel = props.ChannelList;

  return (
    <div className="p-4 mt-2 bg-gray-400 rounded-xl bg-opacity-10 text-lg text-white font-medium">
      <h1 className="text-center text-xl border-b-2 border-gray-500 pb-1">Channels</h1>
      <div className="overflow-auto max-h-96 p-2">
        <ul>
          {Channel.map((item) => (
            <li
              className="pl-4 my-1 hover:bg-gray-400 hover:text-gray-700 bg-opacity-20 rounded-xl p-0.5 "
              key={item.id}
            >
              <Link
                to={`/Channel-Post/${item.id}`}
                key={item.id}
              >
                {item.name}
              </Link>
            </li>
          ))}
          </ul>
        </div>
    </div>
  )
}
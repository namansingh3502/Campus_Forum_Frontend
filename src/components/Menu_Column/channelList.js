import React from "react";
import {Link} from "react-router-dom";

export default function ChannelList() {
  const Channel = JSON.parse(localStorage.getItem('channels'));

  return (
    <div className="p-4 mt-2 bg-slate-500 bg-opacity-20 rounded-lg text-lg text-white font-medium">
      <h1 className="text-center text-xl border-b-2 border-gray-400">Channels</h1>
      <div className="overflow-auto max-h-72 p-2">
        <ul>
          {Channel.map((item) => (
            <li
              key={item.id}
              className="pl-4 my-1 hover:bg-gray-400 hover:text-gray-700 bg-opacity-20 rounded-xl p-0.5 "
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
import React from "react";

const Others = () => {
  const Channels = [
    "Code of Conduct",
    "Privacy Policy",
    "Terms of use",
  ];

  return (
    <div className="bg-gray-400 rounded-lg bg-opacity-10 backdrop-filter backdrop-blur-lg text-lg mt-2 p-4">
      <div className="text-center text-xl border-b-2 border-gray-500 text-white p-2">
        Extra
      </div>
      {Channels.map((item) => (
        <h1 className="font-medium text-white my-1 text-center" key={item}>
          {item}
        </h1>
      ))}
    </div>
  );
};

export default Others;

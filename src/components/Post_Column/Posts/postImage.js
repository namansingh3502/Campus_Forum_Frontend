import React from "react";

export default function PostImage(props) {
  const images = props.images;
  const imageCount = props.images.length;

  if (images.length === 0) {
    return null;
  }

  if (props.images.length === 1) {
    return (
      <div
        className={
          "h-52 bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-xl border-gray-700 border-2 mx-2"
        }
      >
        <a href={`${process.env.HOST}/media/${images[0].file}`} target="_blank">
          <img
            src={`${process.env.HOST}/media/${images[0].file}`}
            className={"object-contain h-full w-full max-h-fit"}
            alt={"image"}
          />
        </a>
      </div>
    );
  }

  return (
    <div className={"grid grid-cols-2 py-2 mx-2"}>
      {images.map((item, index) => {
        if (index === imageCount - 1 && imageCount % 2 === 1) {
          return (
            <div
              className={
                "col-span-2 bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-xl border-gray-700 border-2"
              }
              key={index}
            >
              <a
                href={`${process.env.HOST}/media/${item.file}`}
                target="_blank"
              >
                <img
                  src={`${process.env.HOST}/media/${item.file}`}
                  className={"object-contain h-44 w-full"}
                  alt={"image"}
                />
              </a>
            </div>
          );
        }
        return (
          <div
            className={
              "bg-slate-800 bg-opacity-50 backdrop-filter backdrop-blur-xl border-gray-700 border-2"
            }
            key={index}
          >
            <a href={`${process.env.HOST}/media/${item.file}`} target="_blank">
              <img
                src={`${process.env.HOST}/media/${item.file}`}
                className={"object-contain h-44 w-full"}
                alt={"image"}
              />
            </a>
          </div>
        );
      })}
    </div>
  );
}

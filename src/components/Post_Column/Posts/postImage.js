export default function PostImage(props) {
  const imageCount = props.images.length;

  return (
    <div className={"grid grid-cols-2 mx-2"}>
      {props.images?.map((image, index) => {
        let url;

        if (image.status === "success") {
          url = URL.createObjectURL(image.data);
        }
        return (
          <div
            className={`${
              (index === imageCount - 1 && imageCount % 2 === 1) ||
              imageCount === 1
                ? "col-span-2 "
                : ""
            }bg-slate-900 bg-opacity-50 backdrop-filter backdrop-blur-xl border-gray-700 border-2 flex items-center justify-center`}
            key={index}
          >
            {image.status === "success" && (
              <a href={url} target="_blank">
                <img
                  src={url}
                  className={"object-contain h-fit w-full max-h-80 self-center"}
                  alt={"image"}
                />
              </a>
            )}

            {image.status === "error" && (
              <div className={"bg-gray-800 h-40 w-full border-gray-700 border"}>
                Error while loading image
              </div>
            )}

            {image.status === "loading" && (
              <div
                className={
                  "leading-relaxed animate-pulse bg-gray-700 h-40 w-full"
                }
              />
            )}
          </div>
        );
      })}
    </div>
  );
}

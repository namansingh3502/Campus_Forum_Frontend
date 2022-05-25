export default function CommentLoading() {
  return (
    <div className={"mx-2 w-full flex "}>
      <div className={"h-12 w-12 mt-2"}>
        <div
          className={
            "h-12 w-12 bg-gray-500 rounded-full animate-pulse items-stretch"
          }
        />
      </div>
      <div
        className={
          "flex-row w-1/2 mx-4 my-2 py-2 px-2 rounded-lg bg-slate-500 bg-opacity-20 overflow-hidden space-y-2"
        }
      >
        <div className={"flex items-center"}>
          <div
            className={"leading-relaxed w-2/3 h-4 animate-pulse bg-gray-400"}
          />
          <span className={"ml-2"}>@</span>
          <div
            className={
              "ml-1 leading-relaxed w-1/3 h-4 animate-pulse bg-gray-400"
            }
          />
        </div>
        <div
          className={"leading-relaxed w-4/5 h-2 animate-pulse bg-gray-400"}
        />
        <div
          className={"leading-relaxed w-2/3 h-2 animate-pulse bg-gray-400"}
        />
      </div>
    </div>
  );
}

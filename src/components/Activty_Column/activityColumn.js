export default function ActivityColumn (){
  return (
    <div className={"lg:basis-5/12 xl:basis-4/12 hidden lg:block"}>
      <div
        className={"p-4 bg-slate-500 bg-opacity-20 rounded-lg text-lg"}
        style={{ height: 400 }}
      >
        <h1 className={"text-center text-xl border-b-2 border-gray-500 text-white pb-2"}>
          Activity
        </h1>
      </div>
    </div>
  );
}

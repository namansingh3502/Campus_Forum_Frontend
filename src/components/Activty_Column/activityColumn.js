export default function ActivityColumn (){

  const data = [
    {id:1, text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit."},
    {id:2, text: "Ut enim ad minim veniam, quis nostrud exercitation ullamco ex ea commodo consequat."},
    {id:3, text: "Duis aute irure dolor in reprehenderit in."},
    {id:4, text: "Excepteur sint occaecat cupidatat non proident."},
  ]

  return (
    <div className={"h-auto"}>
      <div
        className={"h-auto p-4 bg-slate-500 bg-opacity-20 rounded-lg text-lg inline-block"}
      >
        <h1 className={"text-center text-xl border-b-2 border-gray-500 text-white pb-2"}>
          Activity
        </h1>
        <div className={"pl-4"}>
          <ul className={"list-disc text-white text-md"}>
            {data.map((item)=>{
              return(
                <li className={"py-2 font-light"} key={item.id}>
                  {item.text}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

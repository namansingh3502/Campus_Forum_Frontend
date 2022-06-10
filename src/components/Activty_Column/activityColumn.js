export default function ActivityColumn() {
  const data = [
    { id: 1, text: "4th year North vs 2nd Year South cricket match from 10:00 am." },
    {
      id: 2,
      text: "4th year South vs 2nd Year North cricket match from 3:30 pm.",
    }
  ];

  return (
    <div className={"h-auto"}>
      <div
        className={
          "h-auto p-4 bg-slate-500 bg-opacity-20 rounded-lg text-lg inline-block"
        }
      >
        <h1
          className={
            "text-center text-xl border-b-2 border-gray-500 text-white pb-2"
          }
        >
          News
        </h1>
        <div className={"pl-4"}>
          <ul className={"list-disc text-white text-md"}>
            {data.map((item) => {
              return (
                <li className={"py-2 font-light"} key={item.id}>
                  {item.text}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}

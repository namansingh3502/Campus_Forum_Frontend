import React, { Fragment, useEffect, useState } from "react";
import { Combobox, Transition } from "@headlessui/react";
import { CheckIcon, SelectorIcon } from "@heroicons/react/solid";
import { AiOutlineClose } from "react-icons/all";

export default function ChannelSelect(props) {
  const channel = JSON.parse(localStorage.getItem("channels")).data;

  const [selectedChannels, updateSelectedChannel] = useState(
    props.selectedChannels
  );
  const [selected, setSelected] = useState([]);
  const [query, setQuery] = useState("");

  function addChannel(newChannel) {
    for (let i = 0; i < selectedChannels.length; i++) {
      if (newChannel.id === selectedChannels[i].id) {
        return;
      }
    }
    let data = selectedChannels;
    data.push(newChannel);
    updateSelectedChannel(data);
    props.setSelectedChannel(data);
  }

  function removeChannel(removedChannel) {
    let data = [];
    for (let i = 0; i < selectedChannels.length; i++) {
      if (selectedChannels[i].id !== removedChannel.id) {
        data.push(selectedChannels[i]);
      }
    }
    updateSelectedChannel(data);
    props.setSelectedChannel(data);
  }

  const filteredChannel =
    query === ""
      ? channel
      : channel.filter((channel) =>
          channel.name
            .toLowerCase()
            .replace(/\s+/g, "")
            .includes(query.toLowerCase().replace(/\s+/g, ""))
        );

  useEffect(() => {}, [selectedChannels]);

  return (
    <div className="min-w-full">
      <Combobox value={selected} onChange={setSelected}>
        <div className={"px-4 w-full"}>
          <div
            className={"my-4 flex flex-wrap text-white max-h-40 overflow-auto"}
          >
            {selectedChannels.map((channel) => {
              return (
                <div
                  className={
                    "bg-indigo-700 rounded-xl py-1 px-2 m-1 inline-block flex items-center max-w-fit text-sm"
                  }
                  key={channel.id}
                >
                  <span>{channel.name}</span>
                  <button
                    type={"button"}
                    className={"ml-2 p-0.5 hover:rounded-full hover:bg-red-400"}
                    onClick={() => {
                      removeChannel(channel);
                    }}
                  >
                    <AiOutlineClose />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="relative w-full text-left bg-transparent rounded-lg sm:text-sm overflow-hidden mt-2">
            <Combobox.Input
              placeholder={"Select Channels...."}
              className={
                "w-full h-10 px-2 border-none text-lg bg-slate-600 bg-opacity-30 text-slate-200 focus:outline-none placeholder:text-slate-300"
              }
              displayValue={"Select Channels...."}
              onChange={(event) => setQuery(event.target.value)}
            />
            <Combobox.Button
              className={
                "absolute inset-y-0 right-0 flex items-center pr-2 border-l border-slate-500"
              }
            >
              <SelectorIcon
                className="w-10 h-7 text-slate-300"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>

          <div className={"relative"}>
            <Transition
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
              afterLeave={() => setQuery("")}
            >
              <Combobox.Options className="absolute py-1 mt-1 overflow-auto rounded-md bg-slate-800 max-h-60 sm:text-sm w-full z-20">
                {filteredChannel.length === 0 && query !== "" ? (
                  <div className="relative py-2 px-4">Nothing found.</div>
                ) : (
                  filteredChannel.map((channel) => (
                    <Combobox.Option
                      key={channel.id}
                      className={({ active }) =>
                        `select-none relative py-1 w-full px-4 w-full ${
                          active
                            ? "bg-indigo-700 text-white backdrop-blur-md"
                            : ""
                        } group flex rounded-lg items-center w-full px-2 py-2`
                      }
                      value={channel}
                    >
                      <button
                        type={"button"}
                        className={"block truncate text-md w-full text-left"}
                        value={channel.name}
                        onClick={() => {
                          addChannel(channel);
                        }}
                      >
                        {channel.name}
                      </button>

                    {/*{({ selected, active }) => (*/}
                    {/*  <>*/}
                    {/*    <span*/}
                    {/*      className={`block truncate ${*/}
                    {/*        selected ? 'font-medium' : 'font-normal'*/}
                    {/*      }`}*/}
                    {/*    >*/}
                    {/*      {person.name}*/}
                    {/*    </span>*/}

                    {/*    {selected ? (*/}
                    {/*      <span*/}
                    {/*        className={`absolute inset-y-0 left-0 flex items-center pl-3 ${*/}
                    {/*          active ? 'text-slate-200' : 'text-teal-600'*/}
                    {/*        }`}*/}
                    {/*      >*/}
                    {/*        <CheckIcon className="w-5 h-5" aria-hidden="true" />*/}
                    {/*      </span>*/}
                    {/*    ) : null}*/}
                    {/*  </>*/}
                    {/*)}*/}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>
  );
}

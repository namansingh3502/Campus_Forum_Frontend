import { Disclosure, Transition } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import React, { Fragment } from "react";
import { NavLink } from "react-router-dom";

export default function SideMenu(props) {
  const user = JSON.parse(localStorage.getItem("user_profile"));
  const channels = JSON.parse(localStorage.getItem("channels"));

  return (
    <Disclosure.Panel
      className={
        "sm:hidden min-h-screen bg-gray-800 text-white text-lg border-t-2"
      }
    >
      <div className={"w-full flex flex-col items-center justify-center mt-4"}>
        <div className={"h-24 w-24 rounded-full"}>
          <img
            src={`${process.env.HOST}/media/${user.user_image}`}
            className={"h-24 w-24 rounded-full"}
          />
        </div>
        <div className={"mt-4 text-center"}>
          <span className={"text-xl"}>{user.full_name}</span>
          <br />
          <span className={"text-lg"}>@{user.username}</span>
        </div>
      </div>

      <div className="pt-2 pb-4 space-y-1">
        <Disclosure.Button
          as={"a"}
          href={"/"}
          className={`hover:bg-gray-700 block px-4 py-1`}
        >
          Home
        </Disclosure.Button>

        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="flex justify-between w-full px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                Channels
                <ChevronUpIcon
                  className={`${open ? "transform rotate-180" : ""} w-5 h-5`}
                />
              </Disclosure.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-60"
                enterFrom="transform opacity-0 scale-90"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-90"
              >
                <div className={"overflow-y-scroll max-h-56"}>
                  <Disclosure.Panel className="px-4 pb-2 text-sm text-gray-500">
                    {channels?.status === "success" &&
                      channels.data?.map((channel) => (
                        <Disclosure.Button
                          key={channel.name}
                          as="a"
                          href={`channel/${channel.name}`}
                          className={`text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium`}
                        >
                          {channel.name}
                        </Disclosure.Button>
                      ))}
                  </Disclosure.Panel>
                </div>
              </Transition>
            </>
          )}
        </Disclosure>

        <Disclosure.Button
          as={"div"}
          className={`hover:bg-gray-700 block px-4 py-1`}
        >
          <NavLink to={`profile/${user.username}`}>Profile</NavLink>
        </Disclosure.Button>

        {/*<NavLink to={`settings`} className={`hover:bg-gray-700 block px-4 py-1`}>*/}
        {/*  Settings*/}
        {/*</NavLink>*/}

        <button
          className={"w-full text-left hover:bg-gray-700 block px-4 py-1"}
          onClick={() => {
            props.logout();
          }}
        >
          Sign out
        </button>
      </div>
    </Disclosure.Panel>
  );
}

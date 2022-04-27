import { Menu, Transition } from "@headlessui/react";
import {BiHide, BsPencilSquare, FiMoreVertical} from "react-icons/all";
import { Fragment } from "react";

export default function EditPostButton(props) {
  return (
    <div className={"float-right text-xl font-extrabold"}>
      <Menu as="div" className="relative inline-block text-left">
        <div>
          <Menu.Button className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
            <FiMoreVertical
              className={
                "w-5 h-5 ml-2 -mr-1 text-violet-200 hover:text-violet-100"
              }
              aria-hidden={"true"}
            />
          </Menu.Button>
        </div>
        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items
            className={
              "z-20 absolute right-0 w-36 mt-2 origin-top-right bg-gray-700 text-white divide-y divide-gray-100 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
            }
          >
            <div className="px-1 py-1 ">
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-700 text-white" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2`}
                    onClick={()=>props.setDialogVisibility()}
                  >
                    <BsPencilSquare className={"text-md"} />
                    <span className={"ml-2 text-sm"}>Edit</span>
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-indigo-700 text-white backdrop-blur-md" : "text-white"
                    } group flex rounded-md items-center w-full px-2 py-2`}
                  >
                    <BiHide className={"text-md"} />
                    <span className={"ml-2 text-sm"}>Hide Post</span>
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>{" "}
    </div>
  );
}

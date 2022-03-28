import {Menu, Transition} from "@headlessui/react";
import React, {Fragment} from "react";
import {NavLink} from "react-router-dom";


export default function ProfileMenu(props){
  const user = JSON.parse(localStorage.getItem('user_profile'))

  return(
    <div className="lg:absolute lg:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex hidden sm:block">
      {/* Profile dropdown */}
      <Menu as="div" className="ml-3 relative flex">
        <div>
          <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
            <span className="sr-only">Open user menu</span>
            <img
              className="h-10 w-10 lg:h-10 lg:w-10 rounded-full"
              src={`${user.user_image}`}
              alt=""
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
          <Menu.Items className={"absolute right-0 mt-12 sm:mt-14 w-40 rounded-md py-1 bg-gray-700 ring-1 ring-black ring-opacity-5 focus:outline-none text-white text-md"}>
            <Menu.Item>
              <div className={`block px-4 py-1 mt-4`} >
                Signed in as
                @{user.username}
              </div>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <NavLink
                  to={`profile`}
                  className={`${active ? 'bg-gray-500 bg-opacity-30 backdrop-blur-md' : ''} block px-4 py-2`}
                >
                  Your Profile
                </NavLink>
              )}
            </Menu.Item>
            {/*<Menu.Item>*/}
            {/*  {({ active }) => (*/}
            {/*    <NavLink*/}
            {/*      to={`settings`}*/}
            {/*      className={`${active ? 'bg-gray-500 bg-opacity-30 backdrop-blur-md' : ''} block px-4 py-2`}*/}
            {/*    >*/}
            {/*      Settings*/}
            {/*    </NavLink>*/}
            {/*  )}*/}
            {/*</Menu.Item>*/}
            <Menu.Item>
              {({ active }) => (
                <button
                  type={"button"}
                  className={`${active ? 'bg-gray-500 bg-opacity-30 backdrop-blur-md' : ''} block px-4 py-2 w-full text-left`}
                  onClick={()=>{props.logout()}}
                >
                  Sign out
                </button>
              )}
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </Menu>
    </div>
  )
}
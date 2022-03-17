import React, {Fragment} from "react";
import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'

import userImage from "../images/userimg.jpeg"
import {ChevronUpIcon, MenuIcon, XIcon} from "@heroicons/react/solid";

const navigation = [
  { name: 'Dashboard', href: '', current: true },
  { name: 'Profile', href: 'profile', current: false },
  { name: 'Projects', href: 'setting', current: false },
  { name: 'Calendar', href: '#', current: false },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header (props) {
  const user = JSON.parse(localStorage.getItem('user_profile'))
  let navigate = useNavigate();

  function logout(){
    axios.post(
      `${process.env.HOST}/auth/token/logout/`, {},
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        }
      }
    )
    .then((response) => {
      if ((response.status === 204)) {
        localStorage.clear()
        props.updateLoggedIn()
        navigate(`/login`)
      } else {
        console.log(response.status, response.data.msg)
      }
    })
    .catch((error) => {
      console.log("check error at login page. \n",error)
    })
  }

  return (

    <Disclosure as="nav" className="sticky top-0 z-10 bg-opacity-60 backdrop-blur-md bg-gray-800 ring-1">
      {({ open }) => (
        <>
          <div className="w-full lg:w-4/5 xl:w-3/5 mx-auto p-2 sm:px-6 h-12 lg:h-16">
            <div className="relative flex items-center h-full">

              <div className="flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-1 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XIcon className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <MenuIcon className="block h-5 w-5" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>

              <div className="flex-1 flex items-center justify-center sm:justify-start">
                <NavLink to={``} >
                  <h1 className="font-bold text-center text-xl lg:text-3xl text-yellow-500">
                    College<span className="text-blue-500 ml-2">Forum</span>
                  </h1>
                </NavLink>
              </div>

              <div className="lg:absolute lg:right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 flex hidden md:block">
                {/* Profile dropdown */}
                <Menu as="div" className="ml-3 relative flex">
                  <div>
                    <Menu.Button className="bg-gray-800 flex text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                      <span className="sr-only">Open user menu</span>
                      <img
                        className="h-8 w-8 lg:h-10 lg:w-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
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
                    <Menu.Items className={"absolute right-0 mt-12 sm:mt-14 w-40 rounded-md shadow-lg py-1 bg-opacity-30 backdrop-blur-md bg-gray-500 ring-1 ring-black ring-opacity-5 focus:outline-none text-white text-md"}>
                      <Menu.Item>
                          <div className={`block px-4 py-1`} >
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
                      <Menu.Item>
                        {({ active }) => (
                          <NavLink
                            to={`settings`}
                            className={`${active ? 'bg-gray-500 bg-opacity-30 backdrop-blur-md' : ''} block px-4 py-2`}
                          >
                            Settings
                          </NavLink>
                        )}
                      </Menu.Item>
                      <Menu.Item>
                        {({ active }) => (
                          <button
                            type={"button"}
                            className={`${active ? 'bg-gray-500 bg-opacity-30 backdrop-blur-md' : ''} block px-4 py-2 w-full text-left`}
                            onClick={()=>{logout()}}
                          >
                            Sign out
                          </button>
                        )}
                      </Menu.Item>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>

            </div>
          </div>

          <Disclosure.Panel className={"sm:hidden min-h-screen bg-gray-800 text-white text-lg"}>

            <div className={"w-full flex flex-col items-center justify-center mt-4"}>
              <div className={"h-24 w-24 rounded-full"}>
                <img
                  src={`${process.env.HOST}${user.user_image}`}
                  className={"h-24 w-24 rounded-full"}
                />
              </div>
              <div className={"mt-4 text-center"}>
                <span className={"text-xl"}>{user.first_name} {user.middle_name} {user.last_name}</span><br/>
                <span className={"text-lg"}>@{user.username}</span>
              </div>
            </div>

            <div className="pt-2 pb-4 space-y-1">
              <NavLink
                to={``}
                className={`hover:bg-gray-700 block px-4 py-1`}
              >
                Home
              </NavLink>

              <Disclosure>
                {({ open }) => (
                  <>
                    <Disclosure.Button className="flex justify-between w-full px-4 py-2 focus:outline-none focus-visible:ring focus-visible:ring-opacity-75">
                      Channels
                      <ChevronUpIcon className={`${open ? 'transform rotate-180' : ''} w-5 h-5`}/>
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
                          {navigation.map((item) => (
                            <Disclosure.Button
                              key={item.name}
                              as="a"
                              href={item.href}
                              className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block px-3 py-2 rounded-md text-base font-medium'
                              )}
                              aria-current={item.current ? 'page' : undefined}
                            >
                              {item.name}
                            </Disclosure.Button>
                          ))}
                        </Disclosure.Panel>
                      </div>
                    </Transition>
                  </>
                )}
              </Disclosure>


              <NavLink to={`profile`} className={`hover:bg-gray-700 block px-4 py-1`}>
                Profile
              </NavLink>

              <NavLink to={`settings`} className={`hover:bg-gray-700 block px-4 py-1`}>
                Settings
              </NavLink>

              <button
                className={"w-full text-left hover:bg-gray-700 block px-4 py-1"}
                onClick={()=>{logout()}}
              >
                Sign out
              </button>

            </div>

          </Disclosure.Panel>

        </>
      )}
    </Disclosure>
  )
};
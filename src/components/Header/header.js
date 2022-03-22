import axios from "axios";
import {NavLink, useNavigate} from "react-router-dom";
import { Disclosure, Menu, Transition } from '@headlessui/react'

import {MenuIcon, XIcon} from "@heroicons/react/solid";
import SideMenu from "./sideMenu";
import ProfileMenu from "./profileMenu";

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

    <Disclosure as="nav" className="sticky top-0 z-10 bg-opacity-60 backdrop-blur-md bg-gray-800 ring-1 ">
      {({ open }) => (
        <>
          <div className="w-full xl:w-10/12 container mx-auto p-2 sm:px-6 h-12 lg:h-16 max-w-screen-xl">
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

              <ProfileMenu
                logout={logout}
              />

            </div>
          </div>
          <SideMenu
            logout={logout}
          />
        </>
      )}
    </Disclosure>
  )
};
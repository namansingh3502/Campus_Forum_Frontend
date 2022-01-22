import React, {Component, useEffect, useState} from "react";
import axios from "axios";
import {Navigate, useLocation, useNavigate} from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';

  const [Username, updateUsername] = useState("")
  const [Password, updatePassword] = useState("")

  function login(){
    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .post(
        `${host}/auth/token/login/`,
        {
          username: Username,
          password: Password
        },
        {}
      )
      .then((response) => {
        if ((response.status === 200)) {
            localStorage.setItem('Token','Token ' + response.data.auth_token)
            navigate(from, { replace: true })
        } else {
          console.log(response.status, response.data.msg)
        }
      })
      .catch((error) => {
        console.log("check error at login page. \n",error)
      })
  }

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if(token){
      console.log(token)
      navigate(`/`)
    }
  },[])

  return(
    <div className="font-sans min-h-screen antialiased bg-gray-900 pt-24 pb-5">
      <div className="flex flex-col justify-center sm:w-96 sm:m-auto mx-5 mb-5 space-y-8">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          Campus<span className="text-blue-500 ml-2">Forum</span>
        </h1>
          <form onSubmit={(e) => {
              e.preventDefault();
              login()
            }}
          >
            <div className="flex flex-col bg-white p-10 rounded-lg shadow space-y-10">
              <h1 className="font-bold text-xl text-center">Sign in to your account</h1>
              <div className="flex flex-col space-y-1">
                <input
                  type="text"
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                  placeholder="Username"
                  value={Username}
                  onChange={(e => {updateUsername(e.target.value)})}
                />
              <div className="flex flex-col space-y-1">
                <input
                  type="password"
                  className="border-2 rounded px-3 py-2 w-full focus:outline-none focus:border-blue-400 focus:shadow"
                  placeholder="Password"
                  value={Password}
                  onChange={(e => {updatePassword(e.target.value)})}
                />
              </div>
              <div className="flex flex-col-reverse sm:flex-row sm:justify-between items-center w-full">
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white font-bold text-center py-2 rounded focus:outline-none shadow hover:bg-blue-700 transition-colors">
                  Log In
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
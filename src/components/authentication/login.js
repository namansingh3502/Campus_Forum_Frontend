import React, { useEffect, useState} from "react";
import axios from "axios";
import {useLocation, useNavigate} from "react-router-dom";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || '/';


  const [username, updateUsername] = useState("")
  const [password, updatePassword] = useState("")
  const [errorMsg, updateErrorMsg] = useState('')

  function login(){
    const data = {
      username: username,
      password: password
    }
    axios.post(`${process.env.HOST}/auth/token/login/`, data, {})
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('Token','Token ' + response.data.auth_token)
        navigate(from, { replace: true })
      }
    })
    .catch((error) => {
      updateErrorMsg('Username or Password incorrect.')
      console.log("Error while login. \n",error)
    })
  }

  useEffect(() => {
    const token = localStorage.getItem('Token')
    if(token){
      navigate(`/`)
    }
  },[errorMsg])


  return(
    <div className={"font-sans min-h-screen min-w-fit antialiased flex items-center justify-center"}>
      <div className={"mx-2 rounded-xl bg-white py-8 px-4" }>
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          Campus<span className="text-blue-500 ml-2">Forum</span>
        </h1>

        <div className={"text-center mt-4"}>
          <span className="font-bold text-xl">Sign in to your account</span>
        </div>

        <form onSubmit={(e) => {
          e.preventDefault();
          login()
        }}
        >
          <label className="block p-2 mt-4 space-y-4">
            <div>
              <span className={"text-lg"}>Username</span>
              <input
                type="text"
                className="form-input rounded px-2 w-full border-gray-300 focus:outline-none focus:border-blue-400"
                placeholder="Username"
                value={username}
                onChange={(e => {updateUsername(e.target.value)})}
                autoFocus
              />
            </div>
            <div>
              <span className={"mt-4 text-lg"}>Password</span>
              <input
                type="password"
                className="form-input rounded px-2 py-2 w-full border-gray-300 focus:outline-none focus:border-blue-400"
                placeholder="Password"
                value={password}
                onChange={(e => {updatePassword(e.target.value)})}
              />
            </div>
          </label>

          <div className={"my-4 px-2 text-md text-red-700"}>
            {errorMsg}
          </div>
          <div className="w-full px-1">
            <button
              type="submit"
              className="w-full bg-blue-500 text-white font-bold text-center py-2 rounded hover:bg-blue-700 transition-colors">
              Log In
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
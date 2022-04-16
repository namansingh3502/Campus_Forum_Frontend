import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFormState } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";
import loginApi from "../../api/loginApi";

export default function Login() {
  let navigate = useNavigate();
  let location = useLocation();
  let from = location.state?.from?.pathname || "/";

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    reset,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const res = await axios.post(`/auth/token/login/`, data, {});
      localStorage.setItem("Token", "Token " + res.data.auth_token);
      navigate(from, { replace: true })
    } catch (e) {
      setError("server_error", {
        type: "",
        message: "Incorret username or password.",
      });
    }
  };

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ username: "", password: "" });
    }
  }, [reset, isSubmitSuccessful, isSubmitting]);

  return (
    <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center">
      <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 sm:w-2/3 md:w-1/2 lg:w-1/3">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          Campus<span className="text-blue-500 ml-2">Forum</span>
        </h1>

        <div className={"text-center mt-4"}>
          <span className="font-bold text-xl">Sign in to your account</span>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="block p-2 mt-4 space-y-4">
            <label className={"text-lg"}>
              Username{" "}
              <span className={"text-red-600 text-sm"}>
                *{errors.username?.message}
              </span>
            </label>
            <input
              className="rounded-lg px-2 py-2 w-full border-gray-300 focus:outline-none focus:border-blue-400 border-2"
              {...register("username", { required: "field required" })}
              placeholder="Username"
              autoFocus
            />
            <label className={"mt-4 text-lg"}>
              Password{" "}
              <span className={"text-red-600 text-sm"}>
                *{errors.password?.message}
              </span>
            </label>
            <input
              type="password"
              className="rounded-lg px-2 py-2 w-full border-gray-300 focus:outline-none focus:border-blue-400 border-2"
              {...register("password", { required: "field required" })}
              placeholder="Password"
            />

            {errors.server_error && (
              <p className={"text-red-600"}>
                *{errors.server_error.message}
              </p>
            )}

            <div className="w-full px-1">
              <button
                type="submit"
                onClick={() => clearErrors()}
                className="w-full bg-blue-500 text-white font-bold text-center py-2 rounded hover:bg-blue-700 transition-colors"
              >
                Log In
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

/*
function Logiin() {
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
    axios.post(`${process.env.HOST}/api/auth/token/login/`, data, {})
    .then((response) => {
      if (response.status === 200) {
        localStorage.setItem('Token','Token ' + response.data.auth_token)
        navigate(from, { replace: true })
      }
    })
    .catch((error) => {
      updateErrorMsg(error.response.data)
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
      <div className={"mx-2 rounded-xl bg-gray-100 py-8 px-4" }>
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
                className="rounded-lg px-2 py-2 w-full border-gray-300 focus:outline-none focus:border-blue-400 border-2 "
                placeholder="Username"
                value={username}
                onChange={(e => {updateUsername(e.target.value)})}
                autoFocus
              />
              <div className={"px-2 text-md text-red-700"}>
                {errorMsg.username && <p>*{errorMsg.username}</p>}
              </div>
            </div>
            <div>
              <span className={"mt-4 text-lg"}>Password</span>
              <input
                type="password"
                className="rounded-lg px-2 py-2 w-full border-gray-300 focus:outline-none focus:border-blue-400 border-2"
                placeholder="Password"
                value={password}
                onChange={(e => {updatePassword(e.target.value)})}
              />
            <div className={"px-2 text-md text-red-700"}>
              {errorMsg.password && <p>*{errorMsg.password}</p>}
            </div>
            </div>
          </label>

          <div className={"my-4 px-2 text-md text-red-700"}>
            {errorMsg.non_field_errors && <p>Username or Password incorrect.</p>}
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
}*/

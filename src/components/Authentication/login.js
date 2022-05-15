import React, { useEffect, useState } from "react";
import axios from "axios";
import { useForm, useFormState } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { useLocation, useNavigate } from "react-router-dom";

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
      const res = await axios.post(`/api/auth/token/login/`, data, {});
      if (res.status === 200) {
        localStorage.setItem("Token", "Token " + res.data.auth_token);
        navigate(from, { replace: true });
      }
    } catch (e) {
      setError("server_error", {
        type: "",
        message: "Incorrect username or password.",
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
      <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 sm:w-2/5 md:w-2/5 xl:w-1/4">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          SJBIT CSE<span className="text-blue-500 ml-2">Forum</span>
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
              <p className={"text-red-600"}>*{errors.server_error.message}</p>
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
        <div className="mt-6 text-grey-dark">
          Create account?
          <a className="text-blue-600 hover:underline ml-2" href="/registration">
            Sign up
          </a>
        </div>
      </div>
    </div>
  );
}

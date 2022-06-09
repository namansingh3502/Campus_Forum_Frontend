import { useParams } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useState } from "react";
import React from "react";

const ResetPassword = () => {
  let { uidb64, token } = useParams();
  const [updateStatus, setUpdateStatus] = useState(false);
  const [invalidLink, setInvalidLink] = useState(false);
  const [disableSubmit, setDisableSubmit] = useState(false)

  const {
    register,
    handleSubmit,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: { password1: "", password2: "" },
  });

  function reset_password(data) {
    setDisableSubmit(true)
    axios
      .post("/api/auth/reset_password", { data, uidb64, token }, {})
      .then((res) => {
        setUpdateStatus(true);
      })
      .catch((errors) => {
        setInvalidLink(true)
        setDisableSubmit(false)
      });
  }

  if(invalidLink){
    return (
      <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center">
        <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 sm:w-2/5 md:w-2/5 xl:w-1/4">
          <h1 className="font-bold text-center text-4xl text-yellow-500">
            College<span className="text-blue-500 ml-2">Forum</span>
          </h1>

          <div className={"text-center mt-4"}>
            <span className="font-bold text-xl">Reset Password.</span>
          </div>

          <p className={"my-4"}>
            Password reset link is invalid!
          </p>

        </div>
      </div>
    )
  }

  return (
    <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center">
      <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 sm:w-2/5 md:w-2/5 xl:w-1/4">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          SJBIT CSE<span className="text-blue-500 ml-2">Forum</span>
        </h1>

        <div className={"text-center mt-4"}>
          <span className="font-bold text-xl">Reset Password.</span>
        </div>

        {updateStatus ? (
          <p className={"my-4"}>
            Password changed successfully. Click here to
            <a
              className={
                "text-blue-600 font-medium underline underline-offset-2 px-1"
              }
              href={"/login"}
            >
              Login
            </a>
          </p>
        ) : (
          <form className={"py-2"} onSubmit={handleSubmit(reset_password)}>
            <div className={"w-full px-1 py-2"}>
              <label className="block mx-1">
                <span>Password</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.password1?.message}
                </span>
              </label>
              <input
                type="password"
                placeholder="**********"
                className={
                  "w-1/2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("password1", {
                  required: "field required",
                  minLength: { value: 8, message: "min length 8" },
                })}
              />
            </div>
            <div className={"w-full px-1 py-2"}>
              <label className="block mx-1">
                <span>Re-enter Password</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.password2?.message}
                </span>
              </label>
              <input
                type="password"
                placeholder="**********"
                className={
                  "w-1/2 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("password2", {
                  required: "field required",
                  minLength: { value: 8, message: "min length 8" },
                })}
              />
            </div>
            <span className={"text-sm w-full m-2 space-y-1"}>
              <p>
                Your password can’t be too similar to your other personal
                information.
              </p>
              <p>Your password must contain at least 8 characters.</p>
              <p>Your password can’t be a commonly used password.</p>
              <p>Your password can’t be entirely numeric.</p>
            </span>
            <div className="flex">
              <button
                onClick={() => clearErrors()}
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                disabled={disableSubmit}
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

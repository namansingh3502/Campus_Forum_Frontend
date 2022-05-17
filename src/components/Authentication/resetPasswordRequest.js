import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const ResetPasswordRequest = () => {
  let navigate = useNavigate();
  const token = localStorage.getItem("Token");
  const [mailSent, setMailSent] = useState(false);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitSuccessful, isSubmitting },
  } = useForm({
    defaultValues: { email: "" },
  });

  function reset_password_request(data) {
    axios
      .post("/api/auth/reset_password_request/", { data }, {})
      .then((res) => {
        setMailSent(true);
      })
      .catch((errors) => {
        setError("account_not_exist", {
          type: "focus",
          message: "No user exists with given email.",
        });
      });
  }

  useEffect(() => {
    if (token) navigate("/", { replace: true });
  });

  return (
    <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center">
      <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 md:w-3/5 xl:w-1/4">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          SJBIT CSE<span className="text-blue-500 ml-2">Forum</span>
        </h1>

        <div className={"text-center mt-4"}>
          <span className="font-bold text-xl">Reset Password.</span>
        </div>

        {mailSent ? (
          <div className={"my-4"}>
            <p>Password reset link has been sent to registered mail.</p>
          </div>
        ) : (
          <form className={"py-2"} onSubmit={handleSubmit(reset_password_request)}>
            <div className={"w-full px-1 py-2"}>
              <p className={"m-1"}>Enter your registered email.</p>

              <label className="block mx-1">
                <span>Email</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>{errors.email?.message}</span>
              </label>
              <input
                type="email"
                placeholder="example@sjbit.edu.in"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("email", {
                  required: "field required",
                  pattern: {
                    value: /^[A-Z\d._%+-]+@sjbit.edu.in$/i,
                    message: "invalid email address",
                  },
                })}
              />

              {errors.account_not_exist && (
                <p className={"text-red-600"}>
                  *{errors.account_not_exist.message}
                </p>
              )}
            </div>
            <div className="flex">
              <button
                onClick={() => clearErrors()}
                className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900"
                disabled={isSubmitting}
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

export default ResetPasswordRequest;

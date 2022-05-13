import { useForm, Controller } from "react-hook-form";
import React from "react";
import ReactSelect from "react-select";
import axios from "axios";

const GENDER = [
  { value: "M", label: "Male" },
  { value: "F", label: "Female" },
];

const DEPARTMENT = [
  { value: "CSE", label: "Computer Science and Engineering" },
  { value: "ISE", label: "Information Science and Engineering" },
  { value: "ECE", label: "Electronics and Communications Engineering" },
  { value: "EEE", label: "Electrical and Electronics Engineering'" },
  { value: "CIVIL", label: "Civil" },
  { value: "MECH", label: "Mechanical" },
];

const UserRegistration = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful, isSubmitting },
    setError,
    reset,
    control,
    clearErrors,
  } = useForm({
    defaultValues: {
      username: "",
      password1: "",
      password2: "",
      firstName: "",
      middleName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      department: "",
    },
  });

  function createUser(data) {
    console.log("data ", data);

    axios
      .post("register", { data }, {})
      .then((res) => {
        if (res.status === 200) {
          console.log("user created");
        }
      })
      .catch((errors) => {
        console.log(errors.response);
      });
  }

  return (
    <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center p-2 md:px-4">
      <div className=" rounded-xl bg-gray-100 py-8 px-2 md:px-4 lg:w-4/5 xl:w-7/12 ">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          SJBIT CSE<span className="text-blue-500 ml-2">Forum</span>
        </h1>

        <div className={"text-center mt-4"}>
          <p className="font-bold text-xl">User Registration</p>
        </div>

        <form className={"py-2"} onSubmit={handleSubmit(createUser)}>
          <div className="flex flex-wrap w-full">
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <label className="block ml-1">
                <span>Username</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.username?.message}
                </span>
              </label>
              <input
                type="text"
                placeholder="Username"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("username", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
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
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("password1")}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <label className="block mx-1">
                <span>Password</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.password2?.message}
                </span>
              </label>
              <input
                type="password"
                placeholder="**********"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("password2", { required: "field required" })}
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

            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <label className="block mx-1">
                <span>First Name</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.firstName?.message}
                </span>
              </label>
              <input
                type="text"
                placeholder="First Name"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("firstName", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <label className="block mx-1">
                <span>Middle Name</span>
              </label>
              <input
                type="text"
                placeholder="Middle Name"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("middleName")}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <label className="block mx-1">
                <span>Last Name</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>
                  {errors.lastName?.message}
                </span>
              </label>
              <input
                type="text"
                placeholder="Last Name"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("lastName", { required: "field required" })}
              />
            </div>

            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <label className="block mx-1">
                <span>Email</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>{errors.email?.message}</span>
              </label>
              <input
                type="email"
                placeholder="example@example.com"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("email", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <label className="block mx-1">
                <span>Phone</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>{errors.phone?.message}</span>
              </label>
              <input
                type="text"
                placeholder="Phone"
                className={
                  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                }
                {...register("phone", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <label className="block mx-1">
                <span>Gender</span>
                <span className={"text-red-600 mx-1"}>*</span>
                <span className={"text-red-600"}>{errors.gender?.message}</span>
              </label>
              <Controller
                name="gender"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className={
                      "w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                    }
                    isClearable
                    {...field}
                    options={GENDER}
                  />
                )}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <label className="block ml-1">
                Department
                <span className={"text-red-600 ml-1"}>
                  *{errors.dapartment?.message}
                </span>
              </label>

              <Controller
                name="department"
                control={control}
                render={({ field }) => (
                  <ReactSelect
                    className={
                      "w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                    }
                    isClearable
                    {...field}
                    options={DEPARTMENT}
                  />
                )}
              />
            </div>
          </div>

          <div className="flex">
            <button className="w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900">
              Create Account
            </button>
          </div>
          <div className="mt-6 text-grey-dark">
            Already have an account?
            <a className="text-blue-600 hover:underline ml-2" href="/login">
              Log in
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserRegistration;

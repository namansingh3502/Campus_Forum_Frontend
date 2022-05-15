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

const LABEL = (props) => {
  return (
    <label className="block mx-1">
      <span>{props.label}</span>
      {props.required && <span className={"text-red-600 mx-1"}>*</span>}
      <span className={"text-red-600"}>{props.message}</span>
    </label>
  );
};

const FIELD_CLASS =
  "w-full px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400";

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
      first_name: "",
      middle_name: "",
      last_name: "",
      email: "",
      phone: "",
      gender: "",
      department: "",
    },
  });

  function createUser(data) {
    console.log("data ", data);

    axios
      .post("/api/auth/register", { data }, {})
      .then((res) => {
        if (res.status === 200) {
          alert("user created");
        }
      })
      .catch((errors) => {
        alert(errors.response.data.msg);
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
              <LABEL
                label={"Username"}
                message={errors.username?.message}
                required={true}
              />
              <input
                type="text"
                placeholder="Username"
                className={FIELD_CLASS}
                {...register("username", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <LABEL
                label={"Password"}
                message={errors.password1?.message}
                required={true}
              />
              <input
                type="password"
                placeholder="**********"
                className={FIELD_CLASS}
                {...register("password1", {
                  required: "field required",
                  minLength: { value: 8, message: "min length 8" },
                })}
              />
              {console.log("error ", errors)}
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <LABEL
                label={"Password"}
                message={errors.password2?.message}
                required={true}
              />
              <input
                type="password"
                placeholder="**********"
                className={FIELD_CLASS}
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

            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <LABEL
                label={"First Name"}
                message={errors.first_name?.message}
                required={true}
              />
              <input
                type="text"
                placeholder="First Name"
                className={FIELD_CLASS}
                {...register("first_name", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <LABEL
                label={"Middle Name"}
                message={errors.middle_name?.message}
                required={false}
              />

              <input
                type="text"
                placeholder="Middle Name"
                className={FIELD_CLASS}
                {...register("middle_name")}
              />
            </div>
            <div className={"w-full sm:w-1/3 px-1 py-2"}>
              <LABEL
                label={"Last Name"}
                message={errors.last_name?.message}
                required={true}
              />
              <input
                type="text"
                placeholder="Last Name"
                className={FIELD_CLASS}
                {...register("last_name", { required: "field required" })}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <LABEL
                label={"Email"}
                message={errors.email?.message}
                required={true}
              />
              <input
                type="email"
                placeholder="example@sjbit.edu.in"
                className={FIELD_CLASS}
                {...register("email", {
                  required: "field required",
                  pattern: {
                    value: /^[A-Z\d._%+-]+@sjbit.edu.in$/i,
                    message: "invalid email address",
                  },
                })}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <LABEL
                label={"Phone"}
                message={errors.phone?.message}
                required={true}
              />
              <input
                type="text"
                placeholder="Phone"
                className={FIELD_CLASS}
                {...register("phone", {
                  required: "field required",
                  pattern: {
                    value: /^[0-9]{10}$/i,
                    message: "Invalid Phone no.",
                  },
                })}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <LABEL
                label={"Gender"}
                message={errors.gender?.message}
                required={true}
              />
              <Controller
                name="gender"
                control={control}
                rules={{ required: "field required" }}
                render={({ field }) => (
                  <ReactSelect
                    className={
                      "w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                    }
                    isClearable
                    {...field}
                    options={GENDER}
                    onChange={(e) => {
                      field.onChange(e);
                    }}
                  />
                )}
              />
            </div>
            <div className={"w-full sm:w-1/2 px-1 py-2"}>
              <LABEL
                label={"Department"}
                message={errors.department?.message}
                required={true}
              />
              <Controller
                name="department"
                control={control}
                rules={{ required: "field required" }}
                render={({ field }) => (
                  <ReactSelect
                    className={
                      "w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600 ring-1 ring-slate-400"
                    }
                    isClearable
                    {...field}
                    options={DEPARTMENT}
                    onChange={(e) => field.onChange(e)}
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

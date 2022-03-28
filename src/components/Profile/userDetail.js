import React, {useEffect, useState} from "react";
import background from "../../images/bg.jpeg";
import {AiFillCamera, FaPen} from "react-icons/all";
import axios from "axios";

export default function UserDetail(){
  const user = JSON.parse(localStorage.getItem('user_profile'))
  const [image, setImage] = useState(user.user_image)

  function updateImage(image){

    const formData = new FormData()
    formData.append(image[0].name, image[0])

    axios.post(
      `${process.env.HOST}/auth/update/user_image`, formData,
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
        }
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user_profile',JSON.stringify(response.data))
          setImage(response.data.user_image)
          location.reload()
        } else {
          console.log(response.status, response.data.msg)
        }
      })
      .catch((error) => {
        console.log("check error at new Posts \n",error)
      })
  }

  useEffect(()=>{},[image])

  return(
    <div className={"h-auto w-full bg-slate-500 bg-opacity-20 rounded-lg text-white pb-2"}>
      <div className="w-full rounded-lg h-32">
        <img
          src={background}
          className="w-full h-full rounded-t-lg"
          alt={"user"}
        />
      </div>
      <div>
      </div>
      <div className={"relative flex justify-center h-16"}>
        <div className={"absolute h-28 w-28 -top-full rounded-full"}>
          <img
            className={"h-28 w-28 -top-full rounded-full outline outline-offset-2 outline-2 outline-indigo-700"}
            src={user.user_image}
          />
          <div className={"z-10 absolute right-0.5 -bottom-0.5 bg-gray-600 w-9 h-9 flex justify-center items-center rounded-full"}>
            <label className={"text-2xl"}>
              <div>
                <AiFillCamera/>
              </div>
              <div className={"z-10 absolute"}>
                <input
                  className="opacity-0 w-0.5 h-0.5"
                  type={"file"}
                  multiple={false}
                  accept="image/*"
                  onChange={(e)=>{updateImage(e.target.files)}}
                />
              </div>
            </label>
          </div>
        </div>
      </div>
      <div className={"w-full px-4 text-center inline-block "}>
        <h1 className={"text-2xl font-semibold"}>{user.first_name} {user.middle_name} {user.last_name} </h1>
        <h1 className={"text-lg"}>@{user.username}</h1>
        <h1 className={"text-lg"}>{user.department}</h1>
      </div>
    </div>
  )
}
import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";

import axios from "axios";
import Header from "../header";
import {config} from "../../globalData";

export default function RequireAuth({ children, ...rest }) {
  let location = useLocation();
  const [userLoggedIn, updateLoggedInStatus] = useState(false)
  const [userDataLoadStatus, updateUserLoadStatus] = useState(false)

  function loadUserData() {

    axios
      .get(`${process.env.HOST}/auth/user/`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user_profile', JSON.stringify(response.data))
          updateLoggedInStatus(true)
        } else if(response.status === 401){
          console.log("auth expired")
          localStorage.clear()
        }
        else {
          console.log(response.status);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  useEffect( ()=>{
    const token = localStorage.getItem('Token')
    token ? loadUserData() : updateUserLoadStatus(true)
  },[])

  if( !userDataLoadStatus && !userLoggedIn ){
    return( <div>Loading</div> )
  }
  if( userDataLoadStatus && !userLoggedIn ){
    return( <Navigate to="/login" state={{ from: location }} replace /> )
  }
  return (
    <>
      <Header updateLoggedIn={()=>{updateLoggedInStatus()}} />
      {children}
    </>
  )
}
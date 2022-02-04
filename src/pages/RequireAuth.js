import React, {useEffect, useState} from "react";
import {Navigate, useLocation} from "react-router-dom";

import axios from "axios";
import Header from "../components/header";

export default function RequireAuth({ children, ...rest }) {
  let location = useLocation();
  const [userLoggedIn, updateLoggedInStatus] = useState(false)
  const [userDataLoadStatus, updateUserLoadStatus] = useState(false)

  function loadUserData() {
    const host =  process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/auth/user/`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('user_profile', JSON.stringify(response.data))
          updateLoggedInStatus(true)
        } else {
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
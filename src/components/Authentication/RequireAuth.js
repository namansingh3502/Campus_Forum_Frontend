import React, { useEffect } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import Header from "../Header/header";
import { useQuery } from "react-query";
import fetchData from "../../api/fetchData";

export default function RequireAuth({ children, ...rest }) {
  let location = useLocation();

  const {
    data: user_details,
    status: user_details_status,
    error: user_details_error,
  } = useQuery(["user_detail", "/api/auth/user/"], fetchData);
  const {
    data: channel,
    status: channel_status,
    error: channel_error,
  } = useQuery(["channel", "/api/forum/channel_list"], fetchData);

  if (user_details_status === "success") {
    localStorage.setItem("user_profile", JSON.stringify(user_details.data));
  }
  if (channel_status === "success") {
    localStorage.setItem(
      "channels",
      JSON.stringify({ status: channel_status, data: channel.data })
    );
  }
  if (user_details_status === "error") {
    if (
      user_details_error.response?.status === 401 &&
      channel_error.response?.status === 401
    ) {
      localStorage.clear();
    }
  }

  return (
    <>
      {(user_details_status === "loading" || channel_status === "loading") && (
        <div className={"min-h-screen w-full flex items-center justify-center"}>
          <div className="dot" />
        </div>
      )}
      {user_details_status === "error" && channel_status === "error" && (
        <Navigate to="/login" state={{ from: location }} replace />
      )}
      {user_details_status === "success" && channel_status === "success" && (
        <div>
          <Header />
          {children}
        </div>
      )}
    </>
  );
}

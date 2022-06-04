import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import React, { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Login from "../components/Authentication/login";
import Router from "./router";

import axios from "axios";
import UserRegistration from "../components/Authentication/userRegistration";
import ResetPasswordRequest from "../components/Authentication/resetPasswordRequest";
import ActivateAccount from "../components/Authentication/activateAccount";
import ResetPassword from "../components/Authentication/resetPassword";
const queryClient = new QueryClient();
// axios.defaults.baseURL = `http://127.0.0.1:8000`;
axios.defaults.baseURL = `http://ec2-13-233-227-182.ap-south-1.compute.amazonaws.com/`;

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/*Login Page*/}
          <Route path="login/" element={<Login />} />
          {/*Registration Page*/}
          <Route path="registration/" element={<UserRegistration />} />
          {/*Account Activation Page*/}
          <Route
            path={"activate_account/:uidb64/:token"}
            element={<ActivateAccount />}
          />
          {/*Password Reset Request Page*/}
          <Route path="reset_password/" element={<ResetPasswordRequest />} />
          {/*Password Reset Page*/}
          <Route
            path={"reset_password/:uidb64/:token"}
            element={<ResetPassword />}
          />
          {/*Router*/}
          <Route path={"*"} element={<Router />} />
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </>
  );
}

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

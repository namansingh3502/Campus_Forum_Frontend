import * as ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { StrictMode } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import Login from "../components/Authentication/login";
import RequireAuth from "../components/Authentication/RequireAuth";

import Router from "./router";

import axios from "axios";
const queryClient = new QueryClient();
axios.defaults.baseURL = `http://127.0.0.1:8000/api/`;

export default function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          {/*Login Page*/}
          <Route path="login/" element={<Login />} />
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

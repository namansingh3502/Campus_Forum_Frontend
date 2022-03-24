import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {StrictMode} from "react";

import Login from "../components/Authentication/login";
import RequireAuth from "../components/Authentication/RequireAuth";

import Router from "./router";

export default function App (){
  return (
    <Routes>
      {/*Login Page*/}
      <Route
        path="login/"
        element={ <Login /> }
      />
      {/*Router*/}
      <Route
        path={"*"}
        element={
          <RequireAuth>
            <Router/>
          </RequireAuth>
        }
      />
    </Routes>
  )
}

ReactDOM.render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

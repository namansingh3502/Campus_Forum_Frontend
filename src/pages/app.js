import * as ReactDOM from "react-dom";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import React, {StrictMode} from "react";

import Login from "../components/authentication/login";
import RequireAuth from "../components/authentication/RequireAuth";
import Settings from "../components/Settings/settings"
import Profile from "../components/Profile/profile";
import Forum from "../components/forum";
import Page404 from "./page404";

export default function App (){
  return (
    <Routes>
      {/*Login Page*/}
      <Route
        path="login/"
        element={ <Login /> }
      />
      {/*Forum Page*/}
      <Route
        path={""}
        element={
          <RequireAuth>
            <Forum/>
          </RequireAuth>
        }
      />
      {/*Profile Page*/}
      <Route
        path={"profile/"}
        element={
          <RequireAuth>
            <Profile/>
          </RequireAuth>
        }
      />
      {/*Settings Page*/}
      <Route
        path={"settings/"}
        element={
          <RequireAuth>
            <Settings/>
          </RequireAuth>
        }
      />
      {/*404 Page*/}
      <Route
        path={"/*"}
        element={
          <Page404/>
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

import React, {useState} from "react";
import {Routes, Route, Navigate} from "react-router-dom";

import Dashboard from "./dashboard";
import ChannelTimeline from "./channelTimeline";
import UserTimeline from "./userTimeline";
import ProfilePage from "../components/Profile/profile_page";
import Settings from "../components/Settings/settings";
import Page404 from "./page404";
import RequireAuth from "../components/Authentication/RequireAuth";

export default function Router() {
  const [token, setToken] = useState(localStorage.getItem("Token"))

  return (
    <div className={"pb-10"}>
      { token === null ?
        <Navigate to="/login" replace/>
      :
        <Routes>
          <Route
            exact
            path={""}
            element={
              <RequireAuth>
                <Dashboard />
              </RequireAuth>
            }
          />
          <Route
            path={"channel/:name"}
            element={
              <RequireAuth>
                <ChannelTimeline />
              </RequireAuth>
            }
          />
          <Route
            path={"user/:username"}
            element={
              <RequireAuth>
                <UserTimeline />
              </RequireAuth>
            }
          />
          <Route
            path={"profile/:username"}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
          <Route
            path={"settings"}
            element={
              <RequireAuth>
                <Settings />
              </RequireAuth>
            }
          />
          <Route path={"*"} element={<Page404 />} />
        </Routes>
      }
    </div>
  );
}

import { BrowserRouter } from "react-router-dom";
import React, { StrictMode, Component } from "react";
import { render } from "react-dom";
import Login from "./login";
import Forum from "../components/forum";
import axios from "axios";
import Header from "../components/header";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      UserLoggedIn: false,
    };
    this.logoutUser = this.logoutUser.bind(this)
  }

  logoutUser(){
    this.setState({
      UserLoggedIn: false
    })
  }

  loadUserData() {
    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/auth/users/me`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          localStorage.setItem('username', response.data.username)
          localStorage.setItem('user_id', response.data.id)
          this.setState({
            UserLoggedIn: true,
          })
        } else {
          console.log(response.status);
          console.log(response.data);
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  componentDidMount() {
    const token = localStorage.getItem('Token')
    if(token){
      this.loadUserData()
    }
  }

  render() {
    if( this.state.UserLoggedIn){
      return (
        <div>
          <Header
            logoutUser={()=>{this.logoutUser()}}
          />
          <Forum/>
        </div>
      )
    } else {
      return(
        <Login
          loadUserDetails={()=>{this.loadUserData()}}
        />
      )
    }
  }
}

render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
  document.getElementById("root")
);

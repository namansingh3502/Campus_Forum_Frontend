import axios from "axios";
import {useState} from "react";
import log from "tailwindcss/lib/util/log";

export const multiSelectStyle = {
  multiselectContainer: {
    // To change css for multiselect (Width,height,etc..)
  },
  searchBox: { // To change search box element look
    border: 'none',
    fontSize: '18px',
  },
  inputField: { // To change input field position or margin
    margin: '5px'
  },
  chips: { // To change css chips(Selected options)
    background: "blue",
    fontSize: '14px'
  },
  optionContainer: { // To change css for option container
    border: 'none'
  },
  option: { // To change css for dropdown options
    color: 'black',
    fontSize: '14px'
  },
  groupHeading: { // To change group heading style
  }
}

export const user = JSON.parse(localStorage.getItem('user_profile'))

export const config = {
  headers: {
    Authorization: localStorage.getItem("Token")
  }
}

export const postConfig = {
  headers: {
    Authorization: localStorage.getItem("Token"),
    'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW',
  }
}

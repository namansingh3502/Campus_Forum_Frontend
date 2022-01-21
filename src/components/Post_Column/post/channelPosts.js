import React, {useEffect} from "react"
import PageProfile from "../pageProfile";
import CreatePost from "./Create_Post/createPost";
import Posts from "../posts";
import PostModal from "./postModal";
import axios from "axios";


export default function ChannelPost (props){

  function loadPost(){
    const Token = localStorage.getItem("Token");
    const host =  process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/forum/`, {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            PostData: response.data,
            LoadStatus: "Loaded",
          });
        } else {
          this.setState({
            LoadStatus: "NotLoaded",
          });
        }
      })
      .catch((error) => {
        console.log("check login error", error);
      });
  }

  useEffect( ()=>{
    loadPost()
  })

  return(
    <>
      <PageProfile/>
      <div className={"mt-4"}>
        <CreatePost
          ChannelList={props.ChannelList}
        />
      </div>
      <PostModal/>

    </>
  )
}
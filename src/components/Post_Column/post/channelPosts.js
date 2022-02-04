import React, {useEffect, useState} from "react"
import PageProfile from "../pageProfile";
import CreatePost from "./Create_Post/createPost";
import Posts from "../posts";
import PostModal from "./postModal";
import axios from "axios";
import {useParams} from "react-router-dom";
import PostCreateModal from "./Create_Post/postCreateModal";


export default function ChannelPost (props){
  let {id} = useParams();
  const [Post, updatePosts] = useState([])

  function loadPost(){
    const Token = localStorage.getItem("Token");
    const host =  process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/forum/channel/${id}/posts`, {
        headers: {
          Authorization: Token,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          updatePosts(response.data)
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
  },[id])

  return(
    <div>
      <PageProfile/>
      <div className={"mt-4"}>
        <CreatePost
          showPostCreateModal={()=> {
            props.showPostCreateModal()
          }}
        />
      </div>
      {Post.map((item, index) => {
        return (
          <div key={index}>
            <PostModal
              data={item}
            />
          </div>
        );
      })}
    </div>
  )
}
import React, { Component } from "react";

import axios from "axios";

import PostModal from "./post/postModal";
import CreatePost from "./post/Create_Post/createPost";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostLoadStatus: "NotLoaded",
      PostData: [],
    };
  }

  loadPost() {
    const Token = localStorage.getItem("Token");
    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/forum/posts`, {
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

  componentDidMount() {
    this.loadPost();
  }

  render() {
    const Post = this.state.PostData;

    return (
      <div>
        <CreatePost
          showPostCreateModal={()=> {
            this.props.showPostCreateModal()
          }}
        />
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
    );
  }
}

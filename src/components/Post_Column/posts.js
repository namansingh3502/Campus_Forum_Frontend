import React, { Component } from "react";

import axios from "axios";

import PostModal from "./post/postModal";
import CreatePost from "./post/Create_Post/createPost";
import EditPost from "./post/Edit_Post/editPost";

export default class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostLoadStatus: "NotLoaded",
      editPost: false,
      PostData: [],
      editPostData: {},
    };
    this.addPosts = this.addPosts.bind(this)
    this.updateEditPost = this.updateEditPost.bind(this)
  }

  loadPost() {
    const Token = localStorage.getItem("Token");

    axios
      .get(`${process.env.HOST}/forum/posts`, {
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

  addPosts(newPost){
    let data = this.state.PostData
    data.unshift(newPost)
    this.setState({
      PostData: data
    })
  }

  updateEditPost(postData, postUpdated){
    this.setState({
      editPost:postUpdated,
      editPostData:postData
    })
  }

  componentDidMount() {
    this.loadPost();
  }

  render() {
    const Post = this.state.PostData;
    return (
      <div>
        <CreatePost
          ChannelList={this.props.ChannelList}
          updatePosts={(newPost)=>{
            this.addPosts(newPost)
          }}
        />
        {this.state.editPost && this.state.editPostData !== {} ?
          <EditPost
            ChannelList={this.props.ChannelList}
            data={this.state.editPostData}
            editPost={(post, postUpdated)=>{
              this.updateEditPost(post, postUpdated)
            }}
          /> : null
        }
        {Post.map((item) => {
          return (
            <PostModal
              key={item.post.id}
              data={item}
              editPost={(post, postUpdated) => {
                this.updateEditPost(post, postUpdated)
              }}
            />
          );
        })}
      </div>
    )
  }
}

import React, { Component } from "react";
import LikeDetails from "./likeDetails";
import axios from "axios";
import CommentModal from "./commentModal";

export default class UserReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostLiked: false,
      UserLiked: [],
      CommentModal: false,
    };
    this.handleLike = this.handleLike.bind(this);
    this.commentsModal = this.commentsModal.bind(this)
  }

  static getDerivedStateFromProps(props,state) {
    if (props.likes !== state.UserLiked) {
      return { UserLiked: props.likes };
    }
    return null;
  }

  commentsModal() {
    this.setState({CommentModal: true})
  }

  handleLike() {
    const post_id = this.props.post_id;
    const user = JSON.parse(localStorage.getItem('user_profile'))
    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .post(`${host}/forum/${post_id}/like-post`,{},
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          },
      })
      .then((response) => {
        if (response.status === 200) {
          let data = this.state.UserLiked

          this.state.PostLiked ?
            data.pop()
            :
            data.push({
              username : user.username,
              user_id : user.user_id
            })
          this.setState({
            PostLiked: !this.state.PostLiked,
            UserLiked: data
          });
        } else {
          this.setState({
            PostLikeUpdateStatus: "NotLoaded",
          });
        }
      })
      .catch((error) => {
        console.log("check post like update.", error);
      });
  }

  componentDidMount() {
    const data = this.props.likes;
    const user = JSON.parse(localStorage.getItem('user_profile'));

    for (let i = 0; i < data.length; i++) {
      if (user.id === data[i].user_id) {
        this.setState({PostLiked:true})
        break
      }
    }
  }

  render() {
    return (
      <div>
        <LikeDetails
          Liked={this.props.likes}
          handleLike={() => this.handleLike()}
          UserLiked={this.state.UserLiked}
        />
        <div className="grid grid-cols-2 gap-x-3 justify-items-center border-t border-gray-600 pt-1">
          <button
            className="hover:bg-gray-400 rounded-full hover:bg-opacity-20 h-8 w-full"
            onClick={this.handleLike}
          >
            {this.state.PostLiked ? "Liked" : "Like"}
          </button>
          <button
            className="hover:bg-gray-400 rounded-full hover:bg-opacity-20 h-8 w-full"
            onClick={()=>{this.setState({CommentModal: true})}}
          >
            Comment
          </button>
        </div>
        {this.state.CommentModal ?
          <CommentModal
            post_id={this.props.post_id}
          />
          :
          null
        }
      </div>
    );
  }
}

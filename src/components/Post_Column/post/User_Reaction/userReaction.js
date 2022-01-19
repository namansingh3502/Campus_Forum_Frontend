import React, { Component } from "react";
import LikeDetails from "./likeDetails";
import axios from "axios";
import Comment from "./commentModal";
import CommentModal from "./commentModal";

export default class UserReaction extends Component {
  constructor(props) {
    super(props);
    this.state = {
      PostLiked: false,
      UserLiked: [],
      CommentModal: 'none',
      PostLikeLoadStatus: "NotLoaded",
      PostLikeUpdateStatus: "NotLoaded",
    };
    this.loadLikes = this.loadLikes.bind(this);
    this.handleLike = this.handleLike.bind(this);
    this.commentsModal = this.commentsModal.bind(this)
  }

  commentsModal() {
    this.setState({CommentModal: 'block'})
  }

  handleLike() {
    const post_id = this.props.post;
    const current_user = parseInt(localStorage.getItem("user_id"));
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
              username : localStorage.getItem('user_name'),
              user_id : current_user
            })

          this.setState({
            PostLikeUpdateStatus: "Loaded",
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

  loadLikes() {
    const post_id = this.props.post;
    const current_user = parseInt(localStorage.getItem("user_id"));

    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/forum/${post_id}/likes`, {
        headers: {
          Authorization: localStorage.getItem("Token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          const data = response.data;
          let liked = false;

          for (let i = 0; i < data.length; i++) {
            if (current_user === data[i].user_id) {
              liked = true;
              data.push(data[i])
              data.splice(i,1)
              break
            }
          }
          this.setState({
            PostLiked: liked,
            UserLiked: data,
            PostLikeLoadStatus: "Loaded",
          });
        } else {
          this.setState({
            LoadStatus: "NotLoaded",
          });
        }
      })
      .catch((error) => {
        console.log("check like detail error", error);
      });
  }

  componentDidMount() {
    this.loadLikes();
  }

  render() {
    if (this.state.PostLikeLoadStatus !== "Loaded") {
      return <div>Loading</div>;
    }

    return (
      <div>
        <LikeDetails
          Liked={this.state.PostLiked}
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
            onClick={this.commentsModal}
          >
            Comment
          </button>
        </div>
        <div>
          <div
            className={"text-white border-t mt-1 ml-1 border-gray-600 pt-2"}
            style={{display: this.state.CommentModal}}
          >
            <CommentModal
              post_id = {this.props.post}
            />
          </div>
        </div>
      </div>
    );
  }
}

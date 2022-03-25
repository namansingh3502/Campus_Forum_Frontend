import React, {Component} from 'react'
import {BsArrowRightCircleFill} from "react-icons/all";
import axios from "axios";
import Comments from "./comments";

export default class CommentModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      CommentText: "",
      Comments: [],
      CommentsLoadStatus: false,
      CommentPostStatus: false,
    }
  }

  loadComments(){
    const post_id =this.props.post_id

    axios.get(
      `${process.env.HOST}/forum/${post_id}/comments`,
      {
        headers: {
          Authorization: localStorage.getItem("Token")
        }
    })
    .then((response) => {
      if ((response.status === 200)) {
        this.setState({
          Comments: response.data,
          CommentsLoadStatus: true
        })
      } else {
        console.log(response.status, response.data.msg)
      }
    })
    .catch((error) => {
      console.log("check error at new comment \n",error)
    })
  }

  submitComment(){
    const data = {
      body : this.state.CommentText,
      post : this.props.post_id
    }

    axios.post(
      `${process.env.HOST}/forum/new-comment`, data,
      {
        headers: {
          Authorization: localStorage.getItem("Token"),
          'Content-Type': 'multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW'
        }
      })
    .then((response) => {
      if ((response.status === 200)) {
        this.setState({
          CommentText:"",
          Comments:this.state.Comments.concat(response.data)
        })
      } else {
        console.log(response.status, response.data.msg)
      }
    })
    .catch((error) => {
      console.log("check error at new comment \n",error)
    })
  }

  componentDidMount() {
    this.loadComments()
  }

  render() {
    if( !this.state.CommentsLoadStatus){
      return( <div> </div>)
    }

    const user = JSON.parse(localStorage.getItem('user_profile'))
    const comments = this.state.Comments

    return(
      <div className={"text-white border-t mt-2 border-gray-600 pt-2"}>
        <div className={"flex items-start "}>
          <img
            src={`${process.env.HOST}${user.user_image}`}
            className="rounded-full h-12 w-12"
            alt={"user-image"}
          />
          <form
            className={"w-full h-auto flex items-start"}
            onSubmit={(e)=>{
              e.preventDefault()
              this.submitComment()
            }}
          >
            <label className={"flex items-start w-full"}>
              <textarea
                className={"w-full h-12 p-2 mx-1 resize-none bg-slate-600 bg-opacity-30 text-slate-200 placeholder:text-slate-300 text-white text-lg border-none focus:ring-0 rounded-xl overflow-auto"}
                value={this.state.CommentText}
                placeholder={"Write a comment..."}
                onChange={(e)=>{
                  this.setState({ CommentText: e.target.value })
                }}
              />
              <button type={"submit"}>
                <BsArrowRightCircleFill className={"ml-1 mt-1 h-10 w-10 text-lg fill-gray-500"}/>
              </button>
            </label>
          </form>
        </div>
        <div className={"mt-2"}>
          {comments.map((item)=>{return(
            <Comments
              data={item}
              key={item.id}
            />
          )})}
        </div>
      </div>
    )
  }
}
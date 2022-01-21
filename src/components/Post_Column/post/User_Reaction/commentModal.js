import React, {Component} from 'react'
import TextareaAutosize from 'react-textarea-autosize';
import userImage from "../../../../images/userimg.jpeg";
import {BsArrowRightCircleFill} from "react-icons/all";
import axios from "axios";

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
    const host = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'

    axios
      .get(`${host}/forum/${post_id}/comments`,
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          }
        }
      )
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
    const host = process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'

    axios
      .post(`${host}/forum/new-comment`,
        {
          body : this.state.CommentText,
          post : this.props.post_id
        },
        {
          headers: {
            Authorization: localStorage.getItem("Token"),
          }
        }
      )
      .then((response) => {
        if ((response.status === 200)) {
          this.setState({
            CommentText:"",
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
      return( <div></div>)
    }

    const comments = this.state.Comments

    return(
      <div>
        <div className={"flex"}>
          <img
            src={userImage}
            className="rounded-full"
            style={{ height: 35, width: 35 }}
            alt={"user"}
          />
          <form
            className={"w-full mr-2 flex"}
            onSubmit={(e)=>{
              e.preventDefault()
              this.submitComment()
            }}
          >
            <TextareaAutosize
              minRows={1}
              maxRows={5}
              value={this.state.CommentText}
              placeholder={"Write a comment..."}
              className={"ml-2 py-1 pl-3 text-md w-11/12 outline-0 bg-transparent text-white resize-none rounded-xl bg-gray-300 bg-opacity-20 backdrop-filter"}
              onChange={(e)=>{
                this.setState({
                  CommentText: e.target.value
                })
              }}
            />
            <button>
              <BsArrowRightCircleFill className={"ml-1 h-8 text-lg fill-gray-500 w-full"}/>
            </button>
          </form>
        </div>

        {comments.map((item)=>{return(
          <div className="flex py-1 mt-1" key={item.id}>
            <img
              src={userImage}
              className="rounded-full"
              style={{ height: 35, width: 35 }}
              alt={"user"}
            />
            <div className="ml-2 px-2 py-1 rounded-xl bg-gray-300 bg-opacity-20 backdrop-filter">
              <h1 className="text-sm font-bold" >
                {item.username}
              </h1>
              <p className={"text-sm"}>
                {item.body}
              </p>
            </div>
          </div>
        )})}

      </div>
    )
  }


}
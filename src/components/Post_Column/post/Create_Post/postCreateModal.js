import React, { Component} from "react";
import { AiOutlineClose } from "react-icons/all";
import TextareaAutosize from 'react-textarea-autosize';

import axios from "axios";
import Multiselect from 'multiselect-react-dropdown';
import {loadPartialConfigAsync} from "@babel/core";

const style = {
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

export default class PostCreateModal extends Component{
  constructor(props) {
    super(props);
    this.state = {
      PostText: "",
      selectedValue: [],
    }
    this.onSelect = this.onSelect.bind(this)
    this.onRemove = this.onRemove.bind(this)
  }

  onSelect(selectedList, selectedItem) {
    this.setState({
      selectedValue: selectedList
    })
  }

  onRemove(selectedList, removedItem) {
    this.setState({
      selectedValue: selectedList
    })
  }

  createPost() {
    const host =  process.env.NODE_ENV === 'development' ?
        'http://127.0.0.1:8000'
        :
        'https://campus-forum-naman.herokuapp.com'

    axios
      .post(`${host}/forum/new-post`,
        {
          body : this.state.PostText,
          channel_list : this.state.selectedValue,
          media_count : 0
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
            PostText:"",
            selectedValue: []
          })
          this.props.updatePosts(response.data)
          this.props.showPostCreateModal()
        } else {
          console.log(response.status, response.data.msg)
        }
      })
      .catch((error) => {
        console.log("check error at new post \n",error)
      })
  }

  render(){
    const channel_list = this.props.ChannelList
    const host =  process.env.NODE_ENV === 'development' ?
      'http://127.0.0.1:8000'
      :
      'https://campus-forum-naman.herokuapp.com'
    const profile = JSON.parse(localStorage.getItem('user_profile'))

    if( channel_list === []){
      console.log("empty channel")
      return (
        <div>
        </div>
      )
    }

    return(
      <div
        className="z-10 fixed inset-0 bg-black bg-opacity-40 h-full w-full "
      >
        <div
          className="h-auto w-3/12 relative top-20 mx-auto border-0 shadow-lg rounded-lg "
          style={{ backgroundColor: "#011627"}}
        >
          <div className="bg-gray-400 rounded-lg border-0 bg-opacity-20 backdrop-filter h-full w-full text-amber-50">
            <div className="divide-y divide-gray-700">
              <div className="border-b pl-6 pr-4 py-4 flex justify-between items-center">
                <h3 className="text-2xl font-medium">Create Post</h3>
                <button
                  onClick={()=>{
                    this.setState({
                      PostText:"",
                      selectedValue:[]
                    })
                    this.props.showPostCreateModal()
                  }}
                >
                  <AiOutlineClose className="close-modal" />
                </button>
              </div>
              <form onSubmit={(e) => {
                  e.preventDefault();
                  this.createPost();
                }}>
                <div className={"p-4"}>
                  <div className="flex p-2">
                    <img
                      src={`${host}${profile.user_image}`}
                      className="rounded-full"
                      style={{ height: 50, width: 50 }}
                      alt={"user"}
                    />
                    <div className="ml-4 text-bold">
                      <h1 className="text-lg font-bold" id={profile.user_id}>
                        {profile.username}
                      </h1>
                    </div>
                  </div>
                  <div>
                    <div>
                      <Multiselect
                        placeholder={"Select Channels...."}
                        selectedValues={this.state.selectedValue}
                        options={channel_list}
                        onSelect={this.onSelect}
                        onRemove={this.onRemove}
                        displayValue="name"
                        showCheckbox={true}
                        style={style}
                        avoidHighlightFirstOption={true}
                      />
                    </div>
                  </div>
                  <div className={"px-1 text-black"}>
                    <TextareaAutosize
                      className="resize-none w-full p-2 bg-transparent focus:outline-0 text-white text-lg"
                      placeholder="What do you want to talk about?"
                      value={this.state.PostText}
                      minRows={5}
                      maxRows={10}
                      onChange={(e)=> {
                        this.setState({
                          PostText: e.target.value
                        })
                      }}
                    />
                  </div>
                  <div className={"mx-auto"}>
                    <button
                      type={"submit"}
                      className="w-full bg-blue-400 mx-auto text-xl font-semibold rounded-md p-2">
                      Post
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
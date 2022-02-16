import {AiOutlineClose} from "react-icons/all";
import Multiselect from "multiselect-react-dropdown";
import TextareaAutosize from "react-textarea-autosize";
import React, {useState} from "react";
import axios from "axios";

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

export default function EditPost(props){
  const profile = JSON.parse(localStorage.getItem('user_profile'))
  const [postText, updatePostText] = useState(props.data.post.body)
  const [selectedValue, updateSelectedValues] = useState(props.data.post.posted_in)

  function selectedList(selectedList, selectedItem) {
    updateSelectedValues(selectedList)
  }

  function editPost(){
    axios
      .post(`${process.env.HOST}/forum/edit-post`,
        {
          post_id: props.data.post.id,
          body : postText,
          channel_list : selectedValue,
          media_count:0
        },
        {
          headers:{
            Authorization: localStorage.getItem("Token"),
          }
        }
      )
      .then((response)=>{
        if(response.status === 200 ){
          props.updatePost(response.data)
        } else {
          console.log(response.status, response.data.msg)
        }
      })
      .catch((error) => {
        console.log("check error at edit post \n",error)
      })
  }

  return(
    <div className="z-10 fixed inset-0 bg-black bg-opacity-40 h-full w-full ">
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
                  updatePostText(props.data.post.body)
                  updateSelectedValues(props.data.post.posted_in)
                  props.showEditPostModal()
                }}
              >
                <AiOutlineClose className="close-modal" />
              </button>
            </div>
            <form onSubmit={(e) => {
              e.preventDefault();
              editPost();
            }}>
              <div className={"p-4"}>
                <div className="flex p-2">

                  <img
                    src={`${process.env.HOST}${profile.user_image}`}
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
                      selectedValues={selectedValue}
                      options={props.ChannelList}
                      onSelect={selectedList}
                      onRemove={selectedList}
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
                    value={postText}
                    minRows={5}
                    maxRows={10}
                    onChange={(e)=> {
                      updatePostText(e.target.value)
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

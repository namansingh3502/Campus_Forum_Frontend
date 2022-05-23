import React, { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";

import axios from "axios";

import { AiOutlineClose } from "react-icons/all";
import ImageUploader from "./imageUploader";
import UserDetails from "./userDetails";
import ChannelSelect from "./channelSelect";

export default function CreatePostDialog(props) {
  const [images, setImages] = useState([]);
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
  const [PostText, updatePostText] = useState("");
  const [selectedChannels, updateSelectedChannels] = useState([]);

  function addImage(e) {
    if (images.length + e.target.files.length > 6) {
      alert("You can upload only 6 images.");
      return;
    }
    setImages(images.concat([...e.target.files]));
  }

  function removeImage(index) {
    let updateImage = [];

    for (let i = 0; i < images.length; i++) {
      if (index !== i) {
        updateImage.push(images[i]);
      }
    }
    setImages(updateImage);
  }

  function createPost() {
    setIsSubmitDisabled(true)

    const data = {
      body: PostText,
      channel_list: selectedChannels,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    images.forEach((image) => {
      formData.append(image.name, image);
    });

    axios
      .post(`/api/forum/new_post`, formData, {
        headers: {
          Authorization: localStorage.getItem("Token"),
          "Content-Type":
            "multipart/form-data; boundary=----WebKitFormBoundary7MA4YWxkTrZu0gW",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          props.addPost(response.data);
          props.setDialogVisibility();
        }
      })
      .catch((error) => {
        setIsSubmitDisabled(false)
        alert("Error occurred while creating post.");
        console.log(error.response.message)
      });
  }

  return (
    <Transition appear show={props.dialogVisibility} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={() => {
          props.setDialogVisibility();
        }}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div
              className="inline-block h-auto max-w-xl w-full relative overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl"
              style={{ backgroundColor: "#011627" }}
            >
              <div className="h-full w-full bg-gray-400 rounded-lg border-0 bg-opacity-20 backdrop-filter text-amber-50">
                <Dialog.Title
                  as={"h3"}
                  className={
                    "text-2xl border-b pl-6 pr-4 py-4 flex justify-between items-center"
                  }
                >
                  <span className="font-medium text-center w-full">
                    Create Post
                  </span>
                  <button
                    type={"button"}
                    onClick={() => {
                      updatePostText("");
                      updateSelectedChannels([]);
                      props.setDialogVisibility();
                    }}
                  >
                    <AiOutlineClose />
                  </button>
                </Dialog.Title>

                <Dialog.Description as={"div"} className={"mt-4"}>
                  <UserDetails />

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      createPost();
                    }}
                  >
                    <ChannelSelect
                      selectedChannels={selectedChannels}
                      setSelectedChannel={(channels) =>
                        updateSelectedChannels(channels)
                      }
                    />

                    <div className={"px-4 mt-2 h-40"}>
                      <textarea
                        className={
                          "resize-none bg-slate-600 bg-opacity-30 text-slate-300 placeholder:text-slate-300 w-full h-full p-2 text-white text-lg border-none focus:outline-none rounded-lg overflow-auto"
                        }
                        placeholder="What do you want to talk about?"
                        value={PostText}
                        onChange={(e) => {
                          updatePostText(e.target.value);
                        }}
                      />
                    </div>

                    <div className={"mx-2"}>
                      <ImageUploader
                        images={images}
                        addImage={(e) => addImage(e)}
                        removeImage={(index) => removeImage(index)}
                      />
                    </div>

                    <div className={"m-2 pb-2"}>
                      <button
                        type={"submit"}
                        className={
                          "w-full bg-blue-400 mx-auto text-xl font-semibold rounded-md p-2"
                        }
                        disabled={isSubmitDisabled}
                      >
                        Post
                      </button>
                    </div>
                  </form>
                </Dialog.Description>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
}

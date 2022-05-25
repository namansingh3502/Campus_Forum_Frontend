import axios from "axios";

const FetchPost = async (page = 100) => {
  return await axios.get(`/api/forum/posts/${page}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};

export default FetchPost;

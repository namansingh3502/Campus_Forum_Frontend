import axios from "axios";

const FetchPost = async (page = 100) => {
  return await axios.get(`forum/posts/${page}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};

export default FetchPost
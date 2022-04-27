import axios from "axios";

const FetchComment = async (page = 100, post_id) => {
  return await axios.get(`/api/forum/comment/${post_id}/${page}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};

export default FetchComment;

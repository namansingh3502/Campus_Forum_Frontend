import axios from "axios";

const FetchUserPost = async (page = 100, username) => {
  return await axios.get(`forum/user/${username}/post/${page}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};

export default FetchUserPost
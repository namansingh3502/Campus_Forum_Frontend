import axios from "axios";

const fetchPost = async (key) => {
  return await axios.get(`${key.queryKey[1]}`, {
    headers: {
      Authorization: localStorage.getItem("Token"),
    },
  });
};
export default fetchPost;

import axios from "axios";

const FetchImage = async (data) => {
  const res = await axios.get(data, {
    responseType: "blob",
  });
  return new File([res.data], "file.jpeg",{ type: "image/jpeg" })
};

export default FetchImage;

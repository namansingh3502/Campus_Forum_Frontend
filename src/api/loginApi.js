import axios from "axios";

const LoginApi = async (data) => {
  const res = await axios.post(`/auth/token/login/`, data, {});
  return res;
};

export default LoginApi;

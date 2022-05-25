import { useParams } from "react-router-dom";
import axios from "axios";
import {useQuery} from "react-query";

const ActivateAccount = () => {
  let { uidb64, token } = useParams();

  const { data, status } = useQuery(`account_activation`,
      () => axios.get(`/api/auth/activate/${uidb64}/${token}`),
      { refetchOnWindowFocus : false, staleTime:0, cacheTime:10, retry: false }
  );

  return (
    <div className="font-sans min-h-screen w-full antialiased flex items-center justify-center">
      <div className="mx-2 rounded-xl bg-gray-100 py-8 px-4 sm:w-2/5 md:w-2/5 xl:w-1/4">
        <h1 className="font-bold text-center text-4xl text-yellow-500">
          SJBIT CSE<span className="text-blue-500 ml-2">Forum</span>
        </h1>
        <div className={"my-4"}>
          {status === "loading" && <p>Validating user details.</p>}
          {status === "success" && (
            <p>
              Congratulations your account is active now. Click here to
              <a className={"text-blue-600 font-medium underline underline-offset-2 px-1"} href={"/login"}>Login</a>
            </p>
          )}
          {status === "error" && (
            <div>
              <p>Validation failed. Activation link is invalid!.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivateAccount;

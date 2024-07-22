/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../../store/reducers";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    userName: "",
    password: "",
  });

  const onSubmitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`user/login`, user, {
        withCredentials: true,
      });

      dispatch(setAuthUser(res.data?.data));
      localStorage.setItem("userInfo", JSON.stringify(res.data?.data));
      navigate("/");
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }

    setUser({
      userName: "",
      password: "",
    });
  };

  return (
    <div className="min-w-96 mx-auto rounded" data-theme="garden">
      <div className="w-full p-6 rounded-lg shadow-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10  ">
        <h1 className="text-3xl font-bold text-center ">Login</h1>
        <form onSubmit={onSubmitHandler}>
          <div className="mb-5">
            <label className="label p-2">
              <span className="text-base label-text ">Username</span>
            </label>
            <input
              value={user.userName}
              onChange={(e) => setUser({ ...user, userName: e.target.value })}
              className="w-full input input-bordered h-10"
              type="text"
              placeholder="Username"
            />
          </div>
          <div className="mb-5">
            <label className="label p-2">
              <span className="text-base label-text ">Password</span>
            </label>
            <input
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full input input-bordered h-10"
              type="password"
              placeholder="Password"
            />
          </div>
          <p className="text-center my-5 ">
            Don't have an account?
            <Link to="/sign-up" className="">
              signup
            </Link>
          </p>
          <div>
            <button className="w-full mt-2 btn btn-outline btn-primary ">
              sign In
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;

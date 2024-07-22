/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  ChangeEvent,
  MutableRefObject,
  useCallback,
  useRef,
  useState,
} from "react";
import { Link, useNavigate } from "react-router-dom";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import Webcam from "react-webcam";
import BackDrop from "../helpers/BackDrop";
import { X } from "lucide-react";
import { Tooltip } from "react-tooltip";

type registerType = {
  fullName: string;
  userName: string;
  password: string;
  confirmPassword: string;
  gender: string;
  profilePhoto: any;
};

const registerInitialValue: registerType = {
  fullName: "",
  userName: "",
  password: "",
  confirmPassword: "",
  gender: "",
  profilePhoto: null,
};

const Signup = () => {
  const navigate = useNavigate();
  const webcamRef = useRef<Webcam>(null);
  const [file, setFile] = useState(false);
  // const [selectFile, setSelectFile] = useState<File | null | string>(null);
  const [showImage, setShowImage] = useState(false);
  const [, setCapturedImage] = useState<string>("");
  const inputRef = useRef(
    null
  ) as unknown as MutableRefObject<HTMLInputElement>;
  const [user, setUser] = useState(registerInitialValue);

  const handleClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target;
    const fileImg = files && files[0];

    if (fileImg) {
      const formData = new FormData();
      formData.append("file", fileImg);
      setUser({
        ...user,
        profilePhoto: fileImg,
      });
    }
  };
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    e.preventDefault();

    setUser({
      ...user,
      [name]: name !== "profilePhoto" && value,
    });
  };

  const handleCheckbox = (gender: string) => {
    if (gender === "male") {
      setUser({ ...user, gender: "male" });
    } else {
      setUser({ ...user, gender: "female" });
    }
  };

  const capture = useCallback(() => {
    const imageSrc = webcamRef?.current?.getScreenshot();
    if (webcamRef.current) {
      setCapturedImage(imageSrc ?? "");
      setFile(false);
      setShowImage(true);
    }
  }, [webcamRef]);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", user.profilePhoto);

    try {
      const res = await axiosInstance.post(`user/register`, user, {
        headers: {
          "Content-Type": "multipart/form-data; ",
        },
      });
      console.log(res, "response");

      if (res.data.status === "success") {
        navigate("/sign-in");
        toast.success(res.data.message);
      }
    } catch (error: any) {
      toast.error(error.response.data.message);
      console.log(error);
    }
    setUser(registerInitialValue);
  };

  return (
    <div className="w-[40%] mx-auto border rounded " data-theme="garden">
      <div className="w-full p-6 rounded-lg shadow-md  bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-10 border border-gray-100">
        <h1 className="text-3xl font-bold text-center">Signup</h1>
        <form>
          <div className="flex items-center gap-4 justify-between my-5">
            <div className="w-full">
              <label className="label p-2">
                <span className="text-base label-text">Full Name</span>
              </label>
              <input
                name="fullName"
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Full Name"
              />
            </div>
            <div className="w-full">
              <label className="label p-2">
                <span className="text-base label-text">Username</span>
              </label>
              <input
                name="userName"
                value={user.userName}
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                type="text"
                placeholder="Username"
              />
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="w-full">
              <label className="label p-2">
                <span className="text-base label-text">Password</span>
              </label>
              <input
                name="password"
                value={user.password}
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Password"
              />
            </div>
            <div className="w-full">
              <label className="label p-2">
                <span className="text-base label-text">Confirm Password</span>
              </label>
              <input
                name="confirmPassword"
                value={user.confirmPassword ?? ""}
                onChange={handleChange}
                className="w-full input input-bordered h-10"
                type="password"
                placeholder="Confirm Password"
              />
            </div>
          </div>

          <div className="flex items-center my-5">
            <div className="flex items-center">
              <p>Male</p>
              <input
                type="radio"
                checked={user.gender === "male"}
                onChange={() => handleCheckbox("male")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
            <div className="flex items-center">
              <p>Female</p>
              <input
                type="radio"
                checked={user.gender === "female"}
                onChange={() => handleCheckbox("female")}
                defaultChecked
                className="checkbox mx-2"
              />
            </div>
          </div>
          <div className="my-5">
            <label
              className="btn btn-outline btn-info w-full"
              onClick={() => {
                // setFile((prev) => prev);
                handleClick();
              }}
            >
              File
            </label>
            <input
              name="profilePhoto"
              type="file"
              id="file"
              className="hidden"
              onChange={handleFileChange}
              ref={inputRef}
            />

            {file && (
              <div className="absolute top-0 left-0 w-full">
                <BackDrop>
                  <Webcam
                    audio={false}
                    ref={webcamRef}
                    screenshotFormat="image/jpeg"
                    className="w-full"
                  />
                  <button
                    onClick={capture}
                    className="btn btn-primary btn-sm rounded-none w-full"
                  >
                    Capture photo
                  </button>
                </BackDrop>
              </div>
            )}

            {showImage && (
              <div className="flex justify-center relative mt-2 border border-white-400 w-max mx-auto">
                <X
                  data-tooltip-id="my-tooltip"
                  data-tooltip-content="Retake"
                  className=" absolute right-[8%] top-1 bg-slate-600 rounded-full p-1 text-white hover:cursor-pointer"
                  onClick={() => {
                    setShowImage((prev) => !prev);
                    setCapturedImage("");
                  }}
                />
                <img
                  src={user.profilePhoto ?? ""}
                  alt="img"
                  className="w-[100px] h-[100px] object-cover rounded-full hover:cursor-pointer "
                />
              </div>
            )}
          </div>
          <div>
            <button
              onClick={handleSubmit}
              className="w-full mt-2 btn btn-outline btn-primary "
            >
              Singup
            </button>
          </div>
          <Tooltip id="my-tooltip" />
          <p className="text-center my-2">
            Already have an account? <Link to="/sign-in"> signin </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;

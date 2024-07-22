/* eslint-disable @typescript-eslint/no-explicit-any */

import { useDispatch, useSelector } from "react-redux";
import { setUserDetail } from "../../store/reducers";

type apiResonseType = {
  createdAt: string;
  fullName: string;
  gender: string;
  profilePhoto: string;
  updatedAt: string;
  userName: string;
  __v: number;
  _id: string;
};

const SingleUser = ({ user }: { user: apiResonseType }) => {
  const dispatch = useDispatch();

  const { userDetail } = useSelector((state: any) => state.user);
  const { onlineUsers } = useSelector((state: any) => state.user);
  const isOnline = onlineUsers?.includes(user._id);

  const handleUserDetail = (user: apiResonseType) => {
    console.log("i am consoled!");

    dispatch(setUserDetail(user));
  };

  return (
    <>
      <div
        className={`${
          user?._id === userDetail?._id ? "bg-zinc-200 text-zinc-800" : ""
        } flex items-center gap-2 hover:bg-zinc-200  rounded-sm p-2 text-white transition duration-300  cursor-pointer hover:text-zinc-800`}
        onClick={() => handleUserDetail(user)}
      >
        <div className={`avatar ${isOnline ? "online" : ""}`}>
          <div className="w-12 rounded-full">
            <img src={`http://localhost:5000/${user.profilePhoto}`} alt="img" />
          </div>
        </div>
        <div className="flex hover:text-[#323232]">
          <div className="flex gap-2 flex-1">
            <p className="">{user.userName}</p>
          </div>
        </div>
      </div>

      <div className="divider my-0 py-0"></div>
    </>
  );
};

export default SingleUser;

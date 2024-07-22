/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import MessageInput from "./MessageInput";
import Messages from "./Messages";

const MessageList = () => {
  const { userDetail } = useSelector((state: any) => state.user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);

  const { onlineUsers } = useSelector((state: any) => state.user);
  const isOnline = onlineUsers?.includes(userDetail._id);

  return (
    <div className="md:min-w-[450px] flex flex-col">
      {userDetail === null ? (
        <div className="flex justify-center items-center flex-col flex-1 text-white text-[1.5rem] bg-slate-600">
          Hi {userInfo?.userName},
          <h4 className="text-center">Let's Start Conversation</h4>
        </div>
      ) : (
        <>
          <div className="flex items-center gap-2 bg-zinc-800 text-white px-4 py-2 mb-2">
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img
                  src={`http://localhost:5000/${userDetail.profilePhoto}`}
                  alt="img"
                />
              </div>
            </div>
            <div className="flex hover:text-[#323232]">
              <div className="flex gap-2 flex-1">
                <p className="text-white ">{userDetail.userName}</p>
              </div>
            </div>
          </div>
          <Messages />
          <MessageInput />
        </>
      )}
    </div>
  );
};

export default MessageList;

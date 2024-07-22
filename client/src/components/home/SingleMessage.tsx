/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

type messageType = {
  createdAt: string;
  message: string;
  updatedAt: string;
  senderId: string;
  receiverId: string;
  _id: string;
};
const SingleMessage = ({ messages }: { messages: messageType }) => {
  const scroll = useRef<any>();
  const { userDetail } = useSelector((state: any) => state.user);
  const userInfo = JSON.parse(localStorage.getItem("userInfo") as string);
  const authCheck = messages.senderId === userInfo?.id;

  useEffect(() => {
    scroll.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div ref={scroll} className="">
      <div className={`chat ${!authCheck ? "chat-start" : "chat-end"}  mt-2 `}>
        <div className="chat-image avatar">
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS chat bubble component"
              src={`http://localhost:5000/${
                authCheck ? userInfo.profilePhoto : userDetail.profilePhoto
              }`}
            />
          </div>
        </div>
        <div className={`chat-bubble ${!authCheck ? "" : "bg-green-900"}`}>
          {messages?.message}
        </div>
      </div>
    </div>
  );
};

export default SingleMessage;

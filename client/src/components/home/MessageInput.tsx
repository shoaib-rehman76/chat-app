/* eslint-disable @typescript-eslint/no-explicit-any */
import { Send } from "lucide-react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { axiosInstance } from "../../utils/axiosInstance";
import { setMessages } from "../../store/messagesReducer";

const MessageInput = () => {
  const [message, setMessage] = useState("");
  const dispatch = useDispatch();
  const { userDetail } = useSelector((store: any) => store.user);
  const { messages } = useSelector((store: any) => store.message);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const res = await axiosInstance.post(`message/send/${userDetail?._id}`, {
        message,
      });
      const data = res.data.data;

      if (messages) {
        dispatch(setMessages([...messages, data]));
      } else {
        dispatch(setMessages([data]));
      }
    } catch (error) {
      console.log(error);
    }
    setMessage("");
  };
  return (
    <div className="px-4 my-3">
      <div className="w-full relative">
        <input
          value={message}
          type="text"
          placeholder="send a message...."
          className="border text-sm rounded-lg block w-full p-3 border-zinc-500 bg-gray-600 text-white "
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          className="absolute flex items-center inset-y-0 end-1 z-10"
          onClick={handleSubmit}
        >
          <Send />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;

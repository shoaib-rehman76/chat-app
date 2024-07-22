/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import SingleMessage from "./SingleMessage";
import useGetRealTimeMessage from "../../hooks/useGetRealTimeMessages";
import { useLoadMessages } from "../../hooks/useLoadMessages";

const Messages = () => {
  useLoadMessages();
  useGetRealTimeMessage();
  const { messages } = useSelector((state: any) => state.message);

  return (
    <div className="px-4 flex flex-1 overflow-auto flex-col">
      {messages &&
        messages?.map((message: any, index: number) => (
          <SingleMessage key={index} messages={message} />
        ))}
    </div>
  );
};

export default Messages;

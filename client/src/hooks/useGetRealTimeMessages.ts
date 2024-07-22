/* eslint-disable @typescript-eslint/no-explicit-any */
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/messagesReducer";
import { useEffect } from "react";

// const useGetRealTimeMessages = () => {
//   const dispatch = useDispatch();
//   const { socket } = useSelector((state: any) => state.socket);
//   const { messages } = useSelector((state: any) => state.message);

//   console.log(messages, "messages----------.");

//   useEffect(() => {
//     socket?.on("newMessage", (newMessage: any) => {
//       dispatch(setMessages([...messages, newMessage]));
//     });
//   }, [messages, socket]);
// };

const useGetRealTimeMessage = () => {
  const { socket } = useSelector((store: any) => store.socket);
  const { messages } = useSelector((store: any) => store.message);

  // console.log(messages, "messages --------.", socket);

  const dispatch = useDispatch();
  useEffect(() => {
    // console.log("i am logged here!");

    socket?.on("newMessage", (newMessage: any) => {
      console.log(newMessage, "newmessage");

      dispatch(setMessages([...messages, newMessage]));
    });
    return () => socket?.off("newMessage");
  }, [setMessages, messages, dispatch]);
};

export default useGetRealTimeMessage;

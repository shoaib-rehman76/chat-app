/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect } from "react";
import { axiosInstance } from "../utils/axiosInstance";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../store/messagesReducer";

export const useLoadMessages = () => {
  const dispatch = useDispatch();
  const { userDetail } = useSelector((state: any) => state.user);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get(`message/${userDetail?._id}`);
        console.log(userDetail, "in fetch user details");
        console.log(res.data, "in fetch user details");

        dispatch(setMessages(res.data.data));
      } catch (error) {
        toast.error("some error");
        return null;
      }
    };

    fetchUsers();
  }, [userDetail]);
};

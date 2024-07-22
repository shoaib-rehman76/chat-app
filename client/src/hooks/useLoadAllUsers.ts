import { useEffect } from "react";
import toast from "react-hot-toast";
import { axiosInstance } from "../utils/axiosInstance";
import { useDispatch } from "react-redux";
import { setAllUser } from "../store/reducers";

export const useLoadAllUsers = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axiosInstance.get("user");
        dispatch(setAllUser(res.data.data));
      } catch (error) {
        toast.error("some error");
        return null;
      }
    };

    fetchUsers();
  }, []);
};

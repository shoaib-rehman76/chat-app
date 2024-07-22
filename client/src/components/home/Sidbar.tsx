/* eslint-disable @typescript-eslint/no-explicit-any */
import { Search } from "lucide-react";
import UserList from "./UserList";
import { axiosInstance } from "../../utils/axiosInstance";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setAuthUser } from "../../store/reducers";

const Sidbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const { allUsers } = useSelector((store: any) => store.user);
  const [renderUser, setRenderUser] = useState(allUsers);

  useEffect(() => {
    searchSubmitHandler();
  }, [allUsers, search]);

  const searchSubmitHandler = () => {
    const searchUser = allUsers?.filter((user: any) =>
      user?.userName?.includes(search)
    );

    setRenderUser(searchUser);
  };

  const logout = async () => {
    try {
      const res = await axiosInstance("user/logout");
      dispatch(setAuthUser(null));
      localStorage.clear();
      toast.success(res.data.message);
      navigate("/sign-in");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="border border-slate-500 p-4 flex flex-col ">
        <form className="flex items-center gap-2">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="input input-bordered rounded-md "
            placeholder="search..."
          />
          <button
            type="submit"
            className="btn btn-outline btn-circle text-white btn-ghost"
          >
            <Search size="24px" className="text-white" />
          </button>
        </form>
        <div className="divider"></div>

        <UserList renderUser={renderUser} />

        <div className="mt-4">
          <button className="btn btn-sm " onClick={logout}>
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidbar;

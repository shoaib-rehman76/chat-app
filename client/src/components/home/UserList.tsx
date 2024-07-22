/* eslint-disable @typescript-eslint/no-explicit-any */
import SingleUser from "./SingleUser";
import { useLoadAllUsers } from "../../hooks/useLoadAllUsers";

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

const UserList = ({ renderUser }: { renderUser: any }) => {
  useLoadAllUsers();

  return (
    <div className="overflow-y-auto flex-1">
      {renderUser !== null &&
        renderUser?.map((user: apiResonseType, index: number) => (
          <SingleUser key={index} user={user} />
        ))}
    </div>
  );
};

export default UserList;

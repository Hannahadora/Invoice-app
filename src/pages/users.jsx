import React, { useLayoutEffect, useState } from "react";
import CreateUser from "../components/CreateUser";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/users";

const users = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const allUsers = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.users.selectedUser);

  const dispatch = useDispatch();

  const editUser = (user) => {
    dispatch(selectUser({ id: user.id }));
    setAddUserModal(true);
  };

  useLayoutEffect(() => {
    // getUsers();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="text-[40px]">Users</h1>
        <button
          onClick={() => setAddUserModal(true)}
          className="flex btn pry_btn"
        >
          <img
            className="mr-3 p-2 bg-[#ffffff] rounded-full"
            src="/images/icon-plus.svg"
            alt=""
          />{" "}
          Add New User
        </button>
      </div>

      <ul className="w-full mx-auto mt-[40px]">
        {allUsers &&
          allUsers.map((user, i) => (
            <li
              key={i}
              className="mb-[24px] flex items-center justify-between bg-[#ffffff] p-[16px] shadow rounded-[10px]"
            >
              <h3 className="text-[20px] text-blue-900">{user.name}</h3>
              <span>{user.email}</span>
              <span>{user.role}</span>
              <h6
                onClick={() => editUser(user)}
                className="cursor-pointer text-red-900"
              >
                Edit
              </h6>
            </li>
          ))}
      </ul>

      {addUserModal && addUserModal ? (
        <CreateUser user={user} onCloseModal={() => {
          setAddUserModal(false)
          dispatch(selectUser({id: ""}))
        }} />
      ) : (
        ""
      )}
    </div>
  );
};

export default users;

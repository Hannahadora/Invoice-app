import React, { useLayoutEffect, useRef, useState } from "react";
import CreateUser from "../components/CreateUser";
import { useSelector, useDispatch } from "react-redux";
import { selectUser } from "../redux/users";
import { easeIn } from "../utils/GsapAnimations";

const users = () => {
  const [addUserModal, setAddUserModal] = useState(false);
  const allUsers = useSelector((state) => state.users.users);
  const user = useSelector((state) => state.users.selectedUser);
  const theme = useSelector((state) => state.theme.theme);
  const userListRef = useRef();
  const modalBtnRef = useRef(null);
  const modalBtnRef2 = useRef(null);

  const dispatch = useDispatch();

  const editUser = (user) => {
    dispatch(selectUser({ id: user.id }));
    setAddUserModal(true);
  };

  useLayoutEffect(() => {
    // getUsers();
    easeIn(userListRef);
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="lg:text-[35px] text-[25px]">Users</h1>
        <button
          ref={modalBtnRef}
          onClick={() => setAddUserModal(true)}
          className="flex items-center icon_btn pry_btn rounded-[24px]"
        >
          <img
            className="mr-3 p-2 bg-[#ffffff] rounded-full"
            src="/images/icon-plus.svg"
            alt=""
          />{" "}
          <span className="mr-1">New</span> <span className="md:block hidden mr-3">User</span>
        </button>
      </div>

      <ul className="w-full mx-auto mt-[40px]">
        {allUsers &&
          allUsers.map((user, i) => (
            <li
              ref={userListRef}
              key={i}
              className={`mb-[24px] flex items-center justify-between ${
                theme === "light"
                  ? "text-[#666EA0]  bg-[#ffffff]"
                  : "text-[#eff1ff] bg-[#1e2139]"
              } lg:px-[16px] lg:px-[16px] px-[8px] py-[16px] shadow rounded-[10px]`}
            >
              <h3 className="lg:text-[20px] text-[16px] text-blue-900 mr-[8px]">{user.name}</h3>
              <span className="mr-[8px]">{user.email}</span>
              <span className="mr-[8px]">{user.role}</span>
              <h6
                ref={modalBtnRef2}
                onClick={() => editUser(user)}
                className="cursor-pointer text-red-900"
              >
                Edit
              </h6>
            </li>
          ))}
      </ul>

      {addUserModal && (
        <CreateUser
          user={user}
          isOpen={addUserModal}
          btnRef={user ? modalBtnRef2 : modalBtnRef}
          setAddUserModal={() => {
            setAddUserModal(false);
            dispatch(selectUser({ id: "" }));
          }}
        />
      )}
    </div>
  );
};

export default users;

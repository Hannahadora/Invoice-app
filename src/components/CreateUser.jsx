import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import CustomInput from "./CustomInput";
import { addUser, updateUser } from "../redux/users";
import { useSelector, useDispatch } from "react-redux";
import CustomModal from "./shared/CustomModal";

const CreateUser = ({ setAddUserModal, user, isOpen, btnRef }) => {
  const [userForm, setUserForm] = useState({
    id: "",
    name: "",
    email: "",
    role: "",
  });
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCreateUser = () => {
    setIsSubmitting(true);
    const updatedUserForm = {
      ...userForm,
    };
    user
      ? dispatch(updateUser(updatedUserForm))
      : dispatch(addUser(updatedUserForm));
    setTimeout(() => {
      // alert("Successful!!");
      setAddUserModal();
    }, 400);
  };

  useEffect(() => {
    user && setUserForm({ ...user });
  }, [user]);

  return (
    <>
      <CustomModal
        isOpen={isOpen}
        btnRef={btnRef}
        setModalVisibility={() => setAddUserModal(false)}
      >
        <h1 className="text-[30px] mb-[40px]">
          {user ? "Edit User" : "Create User"}
        </h1>

        <form
          className="flex flex-col space-y-[24px]"
          onSubmit={handleCreateUser}
        >
          <CustomInput
            type="text"
            name="name"
            placeholder="Name"
            required
            value={userForm.name}
            handleChange={handleInputChange}
          />
          <CustomInput
            type="email"
            name="email"
            placeholder="Email"
            value={userForm.email}
            handleChange={handleInputChange}
          />
          <CustomInput
            type="text"
            name="role"
            required
            placeholder="Role"
            value={userForm.role}
            handleChange={handleInputChange}
          />
          {}
          <div className="mt-[100px] flex items-center justify-end space-x-[24px]">
            <button
              type="button"
              onClick={() => setAddUserModal()}
              className="btn sec_btn"
            >
              Close
            </button>
            <button
              type="submit"
              className="btn pry_btn"
              disabled={isSubmitting}
            >
              {user && user ? "Update" : "Save"}
            </button>
          </div>
        </form>
      </CustomModal>
    </>
  );
};

export default CreateUser;

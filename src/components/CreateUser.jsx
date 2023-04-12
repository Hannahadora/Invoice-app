import React, { useEffect, useState } from "react";
import { Formik } from "formik";
import CustomInput from "./CustomInput";
import { addUser } from "../redux/users";
import { useSelector, useDispatch } from "react-redux";

const CreateUser = ({ onCloseModal, user }) => {
  const [userForm, setUserForm] = useState({ id: "", name: "", email: "", role: "" });
  const dispatch = useDispatch();

  useEffect(() => {
    user && setUserForm({ ...user });
  }, [user]);

  return (
    <div className="">
      <div className="bg-[#00000060] fixed top-0 w-full right-0 left-0 h-screen"></div>
      <div className="lg:ml-[100px] ml-[0] bg-[#ffffff] rounded-r-[12px] p-[50px] h-screen absolute left-[0] top-[0] lg:w-[40%] w-[100%]">
        <h1 className="text-[30px] mb-[40px]">{user ? 'Edit User' : 'Create User'}</h1>

        <Formik
          initialValues={userForm}
          validate={(values) => {
            const errors = {};
            if (!values.email) {
              errors.email = "Required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            dispatch(addUser(values));
            setTimeout(() => {
              setSubmitting(false);
              onCloseModal();
            }, 400);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            /* and other goodies */
          }) => (
            <form
              className="flex flex-col space-y-[24px]"
              onSubmit={handleSubmit}
            >
              <CustomInput
                type="name"
                name="name"
                placeholder="Name"
                required
                error={errors.name && touched.name && errors.name}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.name}
              />
              <CustomInput
                type="email"
                name="email"
                placeholder="Email"
                error={errors.email && touched.email && errors.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
              />
              <CustomInput
                type="role"
                name="role"
                required
                placeholder="Role"
                error={errors.role && touched.role && errors.role}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.role}
              />
              {}
              <div className="mt-[100px] flex items-center justify-end space-x-[24px]">
                <button
                  type="button"
                  onClick={() => onCloseModal()}
                  className="btn sec_btn"
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn pry_btn"
                  disabled={isSubmitting}
                >
                  Save
                </button>
              </div>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default CreateUser;

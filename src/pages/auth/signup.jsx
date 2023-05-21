import React, { useEffect, useRef } from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../redux/auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { zoomOut } from "../../utils/GsapAnimations";

const signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme)
  const signupFormRef = useRef(null)

  const handleRegister = (values, setSubmitting) => {
    const res = dispatch(registerUser(values));
    if(res) {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    zoomOut(signupFormRef)
  }, []);

  return (
    <div className="w-full">
      <p className="text-[28px] text-[20px] text-center">Signup!!!</p>
      <div ref={signupFormRef} className={`xl:w-[70%] lg:w-[90%] w-[100%] mx-auto mt-[16px] px-[20px] py-[20px] rounded ${theme === "light" ? "bg-[#ffffff]" : "bg-[#141625] shadow"}`}>
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validate={(values) => {
            const errors = {};
            if(!values.username) {
              errors.username = "Username is required"
            }
            if(!values.password) {
              errors.password = "Password is required"
            }
            if(!values.confirmPassword || values.confirmPassword !== values.password) {
              errors.confirmPassword = "Password doesnot match"
            }
            if (!values.email) {
              errors.email = "Email is required";
            } else if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
              errors.email = "Invalid email address";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleRegister(values, setSubmitting);
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
              className="flex flex-col space-y-[20px]"
              onSubmit={handleSubmit}
            >
              <CustomInput
                type="text"
                name="username"
                placeholder="Username"
                error={errors.username && touched.username && errors.username}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.username}
              />
              <CustomInput
                type="text"
                name="email"
                placeholder="Email"
                error={errors.email && touched.email && errors.email}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.email}
              />
              {/*  */}
              <CustomInput
                type="password"
                name="password"
                placeholder="Password"
                error={errors.password && touched.password && errors.password}
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.password}
              />
              <CustomInput
                type="password"
                name="confirmPassword"
                placeholder="Confirm Password"
                error={
                  errors.confirmPassword &&
                  touched.confirmPassword &&
                  errors.confirmPassword
                }
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.confirmPassword}
              />
              {}
              <button
                type="submit"
                className="mt-[20px] btn pry_btn"
                disabled={isSubmitting}
              >
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>

      <div className="text-center mt-[30px] text-[18px]">
        <p>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/auth/signin")}
            className="text-blue-900 cursor-pointer hover:underline hover:font-bold font-medium"
          >
            Login
          </span>
        </p>
      </div>
    </div>
  );
};

export default signup;

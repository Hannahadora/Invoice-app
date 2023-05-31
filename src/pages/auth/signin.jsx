import React, { useEffect, useLayoutEffect, useRef } from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../redux/auth";
import { zoomOut } from "../../utils/GsapAnimations";
import { useNavigate } from "react-router-dom";

const signin = () => {
  const loginFormRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector((state) => state.theme.theme);

  const handleLogin = (values, setSubmitting) => {
    dispatch(loginUser(values));
    setSubmitting(false);
    navigate("/");
  };

  const forgotPassword = () => {};

  useLayoutEffect(() => {
    zoomOut(loginFormRef);
  }, []);

  return (
    <div className="w-full">
      <p className="lg:text-[28px] text-[20px] text-center">
        Welcome Back!!! Login
      </p>
      <div
        ref={loginFormRef}
        className={`xl:w-[70%] lg:w-[90%] w-[100%] mx-auto mt-[16px] px-[20px] py-[20px] rounded ${
          theme === "light" ? "bg-[#ffffff]" : "bg-[#141625]"
        }`}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validate={(values) => {
            const errors = {};
            if (!values.password) {
              errors.email = "Required";
            }
            if (!values.email) {
              errors.email = "Required";
            }
            return errors;
          }}
          onSubmit={(values, { setSubmitting }) => {
            handleLogin(values, setSubmitting);
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
                type="email"
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
              {}
              <button
                type="submit"
                className="mt-[20px] btn pry_btn"
                disabled={isSubmitting}
              >
                Login
              </button>
            </form>
          )}
        </Formik>
        <p
          onClick={() => forgotPassword()}
          className="mt-[16px] text-right text-blue-900 cursor-pointer hover:underline hover:font-bold font-medium"
        >
          Forgot Password
        </p>
      </div>

      <div className="text-center mt-[20px] text-[18px]">
        <p>
          Don't have an account?{" "}
          <span
            onClick={() => navigate("/auth/register")}
            className="text-blue-900 cursor-pointer hover:underline hover:font-bold font-medium"
          >
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default signin;

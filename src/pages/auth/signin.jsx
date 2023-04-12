import React from "react";
import { Formik } from "formik";
import CustomInput from "../../components/CustomInput";

const signin = () => {
  return (
    <div className="w-full">
      <p className="text-[40px] text-center">Login</p>
      <div className="w-[70%] mx-auto mt-[16px] p-[16px] border rounded">
        <Formik
          initialValues={{ email: "", password: "" }}
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
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
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
            <form className="flex flex-col space-y-[20px]" onSubmit={handleSubmit}>
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
                Submit
              </button>
            </form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default signin;

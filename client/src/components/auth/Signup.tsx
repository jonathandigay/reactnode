import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { register } from "../../redux/auth/AuthSlice";

interface IValues {
  username: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

const Validate: any = Yup.object({
  username: Yup.string().required("username is required!"),
  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
  password: Yup.string()
    .required("password is required!")
    .min(6, "Password atlease 6 or more character")
    .matches(/[0-9]/g, "Password have atleast  one number"),
  confirmPassword: Yup.string()
    .required("Confirm your password")
    .oneOf([Yup.ref("password"), null], "Password must match"),
});

const initialValues: IValues = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Signup = () => {
  const dispatch = useDispatch();
  const { user, isLoading, isRegisterErr } = useSelector(
    (state: any) => state.auth
  );
  const Navigate = useNavigate();

  const onSignup = async (userData: IValues) => {
    await dispatch(register(userData));
  };

  useEffect(() => {
    if (user) {
      Navigate("/dashboard");
    }
  }, [user, isLoading, Navigate]);
  return (
    <div className="signup form-wrapper">
      <Formik
        initialValues={initialValues}
        onSubmit={(userData) => onSignup(userData)}
        validationSchema={Validate}
      >
        {({ errors, touched }) => (
          <>
            <Link to="/">
              <button>Back</button>
            </Link>
            <Form className="form">
              <div className="title">
                <h1>Sign up</h1>
              </div>
              {isRegisterErr && (
                <div
                  className="error-credential"
                  style={{ marginBottom: "10px", textAlign: "center" }}
                >
                  {" "}
                  {isRegisterErr}
                </div>
              )}
              <div className="input">
                <label>Username</label>
                <Field
                  type="text"
                  placeholder="type your username"
                  name="username"
                />
                {errors.username && touched.username && (
                  <div className="error-credential">{errors.username}</div>
                )}
              </div>

              <div className="input">
                <label> Email</label>
                <Field
                  type="email"
                  placeholder="type your email"
                  name="email"
                />
                {errors.email && touched.email && (
                  <div className="error-credential">{errors.email}</div>
                )}
              </div>

              <div className="input">
                <label> Password</label>
                <Field
                  type="password"
                  placeholder="type your password"
                  name="password"
                />
                {errors.password && touched.password && (
                  <div className="error-credential">{errors.password}</div>
                )}
              </div>

              <div className="input">
                <label> Confirm Password</label>
                <Field
                  type="password"
                  placeholder="type your password"
                  name="confirmPassword"
                />
                {errors.confirmPassword && touched.confirmPassword && (
                  <div className="error-credential">
                    {errors.confirmPassword}
                  </div>
                )}
              </div>

              <div className="action">
                <button>Sign up</button>
              </div>

              <div className="text">
                <p>
                  Already have an account ? <Link to="/login">Log in</Link>
                </p>
              </div>
            </Form>{" "}
          </>
        )}
      </Formik>
    </div>
  );
};

export default Signup;

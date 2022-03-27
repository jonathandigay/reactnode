import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { reset, login } from "../../redux/auth/AuthSlice";
interface IValues {
  email: string;
  password: string;
}

const Validate: any = Yup.object({
  email: Yup.string()
    .email("Invalid email")
    .required("Email address is required"),
  password: Yup.string().required("password is required!"),
});

const initialValues: IValues = {
  email: "",
  password: "",
};

const Login = () => {
  const dispatch = useDispatch();
  const { user, isError, isLoading, isSuccess, isLoginErr } = useSelector(
    (state: any) => state.auth
  );

  const Navigate = useNavigate();

  const onLogin = async (userData: IValues) => {
    dispatch(login(userData));
    dispatch(reset());
  };

  useEffect(() => {
    if (user) {
      Navigate("/dashboard");
    }
  }, [user, isError, isLoading, isSuccess, Navigate]);

  return (
    <div className="login form-wrapper">
      <Formik
        initialValues={initialValues}
        onSubmit={(values) => onLogin(values)}
        validationSchema={Validate}
      >
        {({ errors, touched }) => (
          <>
            <Link to="/">
              <button>Back</button>
            </Link>
            <Form className="form">
              <div className="title">
                <h1>Login</h1>
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
                {isLoginErr && (
                  <div className="error-credential">{isLoginErr}</div>
                )}
              </div>

              <div className="action">
                <button>Log in</button>
              </div>

              <div className="text">
                <p>
                  dont have an accoutn ? <Link to="/signup">Signup</Link>
                </p>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
};

export default Login;

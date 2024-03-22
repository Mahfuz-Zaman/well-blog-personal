// import React from "react";
// import { useDispatch } from "react-redux";
// import { Form, Field } from "react-final-form";
// import { useNavigate, Link } from "react-router-dom";
// import { registerUser } from "@actions/authActions";
// import Button from "@components/Button/Button";
// import "@components/Register/register.scss";

// const Register = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const validate = (values) => {
//     const errors = {};
//     if (!values.userName) {
//       errors.userName = "User Name Required";
//     }
//     if (!values.firstName) {
//       errors.firstName = "First Name Required";
//     }
//     if (!values.lastName) {
//       errors.lastName = "Last Name Required";
//     }
//     if (!values.email) {
//       errors.email = "Email Required";
//     } else if (
//       !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
//     ) {
//       errors.email = "Invalid email address";
//     }
//     if (!values.password) {
//       errors.password = "Password Required";
//     }
//     return errors;
//   };

//   const handleRegisterSubmit = (event) => {
//     dispatch(registerUser(event));
//     navigate("/login");
//   };

//   return (
//     <section className="registration-form">
//       <h1 className="registration-form__title">Registration Form</h1>
//       <Form
//         onSubmit={handleRegisterSubmit}
//         validate={validate}
//         render={({ handleSubmit }) => (
//           <form onSubmit={handleSubmit} className="registration-form__form">
//             <div className="registration-form__field">
//               <label className="registration-form__label">User Name:*</label>
//               <Field
//                 type="text"
//                 name="userName"
//                 component="input"
//                 className="registration-form__input"
//               />
//               <div className="registration-form__error">
//                 <Field
//                   name="userName"
//                   subscription={{ error: true, touched: true }}
//                 >
//                   {({ meta: { touched, error } }) =>
//                     touched && error ? (
//                       <span className="registration-form__error-text">
//                         {error}
//                       </span>
//                     ) : null
//                   }
//                 </Field>
//               </div>
//             </div>
//             <div className="registration-form__field">
//               <label className="registration-form__label">First Name:*</label>
//               <Field
//                 type="text"
//                 name="firstName"
//                 component="input"
//                 className="registration-form__input"
//               />
//               <div className="registration-form__error">
//                 <Field
//                   name="firstName"
//                   subscription={{ error: true, touched: true }}
//                 >
//                   {({ meta: { touched, error } }) =>
//                     touched && error ? (
//                       <span className="registration-form__error-text">
//                         {error}
//                       </span>
//                     ) : null
//                   }
//                 </Field>
//               </div>
//             </div>
//             <div className="registration-form__field">
//               <label className="registration-form__label">Last Name:*</label>
//               <Field
//                 type="text"
//                 name="lastName"
//                 component="input"
//                 className="registration-form__input"
//               />
//               <div className="registration-form__error">
//                 <Field
//                   name="lastName"
//                   subscription={{ error: true, touched: true }}
//                 >
//                   {({ meta: { touched, error } }) =>
//                     touched && error ? (
//                       <span className="registration-form__error-text">
//                         {error}
//                       </span>
//                     ) : null
//                   }
//                 </Field>
//               </div>
//             </div>
//             <div className="registration-form__field">
//               <label className="registration-form__label">Email:*</label>
//               <Field
//                 type="email"
//                 name="email"
//                 component="input"
//                 className="registration-form__input"
//               />
//               <div className="registration-form__error">
//                 <Field
//                   name="email"
//                   subscription={{ error: true, touched: true }}
//                 >
//                   {({ meta: { touched, error } }) =>
//                     touched && error ? (
//                       <span className="registration-form__error-text">
//                         {error}
//                       </span>
//                     ) : null
//                   }
//                 </Field>
//               </div>
//             </div>
//             <div className="registration-form__field">
//               <label className="registration-form__label">Password:*</label>
//               <Field
//                 type="password"
//                 name="password"
//                 component="input"
//                 className="registration-form__input"
//               />
//               <div className="registration-form__error">
//                 <Field
//                   name="password"
//                   subscription={{ error: true, touched: true }}
//                 >
//                   {({ meta: { touched, error } }) =>
//                     touched && error ? (
//                       <span className="registration-form__error-text">
//                         {error}
//                       </span>
//                     ) : null
//                   }
//                 </Field>
//               </div>
//             </div>
//             <Button
//               onClick={handleSubmit}
//               type="submit"
//               className="registration-form__button"
//             >
//               Signup
//             </Button>
//             <div className="registration-form__footer-link">
//               Already have an account?
//               <Link to="/login"> Login </Link>
//             </div>
//           </form>
//         )}
//       />
//     </section>
//   );
// };

// export default Register;

import React from "react";
import { Form, Field } from "react-final-form";
import { useNavigate, Link } from "react-router-dom";
import Button from "@components/Button/Button";
import "@components/Register/register.scss";
import { useDispatch } from "react-redux";
import { registerUser } from "@actions/authActions";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validate = (values) => {
    const errors = {};
    if (!values.userName) {
      errors.userName = "User Name Required";
    }
    if (!values.firstName) {
      errors.firstName = "First Name Required";
    }
    if (!values.lastName) {
      errors.lastName = "Last Name Required";
    }
    if (!values.email) {
      errors.email = "Email Required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
    ) {
      errors.email = "Invalid email address";
    }
    if (!values.password) {
      errors.password = "Password Required";
    }
    return errors;
  };

  const handleRegisterSubmit = async (values) => {
    try {
      await dispatch(registerUser(values));
      navigate("/login");
    } catch (error) {
      console.error("Failed to register user: ", error.message);
    }
  };

  return (
    <section className="registration-form">
      <h1 className="registration-form__title">Registration Form</h1>
      <Form
        onSubmit={handleRegisterSubmit}
        validate={validate}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit} className="registration-form__form">
            <div className="registration-form__field">
              <label className="registration-form__label">User Name:*</label>
              <Field
                type="text"
                name="userName"
                component="input"
                className="registration-form__input"
              />
              <div className="registration-form__error">
                <Field
                  name="userName"
                  subscription={{ error: true, touched: true }}
                >
                  {({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="registration-form__error-text">
                        {error}
                      </span>
                    ) : null
                  }
                </Field>
              </div>
            </div>
            <div className="registration-form__field">
              <label className="registration-form__label">First Name:*</label>
              <Field
                type="text"
                name="firstName"
                component="input"
                className="registration-form__input"
              />
              <div className="registration-form__error">
                <Field
                  name="firstName"
                  subscription={{ error: true, touched: true }}
                >
                  {({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="registration-form__error-text">
                        {error}
                      </span>
                    ) : null
                  }
                </Field>
              </div>
            </div>
            <div className="registration-form__field">
              <label className="registration-form__label">Last Name:*</label>
              <Field
                type="text"
                name="lastName"
                component="input"
                className="registration-form__input"
              />
              <div className="registration-form__error">
                <Field
                  name="lastName"
                  subscription={{ error: true, touched: true }}
                >
                  {({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="registration-form__error-text">
                        {error}
                      </span>
                    ) : null
                  }
                </Field>
              </div>
            </div>
            <div className="registration-form__field">
              <label className="registration-form__label">Email:*</label>
              <Field
                type="email"
                name="email"
                component="input"
                className="registration-form__input"
              />
              <div className="registration-form__error">
                <Field
                  name="email"
                  subscription={{ error: true, touched: true }}
                >
                  {({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="registration-form__error-text">
                        {error}
                      </span>
                    ) : null
                  }
                </Field>
              </div>
            </div>
            <div className="registration-form__field">
              <label className="registration-form__label">Password:*</label>
              <Field
                type="password"
                name="password"
                component="input"
                className="registration-form__input"
              />
              <div className="registration-form__error">
                <Field
                  name="password"
                  subscription={{ error: true, touched: true }}
                >
                  {({ meta: { touched, error } }) =>
                    touched && error ? (
                      <span className="registration-form__error-text">
                        {error}
                      </span>
                    ) : null
                  }
                </Field>
              </div>
            </div>
            <Button
              onClick={handleSubmit}
              type="submit"
              className="registration-form__button"
            >
              Signup
            </Button>
            <div className="registration-form__footer-link">
              Already have an account?
              <Link to="/login"> Login </Link>
            </div>
          </form>
        )}
      />
    </section>
  );
};

export default Register;

// import { v4 as uuidv4 } from "uuid";
// import {
//   REGISTERED_USER,
//   LOGGEDIN_USER,
//   LOGGEDOUT_USER,
//   UPDATE_USER_PROFILE,
// } from "@constants/actionTypes";

// export const registerUser = (user) => {
//   return (dispatch) => {
//     try {
//       const {
//         firstName,
//         lastName,
//         fullName,
//         subtitle,
//         about,
//         profileImage,
//         ...rest
//       } = user;

//       const userId = uuidv4();
//       const newUser = {
//         ...rest,
//         userId,
//         fullName: fullName || `${firstName} ${lastName}`,
//         subtitle: subtitle || null,
//         about: about || null,
//         profileImage: profileImage || null,
//       };

//       dispatch({
//         type: REGISTERED_USER,
//         payload: newUser,
//       });

//       let users = JSON.parse(localStorage.getItem("users")) || [];
//       localStorage.setItem("users", JSON.stringify(users));
//     } catch (error) {
//       throw new Error("Failed to register user: " + error.message);
//     }
//   };
// };

// export const loginUser = (user) => {
//   return (dispatch) => {
//     try {
//       dispatch({
//         type: LOGGEDIN_USER,
//         payload: user,
//       });
//       localStorage.setItem("loggedInUser", JSON.stringify(user));
//     } catch (error) {
//       throw new Error("Failed to login user: " + error.message);
//     }
//   };
// };

// export const logoutUser = () => {
//   return (dispatch) => {
//     try {
//       dispatch({
//         type: LOGGEDOUT_USER,
//       });
//       localStorage.removeItem("loggedInUser");
//     } catch (error) {
//       throw new Error("Failed to logout user: " + error.message);
//     }
//   };
// };

// export const loginUserWithLocalStorage = (
//   user,
//   errorMessageSetter,
//   navigate
// ) => {
//   return (dispatch) => {
//     try {
//       const users = JSON.parse(localStorage.getItem("users")) || [];
//       const loggedInUser = users.find(
//         (storedUser) => storedUser.userName === user.userName
//       );

//       if (loggedInUser && user.password === loggedInUser.password) {
//         dispatch(loginUser(loggedInUser));
//         navigate("/");
//       } else {
//         errorMessageSetter("Invalid username or password");
//       }
//     } catch (error) {
//       throw new Error("Failed to login with local storage: " + error.message);
//     }
//   };
// };

// export const updateUserProfile = (userId, profileData, blogs) => {
//   return {
//     type: UPDATE_USER_PROFILE,
//     payload: { userId, profileData, blogs },
//   };
// };

import supabase from "./../app/supabase";
import { LOGGEDIN_USER, LOGGEDOUT_USER } from "@constants/actionTypes";

export const registerUser = (user) => async (dispatch) => {
  try {
    const { email, password, firstName, lastName, userName } = user;
    const { user: newUser, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          firstName,
          lastName,
          userName,
        },
      },
    });

    if (error) {
      throw new Error(error.message);
    }

    return newUser;
  } catch (error) {
    throw new Error("Failed to register user: " + error.message);
  }
};

export const loginUser = (userData) => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: userData.email,
        password: userData.password,
      });
      console.log(data);

      if (error) {
        throw new Error(error.message);
      }

      dispatch({
        type: LOGGEDIN_USER,
        payload: data.user,
      });

      localStorage.setItem("loggedInUser", JSON.stringify(data.user));

      return data.user;
    } catch (error) {
      throw new Error("Failed to login user: " + error.message);
    }
  };
};

export const logoutUser = () => async (dispatch) => {
  try {
    await supabase.auth.signOut();
    dispatch({
      type: LOGGEDOUT_USER,
    });
    localStorage.removeItem("loggedInUser");
  } catch (error) {
    console.log(error);
    throw new Error("Failed to logout user: " + error.message);
  }
};

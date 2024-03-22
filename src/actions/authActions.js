import { v4 as uuidv4 } from "uuid";
import {
  LOGGEDIN_USER,
  LOGGEDOUT_USER,
  UPDATE_USER_PROFILE,
} from "@constants/actionTypes";
import supabase from "./../app/supabase";

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

export const updateUser = (user, profileImage) => {
  return async (dispatch) => {
    try {
      const { data: image, error: imageError } = await supabase.storage
        .from("avatars")
        .upload(uuidv4(), profileImage);

      const { data: updatedUserData, error } = await supabase.auth.updateUser({
        data: {
          ...user,
          profileImage: image.fullPath,
        },
      });

      if (error) {
        throw new Error(error.message);
      }

      if (imageError) {
        throw new Error(imageError.message);
      }

      dispatch({
        type: UPDATE_USER_PROFILE,
        payload: updatedUserData.user,
      });

      localStorage.setItem(
        "loggedInUser",
        JSON.stringify(updatedUserData.user)
      );
    } catch (error) {
      throw new Error("Failed to update user: " + error.message);
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
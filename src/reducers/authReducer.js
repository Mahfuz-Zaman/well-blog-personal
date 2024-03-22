import {
  LOGGEDIN_USER,
  LOGGEDOUT_USER,
  REGISTERED_USER,
  UPDATE_USER_PROFILE,
} from "@constants/actionTypes";

const initialState = {
  users: JSON.parse(localStorage.getItem("users")) || [],
  loggedInUser: JSON.parse(localStorage.getItem("loggedInUser")) || null,
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case REGISTERED_USER:
      const newUser = action.payload;
      const updatedUsers = [...state.users, newUser];
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      return {
        ...state,
        users: updatedUsers,
      };
    case LOGGEDIN_USER:
      return {
        ...state,
        loggedInUser: action.payload,
      };

    case LOGGEDOUT_USER:
      localStorage.removeItem("loggedInUser");
      return {
        ...state,
        loggedInUser: null,
      };

    case UPDATE_USER_PROFILE:
      return {
        ...state,
        loggedInUser: action.payload,
      };
    default:
      return state;
  }
};
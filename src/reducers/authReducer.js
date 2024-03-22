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
      // localStorage.setItem("loggedInUser", JSON.stringify(action.payload));
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
      const { userId, profileData, blogs } = action.payload;
      const updatedUsersList = state?.users?.map((user) => {
        if (user.userId === userId) {
          return {
            ...user,
            ...profileData,
          };
        }
        return user;
      });

      const userUpdateOnBlog = blogs.map((blog) => {
        if (blog.userId === userId) {
          blog.creatorImage = profileData.profileImage;
          blog.creatorFullName = profileData.fullName;
        }
        return blog;
      });

      localStorage.setItem("blogPosts", JSON.stringify(userUpdateOnBlog));

      localStorage.setItem("users", JSON.stringify(updatedUsersList));
      localStorage.setItem(
        "loggedInUser",
        JSON.stringify({
          ...state.loggedInUser,
          ...profileData,
        })
      );

      return {
        ...state,
        users: updatedUsersList,
        loggedInUser: {
          ...state.loggedInUser,
          ...profileData,
        },
      };
    default:
      return state;
  }
};

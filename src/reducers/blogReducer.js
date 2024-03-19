import {
  ADD_BLOG_POST,
  EDIT_BLOG_POST,
  GET_BLOG_POSTS,
} from "@constants/actionTypes";

const initialState = JSON.parse(localStorage.getItem("blogPosts")) || [];

export const blogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_BLOG_POST:
      return [action.payload, ...state];
    case GET_BLOG_POSTS:
      return action.payload;
    case EDIT_BLOG_POST:
      const { postId, updatedPost } = action.payload;
      return state.map((post) => (post.id === postId ? updatedPost : post));
    default:
      return state;
  }
};

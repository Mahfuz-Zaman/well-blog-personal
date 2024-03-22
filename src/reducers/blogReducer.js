// import {
//   ADD_BLOG_POST,
//   EDIT_BLOG_POST,
//   GET_BLOG_POSTS,
// } from "@constants/actionTypes";

// const initialState = JSON.parse(localStorage.getItem("blogPosts")) || [];

// export const blogReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case ADD_BLOG_POST:
//       return [action.payload, ...state];
//     case GET_BLOG_POSTS:
//       return action.payload;
//     case EDIT_BLOG_POST:
//       const { postId, updatedPost } = action.payload;
//       return state.map((post) => (post.id === postId ? updatedPost : post));
//     default:
//       return state;
//   }
// };

import { getBlogs } from "@actions/blogActions";
import {
  ADD_BLOG_POST,
  EDIT_BLOG_POST,
  GET_BLOG_POSTS,
} from "@constants/actionTypes";
import supabase from "./../app/supabase";

const initialState = [];

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

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase.from("blogs").select("*");
      if (error) {
        throw new Error(error.message);
      }
      dispatch(getBlogs(data));
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
};

export const createBlogPost = (blog) => {
  const newBlog = {
    title: blog.title,
    body: blog.body,
    image: blog.image,
    tags: blog.tags,
    creatorImage: blog.creatorImage,
    creatorFullName: blog.creatorFullName,
  };

  return async (dispatch) => {
    try {
      const { error } = await supabase.from("blogs").insert([newBlog]);

      if (error) {
        throw new Error(error.message);
      }

      dispatch(fetchBlogs());
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
};
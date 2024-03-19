import { v4 as uuidv4 } from "uuid";
import {
  ADD_BLOG_POST,
  EDIT_BLOG_POST,
  GET_BLOG_POSTS,
  SEARCH_BLOG_POSTS,
  FILTER_BY_TAG,
} from "@constants/actionTypes";

export const addBlog = (post) => {
  return (dispatch) => {
    try {
      const id = uuidv4();
      const createdAt = new Date().toLocaleDateString("en-US", {
        month: "long",
        day: "2-digit",
        year: "numeric",
      });
      const postWithId = {
        ...post,
        id,
        createdAt,
      };

      dispatch({
        type: ADD_BLOG_POST,
        payload: postWithId,
      });

      const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      const updatedPosts = [postWithId, ...existingPosts];
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    } catch (error) {
      throw new Error("Error adding blog post: " + error.message);
    }
  };
};

export const getBlogPostsFromLocalStorage = () => {
  return (dispatch) => {
    try {
      const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      dispatch({
        type: GET_BLOG_POSTS,
        payload: existingPosts,
      });
    } catch (error) {
      throw new Error(
        "Error getting blog posts from local storage: " + error.message
      );
    }
  };
};

export const updateBlog = (postId, updatedPost) => {
  return (dispatch) => {
    try {
      dispatch({
        type: EDIT_BLOG_POST,
        payload: { postId, updatedPost },
      });

      const existingPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];
      const updatedPosts = existingPosts?.map((post) =>
        post.id === postId ? updatedPost : post
      );
      localStorage.setItem("blogPosts", JSON.stringify(updatedPosts));
    } catch (error) {
      throw new Error("Error updating blog post: " + error.message);
    }
  };
};

export const searchBlogPosts = (searchQuery) => {
  return {
    type: SEARCH_BLOG_POSTS,
    payload: searchQuery,
  };
};

export const filterByTags = (tags) => ({
  type: FILTER_BY_TAG,
  payload: tags,
});

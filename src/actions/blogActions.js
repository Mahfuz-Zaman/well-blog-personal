import {
  GET_BLOG_POSTS,
  SEARCH_BLOG_POSTS,
  FILTER_BY_TAG,
} from "@constants/actionTypes";

import { getSupabaseInstance } from "./../app/supabase";

const supabase = getSupabaseInstance();

export const fetchBlogs = () => {
  return async (dispatch) => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select("*")
        .order("createdAt", { ascending: false });

      if (error) {
        throw new Error(error.message);
      }

      dispatch(getBlogs(data));
    } catch (error) {
      throw error;
    }
  };
};

export const createBlogPost = (blog) => {
  return async (dispatch) => {
    try {
      const { error } = await supabase.from("blogs").insert([blog]);

      if (error) {
        throw new Error(error.message);
      }

      dispatch(fetchBlogs());
    } catch (error) {
      throw error;
    }
  };
};

export const getBlogs = (posts) => ({
  type: GET_BLOG_POSTS,
  payload: posts,
});

export const updateBlogPost = (blogId, updatedBlogData) => {
  return async (dispatch) => {
    try {
      const { error } = await supabase
        .from("blogs")
        .update(updatedBlogData)
        .eq("id", blogId);

      if (error) {
        throw new Error(error.message);
      }

      dispatch(fetchBlogs());
    } catch (error) {
      throw error;
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

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";
import BlogDetails from "@components/BlogDetails/BlogDetails";
import { fetchBlogs } from "@actions/blogActions";

const Blog = () => {
  const dispatch = useDispatch();
  const { id } = useParams();
  const blogs = useSelector((state) => state.blog);
  const blogDetails = blogs?.find((blog) => blog.id === id);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (!blogDetails) {
    return <Loader />;
  }

  return <BlogDetails blogDetails={blogDetails} />;
};

export default Blog;

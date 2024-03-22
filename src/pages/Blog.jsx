// import React from "react";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import { Loader } from "@components/Loader/Loader";
// import BlogDetails from "@components/BlogDetails/BlogDetails";

// const Blog = () => {
//   const { id } = useParams();
//   const blogs = useSelector((state) => state.blog);
//   const blogDetails = blogs?.find((blog) => blog.id === id);

//   if (!blogDetails) {
//     return <Loader />;
//   }

//   return <BlogDetails blogDetails={blogDetails} />;
// };

// export default Blog;

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Loader } from "@components/Loader/Loader";
import BlogDetails from "@components/BlogDetails/BlogDetails";
import { fetchBlogs } from "@reducers/blogReducer";

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

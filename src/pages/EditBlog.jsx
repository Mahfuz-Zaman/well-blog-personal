import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import BlogForm from "@components/BlogForm/BlogForm";
import UserDetails from "@components/UserDetails/UserDetails";

const EditBlog = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const blogPosts = useSelector((state) => state.blog);
  const [blogData, setBlogData] = useState(null);

  useEffect(() => {
    const blogPost = blogPosts?.find((post) => post.id === blogId);
    if (blogPost) {
      setBlogData(blogPost);
    }
  }, [blogId, blogPosts]);

  const handleUpdateBlog = () => {
    navigate(`/blog/${blogId}`);
  };
  return (
    <div className="container">
      <UserDetails />
      {blogData && (
        <BlogForm initialData={blogData} onSubmit={handleUpdateBlog} />
      )}
    </div>
  );
};

export default EditBlog;

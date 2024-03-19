import React, { useState } from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import BlogCard from "@components/BlogCard/BlogCard";
import NotFound from "@components/NotFound/NotFound";
import Button from "@components/Button/Button";
import "@components/BlogList/blogList.scss";

const DEFAULT_BLOGS_TO_SHOW = 9;
const MORE_BLOGS_TO_SHOW = 6;

const BlogList = ({ blogs }) => {
  const [blogsToShow, setBlogsToShow] = useState(DEFAULT_BLOGS_TO_SHOW);
  const searchQuery = useSelector((state) => state?.search?.searchQuery);
  const filteredTags = useSelector((state) => state?.filter?.filteredTags);

  const filteredBlogs = blogs.filter((blog) => {
    const titleMatches = blog.title
      .toLowerCase()
      .includes(searchQuery?.toLowerCase());
    const tagMatches =
      !filteredTags.length ||
      filteredTags.some((tag) => blog.tags.includes(tag));
    return titleMatches && tagMatches;
  });

  const handleShowMore = () => {
    setBlogsToShow((prevCount) => prevCount + MORE_BLOGS_TO_SHOW);
  };

  return (
    <>
      {filteredBlogs.length > 0 ? (
        <div className="blog-list">
          {filteredBlogs.slice(0, blogsToShow).map((blog) => (
            <BlogCard key={blog?.id} blog={blog} />
          ))}
        </div>
      ) : (
        <NotFound text="No Blogs Found." />
      )}
      {filteredBlogs?.length > blogsToShow && (
        <Button className="blog-list__button" onClick={handleShowMore}>
          Load More
        </Button>
      )}
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array,
};

BlogList.defaultProps = {
  blogs: [],
};

export default BlogList;

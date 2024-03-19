import React from "react";
import { useSelector } from "react-redux";
import NotFound from "@components/NotFound/NotFound";
import HomeBanner from "@components/HomeBanner/HomeBanner";
import FilterBlogs from "@components/FilterBlogs/FilterBlogs";
import BlogList from "@components/BlogList/BlogList";
import tags from "@constants/tags.json";

const Home = () => {
  const blogs = useSelector((state) => state.blog);
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  return (
    <div className="container">
      {loggedInUser ? (
        <>
          {blogs.length === 0 ? (
            <NotFound text="Please add a blog post" />
          ) : (
            <>
              <HomeBanner blog={blogs[0]} />
              <div className="common-title-filter-holder">
                <h2>Latest Posts</h2>
                <FilterBlogs tags={tags} />
              </div>
              <BlogList blogs={blogs} />
            </>
          )}
        </>
      ) : (
        <>
          {blogs.length === 0 ? (
            <NotFound text="Please Log In or Signup" />
          ) : (
            <>
              <HomeBanner blog={blogs[0]} />
              <div className="common-title-filter-holder">
                <h2>Latest Posts</h2>
                <FilterBlogs tags={tags} />
              </div>
              <BlogList blogs={blogs} />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

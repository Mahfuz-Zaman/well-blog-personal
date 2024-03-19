import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { searchBlogPosts } from "@actions/blogActions";
import SearchIcon from "@assets/images/icons/search.svg";
import "@components/Search/search.scss";

const Search = () => {
  const dispatch = useDispatch();
  const query = useSelector((state) => state?.search?.searchQuery);
  const location = useLocation();

  const handleSearch = (event) => {
    const searchQuery = event.target.value;
    dispatch(searchBlogPosts(searchQuery));
  };

  const shouldRenderSearch =
    !["/login", "/register"].includes(location.pathname) &&
    !location.pathname.startsWith("/blog/") &&
    !location.pathname.startsWith("/edit-blog/");

  if (!shouldRenderSearch) {
    return null;
  }

  return (
    <div className="navbar__search">
      <input
        type="search"
        placeholder="Search"
        value={query}
        onChange={handleSearch}
      />
      <img src={SearchIcon} alt="search" />
    </div>
  );
};

export default Search;

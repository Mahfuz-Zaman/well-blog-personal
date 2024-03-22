import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "@actions/authActions";
import Button from "@components/Button/Button";
import Search from "@components/Search/Search";
import LogoutIcon from "@assets/images/icons/Frame.svg";
import "@components/Header/header.scss";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);
  const blogs = useSelector((state) => state.blog);

  const handleLogout = async () => {
    try {
      await dispatch(logoutUser());
      navigate("/login");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <>
      <nav className="navbar container">
        <Link to="/" className="navbar__logo">
          WellBlog
        </Link>
        {blogs.length > 0 && <Search />}
        {loggedInUser ? (
          <div className="navbar__menu">
            Welcome
            <span className="navbar__user-name">
              <Link to="/me">{loggedInUser?.user_metadata?.firstName} !</Link>
            </span>
            <Button onClick={handleLogout} className="navbar__logout-btn">
              <img src={LogoutIcon} alt="Logout" />
            </Button>
          </div>
        ) : (
          <div className="navbar__menu">
            <Link to="/login">Login</Link> <span> / </span>
            <Link to="/register">Signup</Link>
          </div>
        )}
      </nav>
    </>
  );
};

export default Header;

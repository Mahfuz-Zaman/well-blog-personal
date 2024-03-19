import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {
  const loggedInUser = useSelector((state) => state.auth.loggedInUser);

  if (!loggedInUser) {
    return <Navigate to="/login" />;
  }

  return element;
};

ProtectedRoute.propTypes = {
  element: PropTypes.element.isRequired,
};
export default ProtectedRoute;

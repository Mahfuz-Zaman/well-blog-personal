import React from "react";
import "@components/NotFound/notFound.scss";

const NotFound = ({ text }) => {
  return (
    <div className="not-found">
      <p>{text}</p>
    </div>
  );
};

export default NotFound;

import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import defaultUserImage from "@assets/images/icons/defaultUserImage.svg";
import getImagePath from "../../helpers/getImagePath";
import formatDate from "./../../helpers/formatDate";
import "@components/HomeBanner/homeBanner.scss";

const HomeBanner = ({ blog }) => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const { id, title, tags, image, createdAt, creatorFullName, creatorImage } =
    blog;

  const wrapperClassName = loggedInUser
    ? "banner__auth-info-wrapper"
    : "banner__info-wrapper";

  return (
    <div className="banner">
      <Link to={`/blog/${id}`}>
        <img src={image} className="banner__image" alt="Blog Banner" />
        <div className={wrapperClassName}>
          <div className={`${wrapperClassName}-heading`}>
            <div className={`${wrapperClassName}-heading-category-badge`}>
              {tags.map((tag, index) => (
                <div key={index} className={`${wrapperClassName}-heading__tag`}>
                  {tag}
                </div>
              ))}
            </div>
            <h3 className={`${wrapperClassName}-heading-title`}>{title}</h3>
          </div>
          <div className={`${wrapperClassName}-identity`}>
            <img
              src={getImagePath(creatorImage) || defaultUserImage}
              alt="Author"
              className={`${wrapperClassName}-identity-image`}
            />
            <p className={`${wrapperClassName}-identity-name`}>
              {creatorFullName}
            </p>
            <p className={`${wrapperClassName}-identity-created-at`}>
              {formatDate(createdAt)}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

HomeBanner.propTypes = {
  blog: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    tags: PropTypes.array,
    image: PropTypes.string,
    createdAt: PropTypes.string,
    creatorFullName: PropTypes.string,
    creatorImage: PropTypes.string,
  }).isRequired,
};

export default HomeBanner;

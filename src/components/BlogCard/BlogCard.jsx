import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import defaultUserImage from "@assets/images/icons/defaultUserImage.svg";
import "@components/BlogCard/blogCard.scss";

const BlogCard = ({ blog }) => {
  const { id, title, tags, image, createdAt, creatorFullName, creatorImage } =
    blog;

  return (
    <div className="blog-card">
      <Link to={`/blog/${id}`} className="blog-card__link">
        <img src={image} className="blog-card__banner" alt="Blog Banner" />
        <div className="blog-card__category-badge">
          {tags.map((tag, index) => (
            <div key={index} className="blog-card__tag">
              {tag}
            </div>
          ))}
        </div>
        <h3 className="blog-card__title">{title}</h3>
        <div className="blog-card__author-info">
          <img
            src={creatorImage ? creatorImage : defaultUserImage}
            alt="Author"
            className="blog-card__author-image"
          />
          <p className="blog-card__author-name">{creatorFullName}</p>
          <p className="blog-card__created-at">{createdAt}</p>
        </div>
      </Link>
    </div>
  );
};

BlogCard.propTypes = {
  blog: PropTypes.shape({
    title: PropTypes.string.isRequired,
    tags: PropTypes.array.isRequired,
    image: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
};

export default BlogCard;

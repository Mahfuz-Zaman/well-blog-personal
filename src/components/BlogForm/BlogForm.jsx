import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";
import { Form, Field } from "react-final-form";
import { createBlogPost, updateBlogPost } from "@actions/blogActions";
import Button from "@components/Button/Button";
import ImageDnD from "@components/ImageDnD/ImageDnD";
import SelectBox from "@components/SelectBox/SelectBox";
import tags from "@constants/tags.json";
import "@components/BlogForm/blogForm.scss";

const BlogForm = ({ initialData, onSubmit, onSetBlogFormVisibility }) => {
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const { loggedInUser } = useSelector((state) => state.auth);

  useEffect(() => {
    if (initialData?.id) {
      setImagePreview(initialData.image);
      setSelectedTags(initialData.tags);
      setIsEditMode(true);
    }
  }, [initialData]);

  const handleSubmit = (values, form) => {
    const blog = {
      ...values,
      image: imagePreview,
      tags: selectedTags,
      userId: loggedInUser?.id,
      creatorImage: loggedInUser?.user_metadata?.profileImage,
      creatorFullName: loggedInUser?.user_metadata?.fullName,
    };

    if (isEditMode) {
      dispatch(updateBlogPost(initialData?.id, blog));
    } else {
      dispatch(createBlogPost(blog));
      onSetBlogFormVisibility(false);
    }
    form.reset();
    setImagePreview(null);
    onSubmit();
  };

  const handleDrop = (acceptedFiles) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64Image = reader.result;
      setImagePreview(base64Image);
    };
    reader.readAsDataURL(acceptedFiles[0]);
  };

  const cancelImagePreview = () => {
    setImagePreview(null);
  };

  const handleCancel = (form) => {
    form.reset();
    setImagePreview(null);
    setSelectedTags("");
    onSubmit();
  };

  const required = (value) => (value ? undefined : "Required");
  const handleChangeTags = (selectedOptions) => {
    setSelectedTags(selectedOptions?.map((option) => option.value));
  };

  return (
    <Form
      initialValues={initialData}
      onSubmit={handleSubmit}
      validate={(values) => {
        const errors = {};

        if (!values.title) {
          errors.title = "Title Required";
        }

        if (!values.body) {
          errors.body = "Body Required";
        }

        return errors;
      }}
      render={({ handleSubmit, form }) => (
        <form className="blog-form" onSubmit={handleSubmit}>
          <div className="blog-form__title-tag-wrapper">
            <div className="blog-form__title-container">
              <label className="blog-form__label">Title*</label>
              <Field
                className="blog-form__input"
                name="title"
                component="input"
                type="text"
                validate={required}
              />
            </div>
            <div className="blog-form__tag-container">
              <label className="blog-form__label">Tags*</label>
              <SelectBox
                tags={tags}
                selectedTags={selectedTags}
                handleChangeTags={handleChangeTags}
              />
            </div>
          </div>

          <div>
            <label className="blog-form__label">Banner Image*</label>
            <ImageDnD
              onDrop={handleDrop}
              imagePreview={imagePreview}
              cancelImagePreview={cancelImagePreview}
            />
          </div>
          <div>
            <label className="blog-form__label">Body*</label>
            <Field
              className="blog-form__textarea"
              name="body"
              component="textarea"
              validate={required}
            />
          </div>
          <div className="blog-form__buttons">
            <Button
              className="blog-form__buttons-submit"
              type="submit"
              onClick={handleSubmit}
            >
              {isEditMode ? "Update" : "Submit"}
            </Button>
            <Button
              className="blog-form__buttons-cancel"
              type="button"
              onClick={() => handleCancel(form)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};

BlogForm.propTypes = {
  initialData: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    image: PropTypes.string,
    tags: PropTypes.arrayOf(PropTypes.string),
  }),
  onSubmit: PropTypes.func,
};

BlogForm.defaultProps = {
  initialData: {
    title: "",
    body: "",
    image: null,
    tags: [],
  },
  onSubmit: () => {},
};
export default BlogForm;

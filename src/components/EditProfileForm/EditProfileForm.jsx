import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { updateUser } from "@actions/authActions";
import Button from "@components/Button/Button";
import ImageDnD from "@components/ImageDnD/ImageDnD";
import { Field, Form } from "react-final-form";
import "@components/EditProfileForm/editProfileForm.scss";

const EditProfileForm = ({ onSetEditProfileVisibility }) => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [loggedInUserInfo, setLoggedInUserInfo] = useState(null);

  useEffect(() => {
    if (loggedInUser.profileImage) {
      setImagePreview(loggedInUser.profileImage);
    }
    setLoggedInUserInfo(loggedInUser.user_metadata);
  }, [loggedInUser]);

  const resetForm = (form) => {
    form.reset({
      fullName: loggedInUser?.fullName || "",
      subtitle: loggedInUser?.subtitle || "",
      about: loggedInUser?.about || "",
      profileImage: loggedInUser?.profileImage || "",
    });
    setImagePreview(loggedInUser?.profileImage || null);
    setImageName("");
  };

  const onSubmit = async (values, form) => {
    dispatch(updateUser(values, image));
    resetForm(form);
    onSetEditProfileVisibility(false);
  };

  const onCancel = (form) => {
    resetForm(form);
    onSetEditProfileVisibility(false);
  };

  const handleImageDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    setImage(file);
    setImagePreview(URL.createObjectURL(file));
    setImageName(file.name);
  };

  return (
    <Form
      onSubmit={(values, form) => {
        onSubmit(values, form);
      }}
      initialValues={{
        fullName: loggedInUserInfo?.fullName || "",
        subtitle: loggedInUserInfo?.subtitle || "",
        about: loggedInUserInfo?.about || "",
      }}
      render={({ handleSubmit, form }) => (
        <form className="edit-profile-form" onSubmit={handleSubmit}>
          <div className="edit-profile-form__container">
            <div className="edit-profile-form__info-wrapper">
              <div className="edit-profile-form__field">
                <label className="edit-profile-form__label">Name</label>
                <Field
                  name="fullName"
                  component="input"
                  type="text"
                  placeholder="Name"
                  className="edit-profile-form__input"
                />
              </div>
              <div className="edit-profile-form__field">
                <label className="edit-profile-form__label">Subtitle</label>
                <Field
                  name="subtitle"
                  component="input"
                  type="text"
                  placeholder="Subtitle"
                  className="edit-profile-form__input"
                />
              </div>
              <div className="edit-profile-form__field">
                <label className="edit-profile-form__label">About</label>
                <Field
                  name="about"
                  component="textarea"
                  placeholder="About"
                  className="edit-profile-form__textarea"
                />
              </div>
            </div>
            <div className="edit-profile-form__image-wrapper">
              <div className="edit-profile-form__field">
                <label className="edit-profile-form__label">
                  Profile Image
                </label>
                <ImageDnD onDrop={handleImageDrop} />
              </div>
              <div className="edit-profile-form__image-preview">
                {imageName && (
                  <span className="edit-profile-form__image-name">
                    {imageName}
                  </span>
                )}
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="edit-profile-form__preview-image"
                  />
                )}
              </div>
            </div>
          </div>
          <div className="edit-profile-form__buttons">
            <Button
              onClick={handleSubmit}
              type="submit"
              className="edit-profile-form__submit-button"
            >
              Submit
            </Button>
            <Button
              onClick={() => onCancel(form)}
              type="button"
              className="edit-profile-form__cancel-button"
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    />
  );
};

EditProfileForm.propTypes = {
  onSetEditProfileVisibility: PropTypes.func.isRequired,
  loggedInUser: PropTypes.shape({
    fullName: PropTypes.string,
    subtitle: PropTypes.string,
    about: PropTypes.string,
    profileImage: PropTypes.string,
    userId: PropTypes.string,
  }),
};

EditProfileForm.defaultProps = {
  loggedInUser: {
    fullName: "",
    subtitle: "",
    about: "",
    profileImage: "",
    userId: "",
  },
};
export default EditProfileForm;

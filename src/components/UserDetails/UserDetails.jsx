import React from "react";
import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import defaultUserImage from "@assets/images/icons/defaultUserImage.svg";
import facebook from "@assets/images/icons/facebook.png";
import twitter from "@assets/images/icons/twitter.png";
import instagram from "@assets/images/icons/instagram.png";
import youtube from "@assets/images/icons/youtube.png";
import "@components/UserDetails/userDetails.scss";

const UserDetails = () => {
  const { loggedInUser } = useSelector((state) => state.auth);
  const { fullName, profileImage, subtitle, about } = loggedInUser;

  return (
    <section className="user-details">
      <div className="user-details__identity">
        <img
          className="user-details__identity-image"
          src={loggedInUser.profileImage ? profileImage : defaultUserImage}
          alt="Profile Picture"
        />
        <div className="user-details__info">
          <h2 className="user-details__fullname">{fullName}</h2>
          <p className="user-details__subtitle">{subtitle}</p>
        </div>
      </div>
      <p className="user-details__about">{about}</p>
      <div className="user-details__social-media">
        <img src={facebook} alt="facebook" />
        <img src={twitter} alt="twitter" />
        <img src={instagram} alt="instagram" />
        <img src={youtube} alt="youtube" />
      </div>
    </section>
  );
};

UserDetails.propTypes = {
  loggedInUser: PropTypes.shape({
    fullName: PropTypes.string,
    profileImage: PropTypes.string,
    subtitle: PropTypes.string,
    about: PropTypes.string,
  }),
};

UserDetails.defaultProps = {
  loggedInUser: {
    fullName: "Guest",
    profileImage: "",
    subtitle: "",
    about: "",
  },
};

export default UserDetails;

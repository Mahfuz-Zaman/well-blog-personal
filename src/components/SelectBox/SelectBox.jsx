import React from "react";
import PropTypes from "prop-types";
import Select from "react-select";

const customStyles = {
  control: (provided, state) => ({
    ...provided,
    borderRadius: "4px",
    border: state.isFocused ? "none" : "2px solid #e8e8ea",
    boxShadow: state.isFocused ? "0 0 0 2px #e8e8ea" : "none",
    maxHeight: "26px",
    overflowY: "hidden",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isSelected ? "#ddd" : "transparent",
    "&:hover": {
      backgroundColor: "#EAEAF3",
    },
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: "#EAEAF3",
    position: "relative",
    margin: "0 8px",
  }),

  indicatorSeparator: () => null,
  multiValueRemove: (provided) => ({
    ...provided,
    borderRadius: "50%",
    color: "white",
    height: "16px",
    width: "16px",
    cursor: "pointer",
    position: "absolute",
    bottom: "45%",
    left: "94%",
    backgroundColor: "#E30B59",
    ":hover": {
      backgroundColor: "#E30B59",
      color: "white",
    },
  }),
};

const SelectBox = ({ tags, selectedTags, handleChangeTags }) => (
  <Select
    onChange={handleChangeTags}
    options={tags}
    isMulti
    value={tags?.filter((tag) => selectedTags.includes(tag.value))}
    styles={customStyles}
  />
);

SelectBox.propTypes = {
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedTags: PropTypes.arrayOf(PropTypes.string).isRequired,
  handleChangeTags: PropTypes.func.isRequired,
};

export default SelectBox;

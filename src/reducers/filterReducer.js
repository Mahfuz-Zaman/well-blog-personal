import { FILTER_BY_TAG } from "@constants/actionTypes";

const initialState = {
  blogs: [],
  filteredTags: [],
};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case FILTER_BY_TAG:
      return {
        ...state,
        filteredTags: action.payload,
      };
    default:
      return state;
  }
};

export default filterReducer;

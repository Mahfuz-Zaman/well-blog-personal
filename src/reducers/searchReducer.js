import { SEARCH_BLOG_POSTS } from "@constants/actionTypes";

const initialState = {
  searchQuery: "",
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_BLOG_POSTS:
      return {
        ...state,
        searchQuery: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;

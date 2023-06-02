import * as actionTypes from "./actionsTypes";

const initialState = {
  newsHeadlines: [],
  filteredNews: [],
  error: null,
  success: null,
  loading: false,
};

const newsReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.ACTION_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_FAIL:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case actionTypes.SET_FETCHED_NEWS:
      return {
        ...state,
        error: null,
        newsHeadlines: action.newsHeadlines,
        filteredNews: action.news,
      };
    case actionTypes.SET_BOOKMARKS:
      return {
        ...state,
        error: null,
        bookmarks: action.bookmarks,
      };

    default:
      return state;
  }
};

export default newsReducer;

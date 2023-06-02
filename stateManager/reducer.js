import * as actionTypes from "./actionsTypes";

const initialState = {
  newsHeadlines: [],
  filteredNews: [],
  error: null,
  loading: false,
};

const newsControlReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_NEWS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case actionTypes.FETCH_NEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null,
      };
    case actionTypes.FETCH_NEWS_FAIL:
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

    default:
      return state;
  }
};

export default newsControlReducer
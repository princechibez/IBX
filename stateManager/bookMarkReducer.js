import * as actionTypes from "./actionsTypes";

const initialState = {
  bookmarks: [],
  error: null,
  success: null,
  loading: false,
};

const bookmarkReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.SET_BOOKMARKS:
      return {
        ...state,
        error: null,
        bookmarks: action.bookmarks,
      };

    case actionTypes.FETCH_BOOKMARKS_START:
      return {
        ...state,
        loading: true,
        error: null,
      };

    case actionTypes.REMOVE_FROM_BOOKMARKS:
      return {
        ...state,
        error: null,
        bookmarks: action.newBookmarks,
      };

    default:
      return state;
  }
};

export default bookmarkReducer;

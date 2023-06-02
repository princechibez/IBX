import {
  ACTION_START,
  FETCH_FAIL,
  FETCH_SUCCESS,
  SET_FETCHED_NEWS,
  SET_BOOKMARKS,
  REMOVE_FROM_BOOKMARKS,
  FETCH_BOOKMARKS_START,
} from "./actionsTypes";
import axios from "../utilities/axios.config";
import compareObj from "lodash";

const onActionStart = () => {
  return {
    type: ACTION_START,
  };
};

const fetchBookmarkStart = () => {
  return {
    type: FETCH_BOOKMARKS_START,
  };
};

const successHandler = () => {
  return {
    type: FETCH_SUCCESS,
  };
};

const errorHandler = (err) => {
  return {
    type: FETCH_FAIL,
    error: err,
  };
};

const setFetchedNews = (news) => {
  const headLines = news.splice(0, 10);
  const otherNews = news.splice(11);
  return {
    type: SET_FETCHED_NEWS,
    newsHeadlines: headLines,
    news: otherNews,
  };
};

const setBookmarks = (bookmarks) => {
  return {
    type: SET_BOOKMARKS,
    bookmarks,
  };
};

const removeFromBookmarks = (newBookmarks) => {
  return {
    type: REMOVE_FROM_BOOKMARKS,
    newBookmarks,
  };
};

export const fetchSortedNews = (query) => {
  return (dispatch) => {
    dispatch(onActionStart());
    axios(`/everything?q=${query}`)
      .then((news) => {
        dispatch(successHandler());
        dispatch(setFetchedNews(news.data.articles));
      })
      .catch((err) => {
        dispatch(errorHandler(err));
      });
  };
};

export const addToBookmarks = (news) => {
  return async (dispatch, getState) => {
    dispatch(onActionStart());
    let newBookmarks;

    // get bookmarks
    const { bookmarks } = getState()["bookmark"];

    /**
     * check there's no previous bookmark and create a new collection of bookmarks
     */
    if (bookmarks.length === 0) {
      newBookmarks = [news];
      dispatch(setBookmarks(newBookmarks));
      dispatch(successHandler());
      return;
    }

    /**
     * Add news to the previous bookmarks
     */
    newBookmarks = [...bookmarks, news];
    dispatch(setBookmarks(newBookmarks));
    dispatch(successHandler());
  };
};

export const deleteFromBookmark = (news) => {
  return async (dispatch, getState) => {
    dispatch(onActionStart());
    let newBookmarks;

    // fetch bookmarks
    const { bookmarks } = getState()["bookmark"];

    if (bookmarks) {
      // remove this news to the existing bookmarks and save back again
      newBookmarks = bookmarks.filter((bookmark) => compareObj(news, bookmark));

      /**
       * set the new filtered bookmarks back to the store
       */
      dispatch(removeFromBookmarks(newBookmarks));
      dispatch(successHandler());
      return;
    }
  };
};

export const fetchBookmarks = () => {
  return async (dispatch, getState) => {
    // fetch all existing bookmarks
    dispatch(fetchBookmarkStart());

    // get all bookmarks
    const { bookmarks } = getState()["bookmark"];

    // check if bookmarks isn't set
    if (bookmarks.length === 0) {
      dispatch(successHandler());
      return dispatch(setBookmarks([]));
    }

    // get bookmarks if it exists
    dispatch(setBookmarks(bookmarks));
  };
};

import {
  FETCH_NEWS_START,
  FETCH_NEWS_FAIL,
  FETCH_NEWS_SUCCESS,
  SET_FETCHED_NEWS,
} from "./actionsTypes";
import axios from "../utilities/axios.config";

const fetchNewsStart = () => {
  return {
    type: FETCH_NEWS_START,
  };
};

const fetchNewsSuccess = () => {
  return {
    type: FETCH_NEWS_SUCCESS,
  };
};

const fetchNewsFail = (err) => {
  return {
    type: FETCH_NEWS_FAIL,
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

export const fetchSortedNews = (query) => {
  return (dispatch) => {
    dispatch(fetchNewsStart());
    axios(`/everything?q=${query}`)
      .then((news) => {
        dispatch(fetchNewsSuccess());
        dispatch(setFetchedNews(news.data.articles));
      })
      .catch((err) => {
        dispatch(fetchNewsFail(err));
      });
  };
};

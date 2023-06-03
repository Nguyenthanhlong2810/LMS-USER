import { NewsAPI } from 'apis/News/NewsAPI';
import { useQuery } from 'react-query';

export const MOCK_NEWS_DETAIL = {
  title: 'To identify myself, I want to see the world!',
  content: '<div>test</div>',
  video: 'https://www.youtube.com/embed/7PxxZWrlRTc',
  createdDate: '2022-12-12',
  contentType: 'VIDEO'
};

const NEWS_DETAIL_CACHE_KEYS = {
  get_news_detail: 'get_news_detail'
};
export const useGetNewsDetail = (id = '') => {
  return useQuery([NEWS_DETAIL_CACHE_KEYS.get_news_detail, id], () => NewsAPI.getNewsDetail(id));
};

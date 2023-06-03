export const RESPONSE_STATUS = {
  SUCESS: 200,
  NOT_FOUND: 404,
  INTERVAL_SERVER: 500,
  FORBIDDEN: 403,
  UNAUTHORIZED: 401
};
export const DEFAULT_PAGESIZE = 25;
export const LOCAL_STORE = {
  TOKEN: 'LMS_TOKEN',
  LANGUAGE: 'LANGUAGE'
};

export const ROUTE_PATH = {
  HOME: '/',
  PAGE_403: '/403',
  ADMIN: '/admin',
  FAQ: '/faq',
  LOGIN: '/login',
  ABOUT: '/about',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  ACCOUNT_INTRO: '/account-introduction',
  TERMS_OF_USE: '/terms-of-use',
  MY_PROFILE: '/my-profile',
  NEWS_DETAIL: '/news-detail',
  NEWS_LIST: '/news/news-list',
  HOT_NEWS: '/news',
  INTERNAL_PROGRAMS: '/internal-programs',
  COURSE_INFORMATION: '/courses/information',
  COURSE_INFO: '/my-course/information',
  LEARNING_HISTORY: '/my-profile/learning-history',
  COURSE_LIST: '/my-course',
  COURSE_SEARCH: '/search',
  MY_CERTIFICATE: '/my-certificate',
  CERTIFICATE_DETAIL: '/my-certificate/detail',
  COURSES: '/courses',
  COURSE_DETAIL: '/course-detail'
};

export const ROLES = {
  Admin: 'ROLE_ADMIN',
  User: 'ROLE_USER',
  Client: 'ROLE_CLIENT'
};

export const LANGUAGE = {
  VI: 'vi',
  EN: 'en'
};
export const DUE_SELECT = [
  { value: 'before', label: 'Trước ngày' },
  { value: 'after', label: 'Sau ngày' },
  { value: 'range', label: 'Trong khoảng' },
  { value: 'indefinite', label: 'Không thời hạn' }
];
export const COURSE_TYPE = [
  { value: 'COMPULSORY', label: 'Bắt buộc' },
  { value: 'VOLUNTARY', label: 'Tự chọn' }
];
export const PROGRESS_STATUS_ENUM = {
  UNCOMPLETED: 'UNCOMPLETED',
  COMPLETED: 'COMPLETED',
  OVER_DUE: 'OVER_DUE'
};
export const PROGRESS_STATUS = [
  { value: PROGRESS_STATUS_ENUM.UNCOMPLETED, label: 'Chưa hoàn thành' },
  { value: PROGRESS_STATUS_ENUM.COMPLETED, label: 'Đã hoàn thành' },
  { value: PROGRESS_STATUS_ENUM.OVER_DUE, label: 'Quá hạn' }
];
export const PAGESIZE_OPTIONS = [10, 25, 50, 100];
export const DEFAULT_PAGE_PARAMS = { pageNo: 1, pageSize: 9, status: true };
export const FORMAT = ['PDF', 'jpeg', 'png', 'jpg'];

export const NO_CORRESPONDING_DATA = 'Không tồn tại dữ liệu tương ứng';
export const NO_DATA = 'Không có dữ liệu';
export const NO_EMPTY_DATA = 'Không được để trống';

export const IMAGE_ACCEPT = ['image/jpg', 'image/jpeg', 'image/png'];
export const VIDEO_ACCEPT = ['video/mp4', 'video/x-m4v', 'video/*'];
// export const VIDEO_ACCEPT = 'video/mp4,video/x-m4v,video/*';
export const NOTE_MAX_LENGTH = 1000;

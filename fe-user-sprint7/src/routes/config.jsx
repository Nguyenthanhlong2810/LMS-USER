import { ROLES, ROUTE_PATH } from 'consts/system.const';

import React from 'react';
import { Navigate } from 'react-router-dom';

const Page403 = React.lazy(() => import('../pages/Errors/Page403'));
const AboutPage = React.lazy(() => import('../pages/About/About'));
const LoginPage = React.lazy(() => import('../pages/Login/Login'));
const FaqPage = React.lazy(() => import('../pages/FAQ/Faq'));
const TermsOfUsePage = React.lazy(() => import('../pages/TermsOfUse/TermsOfUse'));
const HomePage = React.lazy(() => import('../pages/Home/Home'));
const AccountIntroPage = React.lazy(() => import('../pages/AccountIntro/AccountIntro'));
const ProfilePage = React.lazy(() => import('../pages/Profile/Profile'));
const NewsDetailPage = React.lazy(() => import('../pages/NewsDetail/NewsDetail'));
const NewsListPage = React.lazy(() => import('pages/NewsList/NewsList'));
const HotNewsPage = React.lazy(() => import('pages/HotNews/HotNews'));
const InternalProgramsPage = React.lazy(() => import('pages/InternalPrograms'));
const CourseInformationPage = React.lazy(() => import('pages/CourseInformation'));
const LearningHistoryPage = React.lazy(() => import('pages/LearningHistory'));
const CourseListPage = React.lazy(() => import('pages/CourseList'));
const MyCertificatePage = React.lazy(() => import('pages/MyCertificate/MyCertificate'));
const CertificateDetailPage = React.lazy(() => import('pages/CertificateDetail/CertificateDetail'));
const CourseSearchPage = React.lazy(() => import('pages/CourseSearch'));
const CourseDetailPage = React.lazy(() => import('pages/CourseDetail'));

const routesList = [
  { component: HomePage, path: ROUTE_PATH.HOME, isProtected: false },
  { component: Page403, path: ROUTE_PATH.PAGE_403, isProtected: false },
  { component: AboutPage, path: ROUTE_PATH.ABOUT, isProtected: false },
  { component: LoginPage, path: ROUTE_PATH.LOGIN, isProtected: false, isAuth: true },
  { component: FaqPage, path: ROUTE_PATH.FAQ, isProtected: false },
  { component: TermsOfUsePage, path: ROUTE_PATH.TERMS_OF_USE, isProtected: false },
  { component: AccountIntroPage, path: ROUTE_PATH.ACCOUNT_INTRO, isProtected: false },
  { component: ProfilePage, path: ROUTE_PATH.MY_PROFILE, isProtected: false },
  { component: NewsDetailPage, path: `${ROUTE_PATH.NEWS_DETAIL}/:id`, isProtected: false },
  { component: NewsListPage, path: ROUTE_PATH.NEWS_LIST, isProtected: false },
  { component: HotNewsPage, path: ROUTE_PATH.HOT_NEWS, isProtected: false },
  { component: InternalProgramsPage, path: ROUTE_PATH.INTERNAL_PROGRAMS, isProtected: false },
  {
    component: CourseInformationPage,
    path: `${ROUTE_PATH.COURSE_INFORMATION}/:id`,
    isProtected: false
  },

  { component: LearningHistoryPage, path: ROUTE_PATH.LEARNING_HISTORY, isProtected: false },
  { component: CourseListPage, path: ROUTE_PATH.COURSE_LIST, isProtected: false },
  { component: MyCertificatePage, path: ROUTE_PATH.MY_CERTIFICATE, isProtected: false },
  {
    component: CertificateDetailPage,
    path: `${ROUTE_PATH.CERTIFICATE_DETAIL}/:id`,
    isProtected: false
  },
  {
    component: () => <Navigate to={ROUTE_PATH.COURSE_SEARCH} replace />,
    path: ROUTE_PATH.COURSES,
    isProtected: false
  },
  { component: CourseSearchPage, path: ROUTE_PATH.COURSE_SEARCH, isProtected: false },
  { component: CourseDetailPage, path: `${ROUTE_PATH.COURSE_DETAIL}/:id`, isProtected: false }
];

const protectedRoutes = [
  { component: HomePage, path: ROUTE_PATH.HOME, isProtected: true, allowedRoles: [ROLES.User] },
  { component: HomePage, path: ROUTE_PATH.ADMIN, isProtected: true, allowedRoles: [ROLES.Admin] }
];
export default [...routesList, protectedRoutes];

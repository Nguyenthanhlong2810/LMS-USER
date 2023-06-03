import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { Box, Fab, Fade, Button, Grid, Toolbar, useScrollTrigger, Typography } from '@mui/material';
import Title from 'components/Title/Title';
import { useLoading } from 'hooks/LoadingProvider';
import { CommonLayout } from 'layouts/common';
import { BoxContainerStyled } from 'pages/CourseList/style';
import { PropTypes } from 'prop-types';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/configureStore';
import {
  setFirstPreviewUrl,
  setLessonData,
  setLessonStructure,
  setSelectLecture,
  setTheaterView
} from 'store/reducers/courseDetailSlice';
import { fetchCourseDetail } from 'store/thunk/courseDetailThunk';
import CourseDetailContent from './components/CourseDetailContent';
import LectureView from './components/LectureView/LectureView';
import VideoPreview from './components/LectureView/VideoPreview';
import CourseProgess from './components/LessonList/components/CourseProgress';
import LessonList from './components/LessonList/LessonList';
import { formatResponseData } from './utils';
import { useTranslation } from 'react-i18next';

const CourseDetail = (props) => {
  const [courseProgress, setCourseProgress] = useState({});
  const { hideLoading, showLoading } = useLoading();
  const { t } = useTranslation();
  const { id } = useParams();
  const dispatch = useDispatch();
  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);
  const lessonData = useSelector((state) => state.courseDetail.lessonData);
  const isTheaterView = useSelector((state) => state.courseDetail.isTheaterView);
  const firstPreviewUrl = useSelector((state) => state.courseDetail.firstPreviewUrl);

  const inputRef = useRef();

  const focusInput = () => {
    inputRef?.current?.focus();
  };

  const [time, setTime] = useState();
  const [focusNote, setFocusNote] = useState(false);
  const [tabCourseDetail, setTabCourseDetail] = useState(0);

  useEffect(() => {
    getMyCourseDetail();
    // getProcessUserCourses();
    assignCourse();
    return () => {
      dispatch(setSelectLecture({}));
      dispatch(setFirstPreviewUrl(''));
      dispatch(setLessonStructure([]));
      dispatch(setLessonData({}));
      sessionStorage.removeItem('tempNote');
    };
  }, []);

  // useEffect(() => {
  //   //note
  //   if (tabCourseDetail === 3) {
  //     // focusInput();
  //   }
  // }, [tabCourseDetail]);

  const getMyCourseDetail = async () => {
    try {
      const params = {
        courseId: id
      };
      showLoading();
      const { payload } = await dispatch(fetchCourseDetail(params));
      if (payload) {
        const formatedData = formatResponseData(payload?.lessonStructures);
        if (formatedData) {
          dispatch(setLessonStructure(formatedData));
          const typePreview = payload?.pathPreview?.split('.')?.at(-1);
          if (typePreview !== 'mp4') {
            const firstSection = { ...formatedData[0]?.children[0], fatherIndex: 0, childIndex: 0 };
            dispatch(setSelectLecture(firstSection));
          } else {
            dispatch(setFirstPreviewUrl(payload?.pathPreview));
          }
        } else {
          dispatch(setLessonStructure([]));
        }
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    } finally {
      getProcessUserCourses();
      hideLoading();
    }
  };

  const getProcessUserCourses = async () => {
    try {
      // showLoading();
      const params = { courseId: Number(id) };
      const res = await CourseAPI.getProcessCoursesUser(params);
      const responseData = res?.data?.data;
      // if (responseData?.totalCompletedLessonOfCourse === responseData.totalLessonOfCourse) {
      //   const resonse = await CourseAPI.setCompletedCourse(params);
      // }
      setCourseProgress(responseData);
    } catch (error) {
      console.log('ErrorProvider  errors  getting user courses progress');
    } finally {
      // hideLoading();
    }
  };

  const assignCourse = async () => {
    try {
      await CourseAPI.assignCourse(id);
    } catch (error) {}
  };

  const handleNoteAtTime = (time) => {
    setTime(time);
  };
  const handleExpand = () => {
    dispatch(setTheaterView());
  };
  return (
    <CommonLayout>
      <Toolbar id="back-to-top-anchor" sx={{ minHeight: '0 !important' }} />
      <BoxContainerStyled sx={{ mt: '-2rem' }}>
        <Grid container columnSpacing={3}>
          <Grid item xs={9}>
            <Title>{lessonData?.courseName}</Title>
          </Grid>
          <Grid item xs={3}>
            <CourseProgess courseProgress={courseProgress} />
          </Grid>
          <Grid item xs={isTheaterView ? 12 : 9}>
            <Box sx={{ p: '3rem', background: '#fff', borderRadius: '7px' }}>
              {firstPreviewUrl && <VideoPreview path={firstPreviewUrl} />}
              {selectedLecture?.type === 'VIDEO' && !firstPreviewUrl && (
                <>
                  <LectureView
                    handleNoteAtTime={handleNoteAtTime}
                    focusInput={focusInput}
                    selectedLecture={selectedLecture}
                    focusNote={focusNote}
                    getProcessUserCourses={getProcessUserCourses}
                    setTabCourseDetail={setTabCourseDetail}
                    setFocusNote={setFocusNote}
                  />
                  <Box sx={{ paddingY: 1 }}>
                    <Typography textTransform="uppercase" fontWeight="bold">
                      {selectedLecture?.nameContent?.split('.')?.at(0)}
                    </Typography>
                  </Box>
                </>
              )}
              {(selectedLecture?.type === 'VIDEO' || firstPreviewUrl) && (
                <CourseDetailContent
                  handleNoteAtTime={handleNoteAtTime}
                  inputRef={inputRef}
                  time={time}
                  setTabCourseDetail={setTabCourseDetail}
                  tabCourseDetail={tabCourseDetail}
                  setFocusNote={setFocusNote}
                />
              )}
            </Box>
          </Grid>
          {!isTheaterView && (
            <Grid item xs={3}>
              <LessonList />
            </Grid>
          )}
        </Grid>
      </BoxContainerStyled>
      {isTheaterView && <ExpandButton handleExpand={handleExpand} />}
      <ScrollTop {...props}>
        <Fab size="small" aria-label="scroll back to top">
          <KeyboardArrowUpIcon />
        </Fab>
      </ScrollTop>
    </CommonLayout>
  );
};

export default CourseDetail;

function ScrollTop(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
    disableHysteresis: true,
    threshold: 100
  });
  const handleClick = (event) => {
    const anchor = (event.target.ownerDocument || document).querySelector('#back-to-top-anchor');

    if (anchor) {
      anchor.scrollIntoView({
        block: 'center',
        behavior: 'smooth'
      });
    }
  };

  return (
    <Fade in={trigger}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
      >
        {children}
      </Box>
    </Fade>
  );
}

ScrollTop.PropTypes = {
  children: PropTypes.element.isRequired,
  window: PropTypes.func
};

const ExpandButton = ({ handleExpand }) => {
  return (
    <Button
      variant="contained"
      startIcon={<NavigateBeforeIcon />}
      sx={{ position: 'absolute', top: '18rem', right: '0', minWidth: '2rem', padding: '0.5rem' }}
      onClick={handleExpand}
    />
  );
};

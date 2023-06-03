import { TabMenu } from 'components/TabMenu/TabMenu';
import CourseDetailCertificate from './components/CourseDetailCertificate';
import CourseDetailNote from './components/CourseDetailNote';
import CourseDetailOverview from './components/CourseDetailOverview';
import CourseDetailRating from './components/CourseDetailRating';
import { useSelector } from 'react-redux';

const CourseDetailContent = ({
  handleNoteAtTime,
  inputRef,
  time,
  setFocusNote,
  tabCourseDetail,
  setTabCourseDetail
}) => {
  const lessonData = useSelector((state) => state.courseDetail.lessonData);

  const tabsMenu = [
    {
      label: 'Tổng quan',
      component: <CourseDetailOverview overview={lessonData?.summary} />
    },
    {
      label: 'Xếp hạng và nhận xét',
      component: <CourseDetailRating />
    },
    {
      label: 'Hỏi đáp',
      component: <CourseDetailRating />
    },
    {
      label: 'Ghi chú',
      component: (
        <CourseDetailNote
          handleNoteAtTime={handleNoteAtTime}
          inputRef={inputRef}
          time={time}
          setFocusNote={setFocusNote}
        />
      )
    },
    {
      label: 'Chứng nhận/Chứng chỉ',
      component: <CourseDetailCertificate />
    }
  ];
  return (
    <TabMenu tabsMenu={tabsMenu} setTabValue={setTabCourseDetail} tabValue={tabCourseDetail} />
  );
};

export default CourseDetailContent;

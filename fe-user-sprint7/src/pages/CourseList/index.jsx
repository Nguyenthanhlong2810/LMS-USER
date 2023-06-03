import { CommonLayout } from 'layouts/common';
import CourseListTable from './components/CourseListTable';
import UserHeader from './components/UserHeader';
import { BoxContainerStyled } from './style';

const CourseList = () => {
  return (
    <CommonLayout>
      <BoxContainerStyled>
        <UserHeader />
        <CourseListTable />
      </BoxContainerStyled>
    </CommonLayout>
  );
};

export default CourseList;

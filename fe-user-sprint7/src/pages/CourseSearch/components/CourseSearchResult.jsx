import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Box, Divider, Grid, Pagination } from '@mui/material';
import TablePagination from '@mui/material/TablePagination';
import { ROUTE_PATH } from 'consts';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  CourseResultDescriptionStyled,
  CourseResultImageStyled,
  CourseResultItemStyled,
  CourseResultLectureStyled,
  CourseResultTitleStyled
} from '../style';

const CourseSearchResult = ({
  courseFilter,
  page,
  handlePageChange,
  totalRecords,
  pageSize,
  handlePageSizeChange
}) => {
  const [courses, setCourses] = useState([]);

  const { t } = useTranslation();
  useEffect(() => {
    const data = courseFilter?.map((item) => {
      const typePreview = item?.pathPreview?.split('.')?.at(-1);
      if (typePreview === 'mp4') {
        return { ...item, typePreview: 'VIDEO' };
      }
      return { ...item, typePreview: 'IMAGE' };
    });
    setCourses(data);
  }, [courseFilter]);
  // const count = Math.ceil(totalRecords / pageSize);
  return (
    <>
      <Box
        sx={{
          bgcolor: '#fff',
          borderRadius: '0.625rem',
          p: '1.563rem',
          maxHeight: '63rem',
          overflow: 'auto'
        }}
      >
        {courses?.length ? (
          courses.map((item, index) => (
            <div key={index}>
              <CourseResultItemStyled>
                <Link
                  to={`${ROUTE_PATH.COURSE_INFORMATION}/${item?.id}`}
                  style={{ display: 'block', position: 'relative' }}
                >
                  <CourseResultImageStyled>
                    {item?.typePreview === 'VIDEO' && (
                      <video autoPlay muted playsInline width={'100%'} height={'100%'}>
                        <source src={item?.pathPreview} type="video/mp4" />
                      </video>
                    )}
                    {item?.typePreview === 'IMAGE' && (
                      <img src={item?.pathPreview} alt="course-image" />
                    )}
                  </CourseResultImageStyled>
                </Link>
                <div>
                  <Link
                    to={`${ROUTE_PATH.COURSE_INFORMATION}/${item?.id}`}
                    style={{
                      textDecoration: 'none',
                      display: 'block',
                      width: 'auto'
                    }}
                  >
                    <CourseResultTitleStyled>{item?.name}</CourseResultTitleStyled>
                  </Link>
                  <CourseResultDescriptionStyled>{item?.summary}</CourseResultDescriptionStyled>
                  <CourseResultLectureStyled>
                    <FiberManualRecordIcon sx={{ fontSize: '5px', mr: '0.25rem' }} />
                    {item?.totalLessons} {t('course:lectures')}
                    <FiberManualRecordIcon sx={{ fontSize: '5px', ml: '0.25rem' }} />
                  </CourseResultLectureStyled>
                </div>
              </CourseResultItemStyled>
              <Divider />
            </div>
          ))
        ) : (
          <div style={{ textAlign: 'center' }}>Không có kết quả tìm kiếm</div>
        )}
      </Box>
      {courses?.length ? (
        <Box sx={{ display: 'flex', justifyContent: 'right', mt: '1.875rem' }}>
          {/* <Pagination
            count={count}
            page={page}
            onChange={handlePageChange}
            variant="outlined"
            shape="rounded"
          /> */}

          <TablePagination
            component="div"
            count={totalRecords}
            page={page}
            onPageChange={handlePageChange}
            rowsPerPage={pageSize}
            rowsPerPageOptions={[5, 10, 25, 50, 100]}
            onRowsPerPageChange={handlePageSizeChange}
            labelRowsPerPage={'Số kết quả mỗi trang'}
          />
        </Box>
      ) : null}
    </>
  );
};

export default CourseSearchResult;

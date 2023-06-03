import React from 'react';
import { styled, Button } from '@mui/material';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { FlexCenter, FlexCol } from 'components/Layout/Flex';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'consts';
const CousreItem = ({ course }) => {
  const typePreview = course?.pathPreview?.split('.')?.at(-1);

  return (
    <CourseItemStyled>
      <CourseImageStyled>
        {typePreview === 'mp4' ? (
          <video alt="preview" width={'100%'} src={course?.pathPreview} />
        ) : (
          <img src={course?.pathPreview} alt={course?.name} />
        )}
      </CourseImageStyled>
      <CourseContentStyled>
        <div>
          <Ellipsis
            line={1}
            style={{
              fontWeight: '700',
              fontSize: '16px',
              lineHeight: '150%',
              textAlign: 'center',
              color: '#0A033C',
              marginTop: '1.25rem',
              marginBottom: '0.75rem'
            }}
          >
            {course?.name}
          </Ellipsis>
          <Ellipsis line={1} style={{ textAlign: 'center', fontWeight: '300', fontSize: '14px' }}>
            {course?.categoryTrainingName}
          </Ellipsis>
        </div>
        <CourseActionStyled>
          {/* {!course?.assigned && (
            <Link to={`${ROUTE_PATH.COURSE_INFORMATION}/${course?.id}`}>
              <Button
                variant="outlined"
                color="success"
                sx={{
                  textDecoration: 'none',
                  ':hover': {
                    color: '#fff',
                    backgroundColor: '#55C763'
                  }
                }}
                className="startBtn"
              >
                Đăng ký
              </Button>
            </Link>
          )} */}

          <Link to={`${ROUTE_PATH.COURSE_INFORMATION}/${course?.id}`}>
            <Button
              variant="outlined"
              color="success"
              sx={{
                textDecoration: course?.assigned
                  ? 'inherit'
                  : course?.requireApproval
                  ? 'none'
                  : 'inherit',
                ':hover': {
                  color: '#fff',
                  backgroundColor: '#55C763'
                }
              }}
              className="startBtn"
            >
              {course?.assigned
                ? 'Bắt đầu học'
                : course?.requireApproval
                ? 'Đăng ký'
                : 'Bắt đầu học'}
            </Button>
          </Link>
        </CourseActionStyled>
      </CourseContentStyled>
    </CourseItemStyled>
  );
};
export default CousreItem;
export const CourseItemStyled = styled(FlexCol)({
  display: 'inline-flex',
  background: '#fff',
  padding: '1.5rem',
  borderRadius: '5px',
  '&:hover': {
    cursor: 'pointer',
    boxShadow:
      '0px 0px 0px rgba(0, 0, 0, 0.4), 0px 4px 28px rgba(0, 0, 0, 0.08), 0px 10px 40px rgba(0, 0, 0, 0.01)'
  }
});

export const CourseImageStyled = styled('div')({
  height: '188px',
  flexShrink: 0,
  position: 'relative',
  img: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
});
export const CourseContentStyled = styled(FlexCol)({
  flex: 1,
  justifyContent: 'space-between'
});
export const CourseActionStyled = styled(FlexCol)({
  justifyContent: 'center',
  a: {
    textDecoration: 'none',
    margin: '1.5rem auto'
  }
});
export const CourseProcessStyled = styled(FlexCenter)({
  fontWeight: '500',
  fontSize: '14px',
  lineHeight: '190%',
  color: ' #FFFFFF',
  background: '#55C763',
  borderRadius: '4px'
});

import EastIcon from '@mui/icons-material/East';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import { Box, Button, Divider, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Ellipsis from 'components/Ellipsis/Ellipsis';
import { TitleLinkStyle } from 'components/TitleLink/TitleLink';
import { ROUTE_PATH } from 'consts/system.const';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import RecommendCourseItem from './RecommendCourseItem';
const RecommendCourse = ({ recommendCourseList }) => {
  let navigate = useNavigate();
  let firstCourses = recommendCourseList[0];
  let secondCourses = recommendCourseList.length > 0 ? recommendCourseList.slice(1) : [];

  const { t } = useTranslation();

  const handleSeeAllCourses = () => {
    navigate('/search');
  };

  const ResponsiveNewsHome = styled(Box)`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-gap: 1rem;
    margin-top: 1rem;
    padding: 1rem 0;
    @media (max-width: 1200px) {
      grid-template-columns: 1fr;
    }
  `;

  const ResponsiveRightNews = styled(Box)`
    margin-left: 1rem;
    @media (max-width: 1200px) {
      margin-left: 0;
    }
  `;

  const checkTypePreview = (data) => {
    return data?.pathPreview?.split('.')?.at(-1);
  };

  return (
    <>
      <Box sx={{ width: '95%', margin: 'auto', paddingBottom: '6.25rem' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'end',
            mb: '2.4375rem'
          }}
        >
          <Typography fontWeight={700} fontSize={29} pt="34px">
            {t`course:recommend-courses`}
          </Typography>
          <Button variant="contained" size="large" onClick={handleSeeAllCourses}>
            <Typography fontSize={16}>{t`news:see-all`}</Typography>
            <EastIcon sx={{ ml: '10px', fontSize: '18px' }} />
          </Button>
        </Box>

        <Divider />

        <ResponsiveNewsHome>
          <Box>
            <Link
              to={`${ROUTE_PATH.COURSE_INFORMATION}/${firstCourses?.id || ''}`}
              style={{ display: 'block', position: 'relative' }}
            >
              {/* <img
                src={firstCourses?.pathPreview || firstCourses?.attachmentLink}
                alt={firstCourses?.name}
                style={{
                  width: '100%',
                  borderRadius: '10px',
                  aspectRatio: '1.3',
                  objectFit: 'cover'
                }}
              /> */}
              {checkTypePreview(firstCourses) === 'mp4' ? (
                <video alt={firstCourses?.name} width={'100%'} src={firstCourses?.pathPreview} />
              ) : (
                <img
                  src={firstCourses?.pathPreview}
                  alt={firstCourses?.name}
                  style={{
                    width: '100%',
                    borderRadius: '10px',
                    aspectRatio: '1.3',
                    objectFit: 'cover'
                  }}
                />
              )}

              {firstCourses?.contentType === 'VIDEO' && (
                <PlayArrowRoundedIcon
                  sx={{
                    color: '#fff',
                    opacity: '0.9',
                    position: 'absolute',
                    height: '60px',
                    width: '60px',
                    top: '50%',
                    left: '50%',
                    backgroundSize: '60px 60px',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center'
                  }}
                />
              )}
            </Link>
            <Box sx={{ mt: '48px' }}>
              <TitleLinkStyle to={`${ROUTE_PATH.COURSE_INFORMATION}/${firstCourses?.id || ''}`}>
                <Ellipsis line={2}>{firstCourses?.name || ''}</Ellipsis>
              </TitleLinkStyle>
              <Ellipsis style={{ fontSize: '18px', marginTop: '10px' }}>
                {firstCourses && (
                  <div dangerouslySetInnerHTML={{ __html: firstCourses?.detail || '' }} />
                )}
              </Ellipsis>
            </Box>
          </Box>
          <Box>
            <ResponsiveRightNews>
              <Box sx={{ display: 'grid' }}>
                {secondCourses &&
                  secondCourses.map((item) => <RecommendCourseItem key={item.id} item={item} />)}
              </Box>
            </ResponsiveRightNews>
          </Box>
        </ResponsiveNewsHome>
      </Box>
    </>
  );
};

export default RecommendCourse;

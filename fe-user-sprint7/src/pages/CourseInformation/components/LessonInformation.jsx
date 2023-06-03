import React from 'react';
import { Box, Button, Typography, styled } from '@mui/material';
import TheatersOutlinedIcon from '@mui/icons-material/TheatersOutlined';
import SystemUpdateAltOutlinedIcon from '@mui/icons-material/SystemUpdateAltOutlined';
import WorkspacePremiumOutlinedIcon from '@mui/icons-material/WorkspacePremiumOutlined';
import { useNavigate } from 'react-router-dom';
import { PROGRESS_STATUS_ENUM } from 'consts';

const LessonInformation = ({ courseOverallData, id }) => {
  const navigate = useNavigate();
  const isExpired = courseOverallData?.statusCourse === PROGRESS_STATUS_ENUM.OVER_DUE;
  const lessonDuration = courseOverallData?.totalDuration / 3600;
  const preview = courseOverallData?.videoUrl;
  const typePreview = preview?.split('.')?.at(-1);
  const checkCertification = () => {
    if (courseOverallData?.assigned || !courseOverallData?.requireApproval)
      navigate(`/course-detail/${id}`);
  };
  return (
    <Box sx={{ maxWidth: '420px', background: '#fff', borderRadius: '7px' }}>
      <Box sx={{ textAlign: 'center', width: '100%' }}>
        {typePreview === 'mp4' ? (
          <video alt="preview" width={'100%'} autoPlay muted playsInline>
            <source src={preview} type="video/mp4" />
          </video>
        ) : (
          <img alt="preview" src={preview} width={'100%'} />
        )}
      </Box>
      <Box sx={{ p: '1.5rem' }}>
        <Box sx={{ textAlign: 'center', mb: '1.875rem' }}>
          <Button
            sx={{ width: '100%' }}
            disabled={isExpired}
            variant="contained"
            onClick={checkCertification}
          >
            {courseOverallData?.assigned
              ? 'Bắt đầu học'
              : courseOverallData?.requireApproval
              ? 'Đăng ký'
              : 'Bắt đầu học'}
          </Button>
        </Box>

        <Typography sx={{ fontWeight: '700', fontSize: '22px', lineHeight: '140%' }}>
          Khóa học bao gồm:
        </Typography>
        <StyledText>
          <TheatersOutlinedIcon sx={{ marginRight: '14px' }} />
          {lessonDuration.toFixed(2)} giờ học
        </StyledText>
        <StyledText>
          <SystemUpdateAltOutlinedIcon sx={{ marginRight: '14px' }} />
          {courseOverallData?.downloadableCount} tài liệu cho phép tải về
        </StyledText>
        <StyledText>
          <WorkspacePremiumOutlinedIcon sx={{ marginRight: '14px' }} />
          {courseOverallData?.isCertificated ? 'Có cấp chứng chỉ' : 'Không cấp chứng chỉ'}
        </StyledText>
      </Box>
    </Box>
  );
};
export default LessonInformation;
export const StyledText = styled(Typography)({
  fontWeight: '500',
  lineHeight: '140%',
  marginTop: '30px',
  display: 'flex',
  alignItems: 'center'
});

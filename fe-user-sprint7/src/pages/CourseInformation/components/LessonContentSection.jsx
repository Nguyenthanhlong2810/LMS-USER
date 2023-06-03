import React, { useState } from 'react';
import { Card, Typography, Collapse, CardContent, Box } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import NoteOutlinedIcon from '@mui/icons-material/NoteOutlined';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import { timeConvert } from 'utils';
import LessonSection from './LessonSection';
import Lecture from './Lecture';
const LessonContentSection = ({ section, defaultExpand = false }) => {
  const [expanded, setExpanded] = useState(defaultExpand);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Card>
      <CardContent
        sx={{
          padding: '8px 16px !important',
          cursor: 'pointer',
          border: '1px solid #E9E9E9',
          backgroundColor: '#E2EAFD'
        }}
        onClick={handleExpandClick}
      >
        <LessonSection section={section} expanded={expanded} />
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        {section?.children?.map((item, index) => {
          return (
            <CardContent
              key={index}
              sx={{ padding: '8px 16px !important', border: '1px solid #E9E9E9' }}
            >
              <Lecture section={item} expanded={expanded} />
            </CardContent>
          );
        })}
      </Collapse>
    </Card>
  );
};
export default LessonContentSection;

export const StyledItem = ({ section, isSection, expanded }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between'
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NoteOutlinedIcon sx={{ marginRight: '22px' }} />
        <Typography sx={{ fontWeight: '700', fontSize: '14px', lineHeight: '150%' }}>
          {section?.name}
        </Typography>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {isSection && <Typography>{section?.children?.length} bài giảng</Typography>}
        {timeConvert(section?.duration) && (
          <FiberManualRecordIcon sx={{ margin: '0 12px', fontSize: '6px' }} />
        )}

        <Typography>
          {timeConvert(section?.duration) && `${timeConvert(section?.duration)} giờ`}
        </Typography>
        {isSection && (
          <ExpandMore
            expand={expanded}
            aria-expanded={expanded}
            aria-label="show more"
            sx={{ padding: '0 8px' }}
          >
            <ArrowDropDownIcon />
          </ExpandMore>
        )}
      </Box>
    </Box>
  );
};

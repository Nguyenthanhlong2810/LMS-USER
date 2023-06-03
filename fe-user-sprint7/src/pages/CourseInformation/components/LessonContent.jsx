import React, { useState } from 'react';
import { Typography, Box, Card, CardContent, CardActions, Button, Collapse } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import LessonContentSection from './LessonContentSection';
import ExpandMore from 'components/ExpandMore/ExpandMore';

const showFirstQuantity = 10;
const LessonContent = ({ lessonStructure }) => {
  const [expanded, setExpanded] = useState(false);
  [].slice;
  const firstSection =
    lessonStructure?.length > showFirstQuantity
      ? lessonStructure.slice(0, showFirstQuantity)
      : lessonStructure.slice(0, lessonStructure.length);
  const secondSection =
    lessonStructure?.length > showFirstQuantity ? lessonStructure.slice(showFirstQuantity) : [];
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  return (
    <Box sx={{ background: '#FFFFFF', borderRadius: '7px', p: '1.5rem' }}>
      <Typography sx={{ fontWeight: '700', fontSize: '29px', lineHeight: '140%' }}>
        Nội dung khóa học
      </Typography>
      <Card>
        <CardContent sx={{ paddingLeft: '0', paddingRight: '0' }}>
          {firstSection?.map((section, index) => (
            <LessonContentSection section={section} key={index} defaultExpand={index === 0} />
          ))}
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            {secondSection?.map((section, index) => (
              <LessonContentSection section={section} key={index} />
            ))}
          </Collapse>
        </CardContent>

        {secondSection.length > 0 && (
          <CardActions disableSpacing sx={{ justifyContent: 'center' }}>
            <Button
              onClick={handleExpandClick}
              endIcon={
                <ExpandMore
                  expand={expanded}
                  aria-expanded={expanded}
                  aria-label="show more"
                  color="primary"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              }
            >
              {expanded ? 'Thu gọn' : 'Xem thêm'}
            </Button>
          </CardActions>
        )}
      </Card>
    </Box>
  );
};
export default LessonContent;

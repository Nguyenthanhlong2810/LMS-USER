import React, { useState } from 'react';
import { Box, Typography, Button, styled } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandMore from 'components/ExpandMore/ExpandMore';
import ShowMoreText from 'utils/react-show-more/ShowMoreText';

const LessonDescription = ({ courseOverallData }) => {
  const [expanded, setExpanded] = useState(false);
  const onExecuteOnClick = (isExpanded) => {
    setExpanded(isExpanded);
  };
  return (
    <>
      {courseOverallData?.courseDescription && courseOverallData?.courseDescription !== '' && (
        <DescriptionWrapper>
          <Typography sx={{ fontWeight: '700', fontSize: '29px', lineHeight: '140%' }}>
            Mô tả
          </Typography>
          <ShowMoreText
            lines={10}
            more={
              <ExpandedBtnWrapper>
                <Button
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
                  Xem thêm
                </Button>
              </ExpandedBtnWrapper>
            }
            less={
              <ExpandedBtnWrapper>
                <Button
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
                  Thu gọn
                </Button>
              </ExpandedBtnWrapper>
            }
            className="content-css"
            anchorClass="my-anchor-css-class"
            onClick={onExecuteOnClick}
            expanded={expanded}
            keepNewLines={true}
            truncatedEndingComponent={'... '}
          >
            {courseOverallData?.courseDescription}
          </ShowMoreText>
        </DescriptionWrapper>
      )}
    </>
  );
};
export default LessonDescription;

const DescriptionWrapper = styled(Box)`
  background: #ffffff;
  border-radius: 7px;
  padding: 1.5rem;
  margin-top: 1.875rem;
  .content-css {
    font-weight: 400;
    font-size: 1rem;
    line-height: 170%;
    word-spacing: 0.05rem;
    color: #5d5a6f;
  }
  a {
    text-decoration: none;
  }
`;
const ExpandedBtnWrapper = styled('div')`
  text-align: center;
`;

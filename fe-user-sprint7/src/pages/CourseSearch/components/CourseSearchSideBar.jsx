import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {
  Box,
  Button,
  Card,
  CardActions,
  Checkbox,
  Collapse,
  Divider,
  FormControlLabel,
  FormGroup
} from '@mui/material';
import ExpandMore from 'components/ExpandMore/ExpandMore';

const CourseSearchSideBar = (props) => {
  const {
    title,
    handleExpandClick,
    handleShowMoreClick,
    handleCheckedChange,
    expanded,
    showMore,
    index,
    list,
    type,
    checkedFilter
  } = props;
  const defaultLength = type === 'experiences' ? 3 : 5;
  const firstList =
    list?.length > defaultLength ? list?.slice(0, defaultLength) : list?.slice(0, list.length);
  const secondList = list?.length > defaultLength ? list?.slice(defaultLength) : [];

  return (
    <Box sx={{ width: '100%', height: 'auto' }}>
      <Card sx={{ mb: '2rem', borderRadius: '0.625rem' }}>
        <CardActions disableSpacing sx={{ fontWeight: '700', fontSize: '20px', pl: '1.188rem' }}>
          {title}
          <ExpandMore
            expand={expanded}
            onClick={() => handleExpandClick(index)}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </ExpandMore>
        </CardActions>
        <div style={{ maxHeight: '25rem', overflow: 'hidden auto' }}>
          <Collapse in={!expanded} timeout="auto" unmountOnExit sx={{ p: '0 1.563rem' }}>
            <CardActions disableSpacing>
              <FormGroup>
                {firstList &&
                  firstList.map((item, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          checked={checkedFilter.includes(item.name)}
                          onChange={(e) => handleCheckedChange(e, type)}
                          name={item?.name}
                        />
                      }
                      label={
                        <>
                          <span style={{ color: '#2C3131', fontWeight: '600', fontSize: '16px' }}>
                            {item?.name}
                          </span>
                          <span style={{ color: '#818181', fontWeight: '500', fontSize: '16px' }}>
                            {' '}
                            &#40;{item?.totalCourse || 0}&#41;
                          </span>
                        </>
                      }
                    />
                  ))}
                <Collapse in={showMore} timeout="auto" unmountOnExit>
                  {secondList &&
                    secondList.map((item, index) => (
                      <FormControlLabel
                        key={index}
                        control={
                          <Checkbox
                            checked={checkedFilter.includes(item.name)}
                            onChange={(e) => handleCheckedChange(e, type)}
                            name={item?.name}
                          />
                        }
                        label={
                          <>
                            <span style={{ color: '#2C3131', fontWeight: '600', fontSize: '16px' }}>
                              {item?.name}
                            </span>
                            <span style={{ color: '#818181', fontWeight: '500', fontSize: '16px' }}>
                              {' '}
                              &#40;{item?.totalCourse}&#41;
                            </span>
                          </>
                        }
                      />
                    ))}
                </Collapse>
              </FormGroup>
            </CardActions>
          </Collapse>
        </div>

        <Collapse
          in={!expanded}
          timeout="auto"
          unmountOnExit
          sx={{ padding: '0 1.563rem 1.563rem' }}
        >
          {list?.length > defaultLength && (
            <CardActions disableSpacing sx={{ justifyContent: 'left' }}>
              <Button onClick={() => handleShowMoreClick(index)} sx={{ width: '100%' }}>
                {showMore ? 'Thu gọn' : 'Xem thêm'}
                <ExpandMore
                  expand={showMore}
                  aria-expanded={showMore}
                  aria-label="show more"
                  color="primary"
                  sx={{ m: 0 }}
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              </Button>
            </CardActions>
          )}
          <Divider />
        </Collapse>
      </Card>
    </Box>
  );
};

export default CourseSearchSideBar;

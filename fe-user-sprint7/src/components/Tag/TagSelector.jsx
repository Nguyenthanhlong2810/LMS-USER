import { Box, styled, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { useState } from 'react';
import ToggleButtonOther from './ToggleButtonOther';

const ToggleButtonStyle = styled(ToggleButton)({
  backgroundColor: 'white',
  borderRadius: '7px !important',
  paddingX: 2,
  paddingY: 1,
  fontWeight: 500,
  textTransform: 'none',
  color: '#565771'
});

export const TagSelector = ({
  title = '',
  selectedTags = [],
  setSelectedTags,
  tags = [],
  isSingleSelect = false,
  maxSelect = 1,
  allowOther = false
}) => {
  const [otherSelected, setOtherSelected] = useState(false);
  const otherValueRef = useRef();

  const onSelectTag = (event, selectedTag) => {
    if (Array.isArray(selectedTag) && selectedTag.length > maxSelect) {
      return;
    }
    setSelectedTags(selectedTag);
  };

  const onChangeOtherValue = (value) => {
    setOtherSelected(Boolean(value));
    const newSelectedTags = selectedTags.filter((c) => c !== otherValueRef.current);
    if (value) {
      newSelectedTags.push(value);
    }
    setSelectedTags(newSelectedTags);
    otherValueRef.current = value;
  };

  return (
    <Box bgcolor="#1FBDF8">
      <Typography color="white" fontWeight={700} fontSize={29} mb={1}>
        {title}
      </Typography>
      <Box display="flex" gap={2} flexWrap="wrap">
        <ToggleButtonGroup
          value={selectedTags}
          onChange={onSelectTag}
          exclusive={isSingleSelect}
          sx={{ gap: '15px', flexWrap: 'wrap' }}
        >
          {tags.map((c) => (
            <ToggleButtonStyle key={c.id} value={c.name}>
              {c.name}
            </ToggleButtonStyle>
          ))}
        </ToggleButtonGroup>
        {allowOther && (
          <ToggleButtonOther
            allowAdd={selectedTags.length < 5}
            selected={otherSelected}
            onChange={onChangeOtherValue}
          />
        )}
      </Box>
    </Box>
  );
};
TagSelector.propTypes = {
  title: PropTypes.string,
  selectedTags: PropTypes.array,
  setSelectedTags: PropTypes.func,
  tags: PropTypes.array,
  isSingleSelect: PropTypes.bool,
  maxSelect: PropTypes.number
};

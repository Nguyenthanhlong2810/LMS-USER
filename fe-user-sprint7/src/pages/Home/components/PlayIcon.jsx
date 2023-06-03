import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import React from 'react';

export const PlayIcon = (props) => (
  <PlayArrowRoundedIcon
    sx={{
      color: '#fff',
      opacity: '0.9',
      position: 'absolute',
      width: props.size,
      height: props.size,
      backgroundSize: `${props.size} ${props.size}`,
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      textAlign: 'center'
    }}
  />
);

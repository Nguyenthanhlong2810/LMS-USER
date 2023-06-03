import { Box } from '@mui/material';
import React from 'react';

export default function Ellipsis({ children, line = 3, style = {}, expanded = false }) {
  return (
    <Box
      sx={{
        WebkitLineClamp: !expanded && line,
        display: '-webkit-box',
        WebkitBoxOrient: 'vertical',
        overflow: !expanded && 'hidden',
        textOverflow: !expanded && 'ellipsis',
        whiteSpace: 'pre-line',
        '& figure': {
          display: 'none'
        },
        '& img': {
          display: 'none !important'
        },
        ...style
      }}
    >
      {children}
    </Box>
  );
}

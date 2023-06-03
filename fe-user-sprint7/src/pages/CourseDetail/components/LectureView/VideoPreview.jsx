import React, { useRef } from 'react';
import {
  Player,
  ControlBar,
  ForwardControl,
  LoadingSpinner,
  ReplayControl,
  VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import { Box, styled } from '@mui/material';

const VideoPreview = ({ path = '' }) => {
  const playerRef = useRef(null);
  return (
    <StyledLectureVideo sx={{ marginBottom: '1.25rem' }}>
      <Player ref={playerRef} playsInline autoPlay src={path}>
        <LoadingSpinner />
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} autoHideTime={5000}>
          {/* <ReplayControl seconds={5} order={2.1} />
          <ForwardControl seconds={5} order={3.1} /> */}
          <VolumeMenuButton vertical order={7.1} />
        </ControlBar>
      </Player>
    </StyledLectureVideo>
  );
};

export default VideoPreview;
const StyledLectureVideo = styled(Box)`
  .video-react-progress-control {
    pointer-events: none;
  }
`;

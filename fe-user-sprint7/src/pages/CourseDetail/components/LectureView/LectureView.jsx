import React, { useRef, useEffect, useState, useMemo } from 'react';
import {
  Player,
  ControlBar,
  ForwardControl,
  LoadingSpinner,
  ReplayControl,
  VolumeMenuButton,
  BigPlayButton
} from 'video-react';
import { Button, Box, styled } from '@mui/material';
import Crop169Icon from '@mui/icons-material/Crop169';
import BorderColorIcon from '@mui/icons-material/BorderColor';
import { useDispatch, useSelector } from 'react-redux';
import {
  setTheaterView,
  setLessonStructure,
  setSelectLecture,
  setChooseTimeFromNote
} from 'store/reducers/courseDetailSlice';
import { MyCourseAPI } from 'apis/MyCourse/MyCourseAPI';

const LectureView = ({
  handleNoteAtTime,
  selectedLecture,
  focusNote,
  focusInput,
  setFocusNote,
  getProcessUserCourses,
  setTabCourseDetail
}) => {
  const [percent, setPercent] = useState(0);
  const [currLecture, setCurrLecture] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const playerRef = useRef(null);

  const dispatch = useDispatch();
  const lessonStructure = useSelector((state) => state.courseDetail.lessonStructure);
  const currentTimeToSeek = useSelector((state) => state.courseDetail.currentTimeToSeek);
  const isChooseTimeFromNote = useSelector((state) => state.courseDetail.isChooseTimeFromNote);

  useEffect(() => {
    if (playerRef.current) {
      playerRef.current.subscribeToStateChange(handleBind);
    }
    return () => {
      if (playerRef.current) {
        const unsubscribe = playerRef.current?.manager?.subscribeToOperationStateChange(handleBind);
        unsubscribe();
      }
    };
  }, []);

  useEffect(() => {
    if (focusNote) {
      const { player } = playerRef.current.getState();
      playerRef.current.pause();
      handleNoteAtTime(player.currentTime);
    }
  }, [focusNote]);

  useEffect(() => {
    setCurrLecture((prev) => {
      if (
        prev?.fatherIndex !== selectedLecture?.fatherIndex ||
        prev?.childIndex !== selectedLecture?.childIndex
      ) {
        if (playerRef.current) playerRef.current.load();
      }
      return selectedLecture;
    });
  }, [selectedLecture]);
  useEffect(() => {
    if (selectedLecture?.completedOpen && !selectedLecture?.completed) {
      handleAddLearningHistory();
    }
    if (
      percent >= selectedLecture?.conditionPass &&
      !selectedLecture?.completed &&
      !selectedLecture?.completedOpen
    ) {
      handleAddLearningHistory();
    }
  }, [percent, selectedLecture]);

  useEffect(() => {
    if (isChooseTimeFromNote && playerRef.current) {
      dispatch(setChooseTimeFromNote(false));
      playerRef.current.pause();
      playerRef.current.seek(currentTimeToSeek);
      playerRef.current.play();
    }
  }, [currentTimeToSeek, isChooseTimeFromNote]);

  const handleAddLearningHistory = async () => {
    try {
      const lessonStructureCopy = JSON.parse(JSON.stringify(lessonStructure));
      lessonStructureCopy[selectedLecture?.fatherIndex].children[selectedLecture?.childIndex] = {
        ...selectedLecture,
        completed: true
      };
      dispatch(setLessonStructure(lessonStructureCopy));
      const newSelectedLecture = { ...selectedLecture, completed: true };
      dispatch(setSelectLecture(newSelectedLecture));
      const data = {
        completed: true,
        contentId: selectedLecture?.id,
        lessonStructureId: selectedLecture?.lessonStructureId,
        type: 'VIDEO'
      };
      const res = await MyCourseAPI.addLearningHistory(data);
      getProcessUserCourses();
      const unsubscribe = playerRef.current?.manager?.subscribeToOperationStateChange(handleBind);
      unsubscribe();
    } catch (err) {
      console.log(err);
    }
  };
  function handleBind(state) {
    const percentage = Math.round((state.currentTime / state.duration) * 100);
    setPercent(percentage);
    if (state?.paused) {
      handleNoteAtTime(state?.currentTime);
    }
    setIsFullscreen(state.isFullscreen);
  }
  return (
    <StyledLectureVideo sx={{ marginBottom: '1.25rem' }}>
      <Player ref={playerRef} playsInline autoPlay src={selectedLecture?.linkFileContent}>
        <LoadingSpinner />
        <BigPlayButton position="center" />
        <ControlBar autoHide={true} autoHideTime={5000}>
          {/* <ReplayControl seconds={5} order={2.1} />
          <ForwardControl seconds={5} order={3.1} /> */}
          {!isFullscreen && (
            <NoteControl
              order={3.2}
              playerRef={playerRef}
              handleNoteAtTime={handleNoteAtTime}
              setTabCourseDetail={setTabCourseDetail}
              focusInput={focusInput}
              focusNote={focusNote}
              setFocusNote={setFocusNote}
            />
          )}
          <VolumeMenuButton vertical order={7.1} />
          <ExpandedControl order={7.2} />
        </ControlBar>
      </Player>
    </StyledLectureVideo>
  );
};

export default LectureView;

const StyledLectureVideo = styled(Box)`
  .video-react-progress-control {
    pointer-events: none;
  }
`;

const NoteControl = ({
  playerRef,
  handleNoteAtTime,
  focusInput,
  focusNote,
  setTabCourseDetail,
  setFocusNote
}) => {
  useEffect(() => {
    focusNote === true && focusInput();
  }, [focusNote]);

  const handleNote = () => {
    const { player } = playerRef.current.getState();
    playerRef.current.pause();
    focusInput();
    setTabCourseDetail(3);
    setFocusNote(true);
    handleNoteAtTime(player.currentTime);
  };
  return (
    <Button color="inherit" size="small" sx={{ minWidth: 'unset' }} onClick={handleNote}>
      <BorderColorIcon sx={{ fontSize: '1rem' }} />
    </Button>
  );
};

const ExpandedControl = () => {
  const dispatch = useDispatch();

  const handleExpand = () => {
    dispatch(setTheaterView());
  };
  return (
    <Button color="inherit" size="small" sx={{ minWidth: 'unset' }} onClick={handleExpand}>
      <Crop169Icon />
    </Button>
  );
};

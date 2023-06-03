import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import DriveFileRenameOutlineIcon from '@mui/icons-material/DriveFileRenameOutline';
import { Grid } from '@mui/material';
import { NoteAPI } from 'apis/Note';
import { FlexAlignCenterJustifySpaceBetween } from 'components/Layout/Flex';
import { httpStatus, NOTE_MAX_LENGTH } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import {
  AvatarStyled,
  CourseDetailLessonNameStyled,
  TextFieldStyled
} from 'pages/CourseDetail/style';
import { useEffect } from 'react';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { secondConvert } from 'utils';
import { setCurrentTimeToSeek } from 'store/reducers/courseDetailSlice';
import { useDispatch } from 'react-redux';
import { useRef } from 'react';
import { TextHelper } from 'components/TextHelper/TextHelper';

const NoteInputField = ({ data, togglePopupConfirm, setPagination }) => {
  const [enableEdit, setEnableEdit] = useState(false);
  const [inputValue, setInputValue] = useState();
  const inputRef = useRef();

  const { hideLoading, showLoading } = useLoading();
  const dispatch = useDispatch();

  useEffect(() => {
    data && setInputValue(data?.content);
  }, [data]);
  const onKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      e.target.value && onEditNote(e.target.value);
    }
  };
  const onEditNote = async () => {
    showLoading();
    try {
      let reqUpdate = {
        id: data.id,
        content: inputValue
      };
      const res = await NoteAPI.update(reqUpdate);
      if (res.status === httpStatus.StatusOK) {
        toast.success('Sửa ghi chú thành công');
        const newPagination = {
          pageNo: 1,
          pageSize: 5
        };
        setPagination(newPagination);
        setEnableEdit(false);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideLoading();
    }
  };

  const handleChooseTime = () => {
    dispatch(setCurrentTimeToSeek(data?.time));
  };

  const openEditNote = () => {
    setEnableEdit(true);
    setTimeout(() => {
      inputRef.current.focus();
    }, 100);
  };
  return (
    <Grid container sx={{ mt: '2rem' }} key={data.id}>
      <Grid item xs={1} />
      <Grid item xs={11} sx={{ mb: '0.625rem' }}>
        <FlexAlignCenterJustifySpaceBetween>
          <CourseDetailLessonNameStyled>
            {data?.lessonName} <span>{data?.contentName && `(${data?.contentName})`}</span>
          </CourseDetailLessonNameStyled>
          <div style={{ color: '#818181' }}>
            {!enableEdit && (
              <DriveFileRenameOutlineIcon
                fontSize="small"
                sx={[{ mr: '1rem' }, { '&:hover': { color: '#457EFF' } }]}
                onClick={openEditNote}
              />
            )}
            <DeleteOutlineIcon
              onClick={() => togglePopupConfirm(data?.id)}
              fontSize="small"
              sx={[{ '&:hover': { color: 'red' } }]}
            />
          </div>
        </FlexAlignCenterJustifySpaceBetween>
      </Grid>
      <Grid item container justifyContent="center" alignItems="center">
        <Grid item xs={1}>
          <AvatarStyled>{secondConvert(data?.time)}</AvatarStyled>
        </Grid>
        <Grid item xs={11} sx={{ pt: '0 !important' }}>
          <TextFieldStyled
            inputRef={inputRef}
            multiline
            disabled={!enableEdit}
            value={inputValue}
            autoFocus
            onKeyPress={(e) => onKeyPress(e)}
            onChange={(e) => setInputValue(e.target.value)}
            inputProps={{
              maxLength: NOTE_MAX_LENGTH
            }}
          />
          {enableEdit && (
            <TextHelper>{(inputValue?.length ?? 0) + '/' + NOTE_MAX_LENGTH}</TextHelper>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default NoteInputField;

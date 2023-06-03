import { default as ExpandMore, default as ExpandMoreIcon } from '@mui/icons-material/ExpandMore';
import { default as ExpandLess, default as ExpandLessIcon } from '@mui/icons-material/ExpandLess';
import { Box, Button, MenuItem, Select } from '@mui/material';
import { NoteAPI } from 'apis/Note';
import { FormControl } from 'components';
import { Flex } from 'components/Layout/Flex';
import { httpStatus, NOTE_MAX_LENGTH } from 'consts';
import useConfirmDialog from 'hooks/DialogProvider/useConfirmDialog';
import { useLoading } from 'hooks/LoadingProvider';
import { TextFieldStyled } from 'pages/CourseDetail/style';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import NoteInputField from './NoteInputField';
import { isEmpty } from 'lodash';
import { TextHelper } from 'components/TextHelper/TextHelper';
import { useTranslation } from 'react-i18next';

const CourseDetailNote = ({ inputRef, time, setFocusNote }) => {
  const { t } = useTranslation();
  const [lecture, setLecture] = useState('all');
  const { hideLoading, showLoading } = useLoading();
  const [note, setNote] = useState();
  const [totalNote, setTotalNote] = useState(0);
  const { id } = useParams();
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: 5
  });
  const [noteValue, setNoteValue] = useState('');
  const confirm = useConfirmDialog();

  const selectedLecture = useSelector((state) => state.courseDetail.selectedLecture);
  const firstPreviewUrl = useSelector((state) => state.courseDetail.firstPreviewUrl);

  useEffect(() => {
    getListNote();
  }, [pagination, lecture]);

  useEffect(() => {
    if (pagination.pageNo === 1 && pagination.pageSize === 5) {
      getListNote();
    } else {
      const newPagination = {
        pageNo: 1,
        pageSize: 5
      };
      setPagination(newPagination);
    }
  }, [selectedLecture]);

  const getListNote = async () => {
    try {
      showLoading();
      let req = {
        courseId: id,
        pageNo: pagination.pageNo,
        pageSize: pagination.pageSize,
        lessonContentUploadId: lecture === 'all' ? '' : selectedLecture?.lessonContentUploadId
      };
      const data = await NoteAPI.getList(req);
      if (data.data) {
        setTotalNote(data.data?.data?.totalRecords);
        let newNote = note;
        newNote = data.data?.data?.items;
        setNote(newNote);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    } finally {
      hideLoading();
    }
  };
  const handleChange = (event) => {
    setLecture(event.target.value);
  };
  const onKeyPress = (e) => {
    const keyCode = e.which || e.keyCode;
    if (keyCode === 13 && !e.shiftKey) {
      e.preventDefault();
      sessionStorage.removeItem('tempNote');
      e.target.value && onSubmitNote(e.target.value);
    }
  };
  const togglePopupConfirm = (idNote) => {
    confirm({
      content: 'Bạn có chắc chắn muốn xoá ghi chú này không?',
      onConfirm: () => onDeleteNote(idNote)
    });
  };
  const onDeleteNote = async (idNote) => {
    showLoading();
    try {
      let res = await NoteAPI.delete({ id: idNote });
      if (res.status === httpStatus.StatusOK) {
        toast.success('Xóa ghi chú thành công');
        const newPagination = {
          pageNo: 1,
          pageSize: 5
        };
        setPagination(newPagination);
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideLoading();
    }
  };
  const onSubmitNote = async (data) => {
    showLoading();
    try {
      let reqCreate = {
        content: data,
        lessonContentUploadId: selectedLecture?.lessonContentUploadId,
        time: time ?? 0
      };
      const res = await NoteAPI.create(reqCreate);
      if (res.status === httpStatus.StatusOK) {
        toast.success('Thêm ghi chú thành công');
        const newPagination = {
          pageNo: 1,
          pageSize: 5
        };
        setPagination(newPagination);
        setNoteValue('');
      }
    } catch (error) {
      toast.error(error?.message);
    } finally {
      hideLoading();
    }
  };

  const handleShowMore = () => {
    const newPagination = {
      pageNo: 1,
      pageSize: pagination.pageSize + 5
    };
    setPagination(newPagination);
  };
  const handleShowLess = () => {
    const newPagination = {
      pageNo: 1,
      pageSize: 5
    };
    setPagination(newPagination);
  };

  const handleFocus = () => {
    setFocusNote(true);
  };
  return (
    <Box sx={{ mt: '2.125rem' }}>
      <TextFieldStyled
        multiline
        rows={2}
        value={noteValue}
        inputRef={inputRef}
        onKeyPress={(e) => onKeyPress(e)}
        defaultValue={sessionStorage.getItem('tempNote')}
        onFocus={handleFocus}
        disabled={Boolean(firstPreviewUrl)}
        onBlur={() => setFocusNote(false)}
        placeholder="Thêm ghi chú (Nhấn shift+enter để xuống dòng)"
        onChange={(e) => {
          setNoteValue(e.target.value);
          sessionStorage.setItem('tempNote', e.target.value);
        }}
        inputProps={{
          maxLength: NOTE_MAX_LENGTH
        }}
      />
      <TextHelper>{(noteValue?.length ?? 0) + '/' + NOTE_MAX_LENGTH}</TextHelper>

      <FormControl padding={0} mt="1.25rem" width="12.5rem">
        <Select value={lecture} onChange={handleChange}>
          <MenuItem value="all">Tất cả học phần</MenuItem>
          <MenuItem value="current">Học phần hiện tại</MenuItem>
        </Select>
      </FormControl>
      {!isEmpty(note) &&
        note?.map((item, index) => (
          <NoteInputField
            data={item}
            key={index}
            togglePopupConfirm={togglePopupConfirm}
            onSubmitNote={onSubmitNote}
            onDeleteNote={onDeleteNote}
            setPagination={setPagination}
          />
        ))}
      {isEmpty(note) ? (
        <Flex justifyContent={'center'} sx={{ margin: 5 }}>
          Chưa có ghi chú nào được tạo
        </Flex>
      ) : totalNote < 5 || note.length === totalNote ? null : (
        <Button onClick={handleShowMore} sx={{ width: '100%', mt: '2.5rem' }}>
          Xem thêm
          <ExpandMore aria-label="show more" color="primary" sx={{ m: 0 }}>
            <ExpandMoreIcon />
          </ExpandMore>
        </Button>
      )}
      {totalNote > 5 && note?.length === totalNote && (
        <Button onClick={handleShowLess} sx={{ width: '100%', mt: '2.5rem' }}>
          Thu gọn
          <ExpandLess aria-label="show less" color="primary" sx={{ m: 0 }}>
            <ExpandLessIcon />
          </ExpandLess>
        </Button>
      )}
    </Box>
  );
};

export default CourseDetailNote;

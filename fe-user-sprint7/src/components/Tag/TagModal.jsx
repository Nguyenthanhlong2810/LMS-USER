import { Box, Button, Modal, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { TagSelector } from './TagSelector';
import PropTypes from 'prop-types';
import { useState } from 'react';

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24
};
export const TagModal = ({
  open,
  onClose,
  modalLabel,
  selectedTags,
  tags,
  label,
  setSelectedTags = () => {}
}) => {
  const [selectedModalTags, setSelectedModalTags] = useState(selectedTags);
  const onSaveChange = () => {
    setSelectedTags(selectedModalTags);
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={modalStyle}>
        <Box display="flex" justifyContent="space-between" alignItems="center" py={1}>
          <div />
          <Typography fontWeight={700}>{modalLabel}</Typography>
          <Button onClick={onClose}>
            <CloseIcon />
          </Button>
        </Box>
        <Box bgcolor="#1FBDF8" p={4}>
          <TagSelector
            title={label}
            selectedTag={selectedModalTags}
            setSelectedTags={setSelectedModalTags}
            tags={tags}
          />

          <Box display="flex" justifyContent="end">
            <Button variant="contained" color="secondary" sx={{ marginRight: 2 }} onClick={onClose}>
              Hủy
            </Button>
            <Button variant="contained" color="success" onClick={onSaveChange}>
              Lưu
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};
TagModal.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  modalLabel: PropTypes.string,
  selectedTags: PropTypes.array
};

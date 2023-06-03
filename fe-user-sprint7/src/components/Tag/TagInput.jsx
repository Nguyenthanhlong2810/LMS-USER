import { Autocomplete, Box, Button, TextField } from '@mui/material';
import BorderColorOutlinedIcon from '@mui/icons-material/BorderColorOutlined';
import { useBoolean } from 'hooks/use-boolean';
import { Controller } from 'react-hook-form';
import PropTypes from 'prop-types';
import { TagModal } from './TagModal';

export const TagInput = ({
  label,
  modalLabel,
  selectedTags = [],
  tags,
  control,
  name,
  setSelectedTags
}) => {
  const { value: isOpenModal, setTrue: openModal, setFalse: closeModal } = useBoolean();

  return (
    <Box display="flex">
      <Controller
        render={() => (
          <Autocomplete
            multiple
            options={selectedTags}
            defaultValue={selectedTags}
            renderInput={(params) => <TextField {...params} label={label} />}
            disableClearable
            freeSolo
            readOnly
            fullWidth
          />
        )}
        name={name}
        control={control}
      />

      <Button onClick={openModal}>
        <BorderColorOutlinedIcon />
      </Button>
      <TagModal
        label={label}
        setSelectedTags={setSelectedTags}
        open={isOpenModal}
        onClose={closeModal}
        modalLabel={modalLabel}
        selectedTags={selectedTags}
        tags={tags}
      />
    </Box>
  );
};
TagInput.propTypes = {
  label: PropTypes.string,
  modalLabel: PropTypes.string,
  selectedTags: PropTypes.array,
  control: PropTypes.object,
  name: PropTypes.string
};

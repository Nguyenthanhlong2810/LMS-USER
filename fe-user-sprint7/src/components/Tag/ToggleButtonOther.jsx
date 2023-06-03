import CloseIcon from '@mui/icons-material/Close';
import { IconButton, TextField } from '@mui/material';
import { FlexCenter } from 'components/Layout/Flex';
import { useRef, useState } from 'react';
import { toast } from 'react-toastify';

const OtherValueText = 'Khác';

export default function ToggleButtonOther(props) {
  const { selected, onChange, style, allowAdd } = props;
  const oldValueRef = useRef('');
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(OtherValueText);
  const valueNotOther = value !== OtherValueText;

  const onInputKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (!allowAdd && !selected) {
        setValue(OtherValueText);
        setIsEditing(false);
        return toast.info('Bạn đã vượt quá số lựa chọn cho phép');
      }
      const saveValue = value.trim();
      setIsEditing(false);
      if (!saveValue) {
        setValue(OtherValueText);
      } else {
        setValue(saveValue);
      }
      onChange(saveValue);
      oldValueRef.current = saveValue;
    } else if (e.key === 'Escape') {
      if (!oldValueRef.current) {
        setValue(OtherValueText);
      } else {
        setValue(oldValueRef.current);
      }
      setIsEditing(false);
    }
  };

  const onEdit = (e) => {
    if (value === OtherValueText) {
      setValue('');
    } else {
      oldValueRef.current = value;
    }
    setIsEditing(true);
  };

  const onDelete = (e) => {
    e.stopPropagation();
    setValue(OtherValueText);
    onChange();
  };

  return (
    <>
      {isEditing ? (
        <TextField
          variant="standard"
          sx={{ background: 'white', borderRadius: '7px !important', height: '100%', paddingY: 1 }}
          value={value}
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={onInputKeyDown}
          InputProps={{
            disableUnderline: true
          }}
          inputProps={{
            maxLength: 50
          }}
          autoFocus
        />
      ) : (
        <FlexCenter
          key="other"
          sx={{
            backgroundColor: selected ? '#1daee5' : 'white',
            borderColor: selected ? '#1daee5' : 'white',
            borderWidth: '1px',
            boxSizing: 'border-box',
            borderRadius: '7px !important',
            lineHeight: '1.75',
            paddingX: 2,
            paddingY: 1,
            fontWeight: 500,
            textTransform: 'none',
            fontSize: '0.875rem',
            color: selected ? '#04171e' : '#565771',
            ':hover': {
              // border: '1px solid #1a9fd1',
              background: '#20aee4',
              cursor: 'pointer'
            },
            gap: 2,
            ...style
          }}
          onClick={onEdit}
        >
          <>
            {value}
            {valueNotOther && (
              <IconButton aria-label="delete" onClick={onDelete}>
                <CloseIcon sx={{ fontSize: '0.9rem' }} />
              </IconButton>
            )}
          </>
        </FlexCenter>
      )}
    </>
  );
}

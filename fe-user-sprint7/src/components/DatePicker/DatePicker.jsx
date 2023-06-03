import { TextField } from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';

export const DatePicker = ({ label, format = 'DD/MM/YYYY', value, onChange }) => {
  return (
    <DesktopDatePicker
      label={label}
      value={value}
      onChange={onChange}
      inputFormat={format}
      renderInput={(params) => <TextField {...params} />}
    />
  );
};

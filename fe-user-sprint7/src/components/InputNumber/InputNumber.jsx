import { OutlinedInput, styled } from '@mui/material';

export const InputNumber = styled(OutlinedInput)({
  '& input[type=number]': {
    '-moz-appearance': 'textfield'
  },
  '& input[type=number]::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  },
  '& input[type=number]::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0
  }
});

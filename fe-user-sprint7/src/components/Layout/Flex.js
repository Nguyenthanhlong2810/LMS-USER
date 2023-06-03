import { Box, styled } from '@mui/material';

export const Flex = styled(Box)({
  display: 'flex'
});
export const FlexRow = styled(Flex)({
  display: 'flex'
});
export const FlexCol = styled(Flex)({
  flexDirection: 'column'
});
export const FlexCenter = styled(Flex)({
  justifyContent: 'center',
  alignItems: 'center'
});
export const FlexAlignCenterJustifySpaceBetween = styled(Flex)({
  justifyContent: 'space-between',
  alignItems: 'center'
});

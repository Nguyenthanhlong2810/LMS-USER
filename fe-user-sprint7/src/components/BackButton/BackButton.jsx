import { Button } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

export const BackButton = () => {
  const navigate = useNavigate();
  const LOCATION = useLocation();
  const onGoBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  return (
    <Button onClick={onGoBack} disabled={LOCATION.key === 'default'}>
      <KeyboardBackspaceIcon sx={{ marginRight: 1 }} />
    </Button>
  );
};

import React from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material';
import PropTypes from 'prop-types';
import './Modal.scss';

export const Modal = ({ isOpen, onClose, title, children, ...props }) => {
  return (
    <Dialog
      open={isOpen}
      onBackdropClick={onClose}
      fullWidth={true}
      maxWidth="md"
      onClose={onClose}
      {...props}
    >
      <div className="dialog-header">
        <DialogTitle
          sx={{
            fontWeight: '700',
            fontSize: '1rem',
            lineHeight: '150%',

            flexGrow: '2',
            textAlign: 'center',
            paddingLeft: '5rem'
          }}
        >
          {title}
        </DialogTitle>
        <Button sx={{ color: 'black' }} onClick={onClose}>
          <CloseIcon sx={{ fontSize: 'small' }} />
        </Button>
      </div>
      <DialogContent>{children}</DialogContent>
    </Dialog>
  );
};
Modal.propTypes = {
  children: PropTypes.node,
  title: PropTypes.string,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func
};

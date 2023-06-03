import React, { useState } from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Button, Menu, MenuItem } from '@mui/material';
import { localStorageHelper } from 'helpers';
import { LANGUAGE, LOCAL_STORE } from 'consts/system.const';
import i18next from 'i18next';

export const LanguageSelector = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const displayFlag =
    localStorageHelper.getItem(LOCAL_STORE.LANGUAGE) === LANGUAGE.EN
      ? { src: '/english-flag.svg', alt: 'english-flag' }
      : { src: '/vietnam-flag.svg', alt: 'vietnam-flag' };
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onChooseLanguage = (language = LANGUAGE.EN) => {
    localStorageHelper.setItem(LOCAL_STORE.LANGUAGE, language);
    i18next.changeLanguage(language);
    handleClose();
    window.location.reload();
  };

  return (
    <div>
      <Button color="inherit" onClick={handleClick}>
        <img {...displayFlag} />
        <ArrowDropDownIcon />
      </Button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem onClick={() => onChooseLanguage(LANGUAGE.EN)}>
          <img src="/english-flag.svg" alt="english-flag" />
        </MenuItem>
        <MenuItem onClick={() => onChooseLanguage(LANGUAGE.VI)}>
          <img src="/vietnam-flag.svg" alt="vietnam-flag" />
        </MenuItem>
      </Menu>
    </div>
  );
};

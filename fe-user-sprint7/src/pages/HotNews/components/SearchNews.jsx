import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';

export default function SearchNews({ getSearchNews }) {
  const [searchNews, setSearchNews] = useState('');
  const { t } = useTranslation();

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      getSearchNews(searchNews);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#565771',
        borderRadius: '7px',
        height: '75px',
        margin: '28px 0 14px 0'
      }}
    >
      <TextField
        required
        value={searchNews}
        size="small"
        id="outlined-required"
        onKeyDown={onKeyDown}
        placeholder={t`news:search-news`}
        onChange={(event) => setSearchNews(event.target.value)}
        sx={{ p: '16px 20px' }}
        inputProps={{
          maxLength: 50,
          style: {
            backgroundColor: '#fff'
          }
        }}
      />

      <Button
        variant="contained"
        sx={{ marginTop: '16px' }}
        size="large"
        onClick={() => getSearchNews(searchNews)}
      >
        <SearchIcon />
        {t`news:search`}
      </Button>
    </Box>
  );
}

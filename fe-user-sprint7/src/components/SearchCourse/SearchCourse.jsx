import { Box, Button, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import { useLocation, useSearchParams } from 'react-router-dom';

export default function SearchCourse({ getSearchCourse, result, params, setPage }) {
  const [searchCourse, setSearchCourse] = useState(params ?? '');
  const { t } = useTranslation();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams({});

  const onKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleSearch = () => {
    setPage && setPage(1);
    setSearchCourse(searchCourse.trim());
    getSearchCourse({ name: searchCourse?.trim(), pageNo: 1 });
    location.pathname?.includes('search') && setSearchParams({ name: searchCourse.trim() });
  };
  useEffect(() => {
    setSearchCourse(params ?? '');
  }, [params]);

  return (
    <Box
      sx={{
        width: '100%',
        backgroundColor: '#565771',
        borderRadius: '7px',
        height: '75px',
        margin: '28px 0 14px 0',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <TextField
        required
        value={searchCourse}
        title={t('news:search')}
        size="small"
        id="outlined-required"
        onKeyDown={onKeyDown}
        placeholder={t`news:search`}
        onChange={(event) => setSearchCourse(event.target.value)}
        onPaste={(event) => setSearchCourse(event.target.value.trim())}
        sx={{ p: '16px 20px', width: '23.938rem' }}
        inputProps={{
          maxLength: 50,
          style: {
            backgroundColor: '#fff'
          }
        }}
      />
      <div>
        <Button variant="contained" size="large" onClick={handleSearch}>
          <SearchIcon />
          {t`news:search`}
        </Button>
      </div>

      {result && (
        <div style={{ color: '#fff', fontSize: '14px', marginLeft: '2.813rem' }}>
          {result} kết quả
        </div>
      )}
    </Box>
  );
}

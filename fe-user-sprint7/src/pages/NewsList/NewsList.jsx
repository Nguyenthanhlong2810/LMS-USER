import { Box, Grid, Stack, TablePagination, Typography } from '@mui/material';
import { News } from 'components/News/News';
import { CommonLayout } from 'layouts/common';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { NewsAPI } from 'apis/News/NewsAPI';
import { isEmpty } from 'lodash';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ResponsiveListNews } from './NewsList.style';
import { DEFAULT_PAGE_PARAMS } from 'consts/system.const';

const PER_PAGE = 9;

const NewsList = () => {
  const [newsList, setNewsList] = useState({});
  const [searchParams] = useSearchParams();
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(1);
  const [pageSize, setPageSize] = useState(PER_PAGE);
  const searchText = searchParams.get('search');

  const { t } = useTranslation();

  useEffect(() => {
    getNewsList();
  }, [page, pageSize]);

  const getNewsList = async () => {
    try {
      const contentTypeNews = searchParams.get('content');
      const params = {
        ...DEFAULT_PAGE_PARAMS,
        pageNo: page,
        pageSize: pageSize,
        keyword: searchText || ''
      };
      if (!!contentTypeNews) {
        params.contentType = contentTypeNews.toUpperCase();
      }
      const res = await NewsAPI.getAllNews(params);
      setNewsList(res?.data?.data?.items);
      setTotalRecords(res?.data.data?.totalRecords);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          width: '90%',
          backgroundColor: '#fff',
          height: '100%',
          m: '2rem auto 4rem auto',

          borderRadius: '10px',
          mt: '64px'
        }}
      >
        <Box sx={{ width: '95%', margin: 'auto' }}>
          <Grid container spacing={2}>
            {!isEmpty(newsList) ? (
              newsList.map((item, index) => (
                <Grid key={index} item xs={12} md={6} lg={4}>
                  <News news={item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Stack justifyContent="center" alignItems="center" spacing={2}>
                  <Typography fontWeight={500} paddingTop="2rem">
                    {searchText ? t`news:no-result` : t`news:no-data`}
                  </Typography>
                </Stack>
              </Grid>
            )}
          </Grid>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: '80px 0 60px 0' }}>
            <TablePagination
              component="div"
              count={totalRecords}
              page={page - 1}
              onPageChange={(event, page) => setPage(page + 1)}
              rowsPerPage={pageSize}
              rowsPerPageOptions={[9, 30, 60, 100]}
              onRowsPerPageChange={handlePageSizeChange}
              labelRowsPerPage={'Số kết quả mỗi trang'}
            />
          </Box>
        </Box>
      </Box>
    </CommonLayout>
  );
};

export default NewsList;

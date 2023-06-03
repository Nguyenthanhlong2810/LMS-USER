import React from 'react';
import { Grid, TextField, Button } from '@mui/material';
import { FormControl } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';
import SearchIcon from '@mui/icons-material/Search';
import { useTranslation } from 'react-i18next';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { isEmpty } from 'lodash';
const defaultValues = {
  keyword: ''
};

const SearchCertificate = ({
  onSelectAll,
  setSearchParams,
  selected,
  handleDownload,
  isSelectedAll
}) => {
  const { t } = useTranslation();
  const { handleSubmit, register } = useForm({
    defaultValues: defaultValues
  });
  function handleSearch(values) {
    setSearchParams({ ...formatReq(values) });
  }
  return (
    <>
      <form onSubmit={handleSubmit(handleSearch)}>
        <Grid container alignItems="flex-end">
          <Button
            size="large"
            variant="contained"
            color="neutral"
            onClick={onSelectAll}
            sx={{ marginRight: '1rem' }}
          >
            {!isSelectedAll ? t`translation:select_all` : t`translation:deselect_all`}
          </Button>
          <Grid item md={3}>
            <FormControl label="" padding={0}>
              <TextField
                {...register('keyword')}
                placeholder={t`translation:search_everything`}
                size="small"
                inputProps={{
                  maxLength: 50
                }}
              />
            </FormControl>
          </Grid>
          <Button
            className="icon-btn"
            variant="contained"
            size="large"
            type="submit"
            sx={{ margin: '0 1rem' }}
          >
            <SearchIcon /> {t('news:search')}
          </Button>
          <Button
            className="icon-btn"
            variant="contained"
            size="large"
            color="secondary"
            disabled={isEmpty(selected) && true}
            onClick={handleDownload}
          >
            <FileDownloadOutlinedIcon /> {t('translation:download')}
          </Button>
        </Grid>
      </form>
    </>
  );
};

export default SearchCertificate;

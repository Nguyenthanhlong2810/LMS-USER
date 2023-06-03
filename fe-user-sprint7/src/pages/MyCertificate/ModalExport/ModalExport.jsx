import React, { useState } from 'react';
import { Button, DialogActions, Select, MenuItem, Box, Typography } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Controller } from 'react-hook-form';
import { FORMAT } from 'consts';
import { CertificateAPI } from 'apis/Certificate/CertificateAPI';
import fileDownload from 'js-file-download';

const ModalExport = ({ onClose, courseId, data }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const schema = yup
    .object({
      type: yup.string().max(50).required()
    })
    .required();
  const { handleSubmit, control } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { type: 'PDF' }
  });
  const submitForm = async (values) => {
    const params = { type: values.type, courseIds: courseId?.toString() };
    setIsLoading(true);
    try {
      const res = await CertificateAPI.downloadMultiple(params);
      if (res.data) {
        if (courseId?.length === 1) {
          const selectedItem = data?.find((item) => item?.courseId === courseId[0]);
          fileDownload(res.data, `${selectedItem?.courseName}.${values.type}`);
        } else {
          fileDownload(res.data, 'certificate.zip');
        }
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <Box sx={{ display: 'flex', gap: 1, width: '100%', padding: '2rem 0', alignItems: 'center' }}>
        <Typography
          fontWeight={700}
          fontSize={'1rem'}
          lineHeight={'150%'}
          sx={{ color: '#201B40', flex: 1 }}
        >{t`certificate:format-download`}</Typography>
        <Controller
          name="type"
          render={({ field: { value, onChange } }) => (
            <Select
              value={value}
              onChange={onChange}
              autoWidth={true}
              sx={{ maxHeight: '2.75rem', minWidth: '80px' }}
            >
              {FORMAT.map((type, i) => (
                <MenuItem value={type} key={i}>
                  {type}
                </MenuItem>
              ))}
            </Select>
          )}
          control={control}
        />
      </Box>
      <DialogActions className="button-group" sx={{ justifyContent: 'center' }}>
        <LoadingButton
          color="secondary"
          size="large"
          loading={isLoading}
          variant="contained"
          type="submit"
        >
          {t`translation:export`}
        </LoadingButton>
        <Button
          variant="outlined"
          color="info"
          size="large"
          sx={{ color: 'black', borderColor: 'black' }}
          onClick={onClose}
        >
          {t`translation:cancel`}
        </Button>
      </DialogActions>
    </form>
  );
};
export default ModalExport;

import { Box, Divider, Typography } from '@mui/material';
import { CommonLayout } from 'layouts/common';
import React, { useEffect, useState } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import DecoupledEditor from '@ckeditor/ckeditor5-build-decoupled-document';
import { TermsAPI } from 'apis/TermsOfUse/TermsOfUseAPI';
import { toast } from 'react-toastify';
import 'styles/ckcontent.scss';

const TermsOfUse = () => {
  const [site] = useState('vn');
  const [termValue, setTermValue] = useState('');

  useEffect(() => {
    getTermsOfUse();
  }, []);

  const getTermsOfUse = async () => {
    try {
      const res = await TermsAPI.getTermsOfUse({ key: site });
      setTermValue(res.data?.value);
    } catch (error) {
      toast.error('Có lỗi xảy ra !');
    }
  };

  return (
    <CommonLayout>
      <Box
        sx={{
          backgroundColor: '#fff',
          width: '90%',
          height: '100%',
          margin: '2rem auto 2rem auto',

          borderRadius: '10px'
        }}
      >
        <Box sx={{ pt: '3rem', width: '90%', margin: 'auto' }}>
          <Box
            sx={{
              marginBottom: '2rem'
            }}
          >
            <Typography fontWeight={700} alignSelf="flex-start" fontSize={29} lineHeight="140%">
              Điều khoản sử dụng
            </Typography>
          </Box>

          <Divider />
          <Box sx={{ padding: 3, overflowWrap: 'break-word' }}>
            <div className="ck-content">
              {termValue && <div dangerouslySetInnerHTML={{ __html: termValue }} />}
            </div>
          </Box>
          {/* <CKEditor editor={DecoupledEditor} data={termValue} disabled config={DecoupledEditor} /> */}
        </Box>
      </Box>
    </CommonLayout>
  );
};
export default TermsOfUse;

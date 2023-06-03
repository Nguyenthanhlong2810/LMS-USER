import { CommonLayout } from 'layouts/common';
import React, { useCallback, useState, useEffect } from 'react';
import { Box, Button, Typography, Grid, Avatar } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'store/configureStore';
import { Modal } from 'components';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import ModalExport from './ModalExport/ModalExport';
import { useNavigate, useParams } from 'react-router-dom';
import { CertificateAPI } from 'apis/Certificate/CertificateAPI';
import CircleIcon from '@mui/icons-material/Circle';
import { secondConvert } from 'utils';
import { Link } from 'react-router-dom';
import { ROUTE_PATH } from 'consts';
import { useGetProfile } from 'pages/Profile/Profile.query';

const CertificateDetail = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();

  const user = useAppSelector((state) => state.user);
  const { data: profile } = useGetProfile(user.id);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [data, setData] = useState({});
  const toggleModal = useCallback(() => setIsOpenModal((v) => !v), []);
  const handleDownload = () => {
    toggleModal();
  };

  useEffect(() => {
    if (id === 'null') {
      navigate('404');
    }
    getDetail();
  }, [id]);
  const getDetail = async () => {
    const params = { courseId: id };
    const data = await CertificateAPI.getDetail(params);
    if (data.data) setData(data?.data?.data);
  };
  const typePreview = data?.coursePathPreview?.split('.')?.at(-1);

  return (
    <CommonLayout>
      <Box sx={{ width: '95%', margin: 'auto', paddingBottom: '6.25rem' }}>
        <Box
          sx={{
            marginBottom: '2rem',
            borderBottom: '1px solid #E9E9E9',
            paddingBottom: '1rem'
          }}
        >
          <Typography fontWeight={700} fontSize={'1.5rem'}>
            {data?.myCertificationImageLink
              ? t`certificate:certification`
              : t`certificate:certificate-of-course-completion`}{' '}
          </Typography>
          <div style={{ width: '92%' }}>
            <Typography variant="span" color={'#457EFF'} fontWeight={700} fontSize={'1.5rem'}>
              {data?.courseName}
            </Typography>
          </div>
        </Box>
        <Box>
          <Grid container>
            <Grid
              item
              lg={3}
              sm={12}
              sx={{ border: '1px solid #E9E9E9', padding: '1.5rem', mb: 2 }}
            >
              <Grid container>
                <Grid item md={12} sm={6}>
                  <Typography
                    fontWeight={700}
                    fontSize={'1rem'}
                    lineHeight={'150%'}
                    sx={{ color: '#201B40' }}
                  >
                    {data?.myCertificationImageLink
                      ? t`certificate:certification-student`
                      : t`certificate:certificate-student`}
                  </Typography>
                  <Box sx={{ display: 'flex', margin: '1rem 0' }}>
                    <Avatar src={profile?.avatarUrl} sx={{ width: 32, height: 32 }}>
                      <PersonOutlineOutlinedIcon />
                    </Avatar>
                    <Typography sx={{ alignSelf: 'center', marginLeft: '0.625rem' }}>
                      {user?.fullname}
                    </Typography>
                  </Box>
                </Grid>
                <Grid item md={12} sm={6}>
                  <Typography
                    fontWeight={700}
                    fontSize={'1rem'}
                    lineHeight={'150%'}
                    sx={{ color: '#201B40' }}
                  >{t`certificate:course-information`}</Typography>
                  <Box sx={{ marginTop: '1rem' }}>
                    {typePreview === 'mp4' ? (
                      <video alt="preview" width={'100%'} src={data?.coursePathPreview} />
                    ) : (
                      <img
                        src={data?.coursePathPreview}
                        alt="coursePathPreview"
                        style={{ width: '100%', maxWidth: '18.9375rem', maxHeight: '13.5625rem' }}
                      />
                    )}
                    <Link
                      to={`${ROUTE_PATH.COURSE_INFORMATION}/${data?.courseId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <Typography
                        sx={{ margin: '0.75rem 0', color: '#457EFF' }}
                        fontWeight={700}
                        fontSize={'1rem'}
                        lineHeight={'150%'}
                      >
                        {data?.courseName}
                      </Typography>
                    </Link>

                    <Typography
                      sx={{ color: '#565771' }}
                      fontWeight={700}
                      fontSize={'0.75rem'}
                      lineHeight={'190%'}
                    >
                      {user?.fullname}
                    </Typography>
                    <Typography
                      fontWeight={500}
                      fontSize={'0.75rem'}
                      lineHeight={'190%'}
                      sx={{ display: 'flex', alignItems: 'center' }}
                    >
                      {secondConvert(data?.courseDuration)}
                      {/* {data?.courseDuration} {t`certificate:total-hour`} */}
                      <CircleIcon sx={{ fontSize: '0.3rem', margin: '0 0.5rem' }} />
                      {data?.courseContentTotal} {t`certificate:lesson`}
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item lg={9} sm={12} sx={{ textAlign: 'center' }}>
              <img
                style={{ width: '75%', objectFit: 'cover' }}
                src={data?.myCertificationImageLink || data?.myCertificateImageLink}
                alt="myCertificate"
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'end',
                  mt: '2.75rem'
                }}
              >
                <Button
                  className="icon-btn"
                  variant="contained"
                  size="large"
                  color="secondary"
                  onClick={handleDownload}
                >
                  <FileDownloadOutlinedIcon /> {t('translation:download')}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Modal
          isOpen={isOpenModal}
          title={t`certificate:export-file`}
          onClose={toggleModal}
          maxWidth={'xs'}
          PaperProps={{
            style: { borderRadius: '1.125rem' }
          }}
        >
          <ModalExport onClose={toggleModal} courseId={id} courseName={data?.courseName} />
        </Modal>
      </Box>
    </CommonLayout>
  );
};
export default CertificateDetail;

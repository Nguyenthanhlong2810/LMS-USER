import { Box, Button } from '@mui/material';
import FileDownloadOutlinedIcon from '@mui/icons-material/FileDownloadOutlined';
import { Modal } from 'components';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import ModalExport from 'pages/CertificateDetail/ModalExport/ModalExport';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useLoading } from 'hooks/LoadingProvider';
import { toast } from 'react-toastify';
import { CertificateAPI } from 'apis/Certificate/CertificateAPI';
import { httpStatus } from 'consts';
import { useAppSelector } from 'store/configureStore';

const CourseDetailCertificate = () => {
  const { t } = useTranslation();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = useCallback(() => setIsOpenModal((v) => !v), []);
  const handleDownload = () => {
    toggleModal();
  };
  const { hideLoading, showLoading } = useLoading();
  const { id } = useParams();
  const [previewCertificate, setPreviewCertificate] = useState();
  const courseDetail = useAppSelector((state) => state.courseDetail);

  useEffect(() => {
    getMyCertificate();
  }, []);

  const getMyCertificate = async () => {
    try {
      const params = {
        courseId: id
      };
      showLoading();
      const res = await CertificateAPI.preview(params);
      if (res.status === httpStatus.StatusOK) {
        setPreviewCertificate(res.data?.data);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    } finally {
      hideLoading();
    }
  };

  return (
    <Box>
      <div style={{ fontWeight: '700', lineHeight: '150%', padding: '1rem 0 0.563rem 0' }}>
        {previewCertificate?.messageTitle}
      </div>
      <div style={{ lineHeight: '1.575rem', whiteSpace: 'pre-line' }}>
        {previewCertificate?.message}
      </div>
      {previewCertificate?.certificateLink && (
        <>
          <Box sx={{ textAlign: 'center' }}>
            <img
              style={{ width: '50%' }}
              src={previewCertificate?.certificateLink}
              alt="myCertificateImg"
            />
          </Box>
          <Box sx={{ textAlign: 'center', mt: '2rem' }}>
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
        </>
      )}
      {previewCertificate && (
        <Modal
          isOpen={isOpenModal}
          title={t`certificate:export-file`}
          onClose={toggleModal}
          maxWidth={'xs'}
          PaperProps={{
            style: { borderRadius: '1.125rem' }
          }}
        >
          <ModalExport
            onClose={toggleModal}
            courseId={courseDetail?.lessonData?.id}
            courseName={courseDetail?.lessonData?.courseName}
          />
        </Modal>
      )}
    </Box>
  );
};

export default CourseDetailCertificate;

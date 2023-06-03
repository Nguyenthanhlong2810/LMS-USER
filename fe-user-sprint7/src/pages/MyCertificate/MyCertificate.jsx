import CircleIcon from '@mui/icons-material/Circle';
import { Box, Button, Typography } from '@mui/material';
import { CertificateAPI } from 'apis/Certificate/CertificateAPI';
import { CustomTable, Modal } from 'components';
import { DAY_FORMAT_NUMBER, ROUTE_PATH } from 'consts';
import dayjs from 'dayjs';
import { useTableState } from 'hooks/useTableState';
import { CommonLayout } from 'layouts/common';
import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import ModalExport from './ModalExport/ModalExport';
import SearchCertificate from './SearchCertificate/SearchCertificate';
import Title from './Title/Title';

const MyCertificate = () => {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const toggleModal = useCallback(() => setIsOpenModal((v) => !v), []);
  const handleDownload = () => {
    toggleModal();
  };
  const {
    data,
    loading,
    rowCount,
    pagination,
    setSearchParams,
    onSelectRow,
    selected,
    onPageChange,
    onPageSizeChange,
    onSelectAll,
    isSelectedAll
  } = useTableState(CertificateAPI, {});
  const { t } = useTranslation();

  const columns = [
    {
      field: 'index',
      minWidth: 20,
      maxWidth: 50
    },
    {
      field: 'coursePathPreview',
      minWidth: 200,
      renderCell: (params) => (
        <Box padding={2}>
          {params.row.coursePathPreview.endsWith('.mp4') ? (
            <video
              src={params.row.coursePathPreview}
              alt="preview"
              style={{ maxWidth: '10.56rem', maxHeight: '7.81rem' }}
            />
          ) : (
            <img
              src={params.row.coursePathPreview}
              alt="preview"
              style={{ maxWidth: '10.56rem', maxHeight: '7.81rem' }}
            />
          )}
        </Box>
      )
    },
    {
      field: 'subject',
      flex: 1,
      renderCell: (params) => (
        <Box sx={{ height: '100%', padding: 2 }}>
          <Typography fontWeight={300} fontSize={'0.75rem'} lineHeight={'160%'}>
            {t(`${params?.row?.courseType}`)} <CircleIcon sx={{ fontSize: '0.5rem' }} />
          </Typography>
          <Link
            to={`${ROUTE_PATH.COURSE_INFORMATION}/${params?.row?.courseId}`}
            style={{ textDecoration: 'none' }}
          >
            <Typography
              sx={{ fontWeight: '600', fontSize: '1rem', lineHeight: '170%', color: '#201B40' }}
            >
              {params?.row?.courseName}
            </Typography>
          </Link>
          {/* <Ellipsis
            line={2}
            style={{
              fontWeight: '300',
              fontSize: '0.875rem',
              lineHeight: '180%',
              color: '#565771'
            }}
          >
            {params?.row?.courseSummary}
          </Ellipsis> */}
          <Typography
            sx={{
              fontWeight: '300',
              fontSize: '0.875rem',
              lineHeight: '100%',
              color: '#565771',
              mt: '0.313rem'
            }}
          >
            <div>
              Loại: {params?.row?.certification ? 'Chứng chỉ' : 'Chứng nhận hoàn thành khoá học'}
            </div>
            <div style={{ marginTop: '0.313rem' }}>
              Ngày cấp:{' '}
              <span style={{ fontWeight: 600 }}>
                {' '}
                {params?.row?.completedDate &&
                  dayjs(params?.row?.completedDate).format(DAY_FORMAT_NUMBER)}
              </span>{' '}
              | Có giá trị đến:{' '}
              <span style={{ fontWeight: 600 }}>
                {' '}
                {params?.row?.completedDate &&
                  dayjs(params?.row?.completedDate).format(DAY_FORMAT_NUMBER)}
              </span>
            </div>
          </Typography>
        </Box>
      )
    },
    {
      field: 'action',
      minWidth: 150,
      renderCell: (params) => (
        <Link
          to={`${ROUTE_PATH.CERTIFICATE_DETAIL}/${params?.row?.courseId}`}
          style={{ textDecoration: 'none' }}
        >
          <Button variant="outlined" color="secondary">
            {params.row?.certification ? 'Xem chứng chỉ' : 'Xem chứng nhận'}
          </Button>
        </Link>
      )
    }
  ];
  return (
    <CommonLayout>
      <Box sx={{ width: '95%', margin: '0 auto' }}>
        <Title total={rowCount} />
        <SearchCertificate
          setSearchParams={setSearchParams}
          selected={selected}
          onSelectAll={onSelectAll}
          handleDownload={handleDownload}
          isSelectedAll={isSelectedAll}
        />
        <Box sx={{ marginTop: 3, marginBottom: '7.75rem' }}>
          <CustomTable
            rows={data}
            getRowId={(row) => row.courseId}
            columns={columns}
            loading={loading}
            checkboxSelection
            keepNonExistentRowsSelected
            onSelectionModelChange={onSelectRow}
            selectionModel={selected}
            onPageChange={onPageChange}
            onPageSizeChange={onPageSizeChange}
            rowCount={rowCount}
            getRowHeight={() => 'auto'}
            page={pagination.pageNo - 1}
            pageSize={pagination.pageSize}
            paginationMode="server"
            headerHeight={0}
          />
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
          <ModalExport onClose={toggleModal} courseId={selected} data={data} />
        </Modal>
      </Box>
    </CommonLayout>
  );
};
export default MyCertificate;

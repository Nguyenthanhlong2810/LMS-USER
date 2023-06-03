import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import SearchLearningHistory from './components/SearchCourse';
import { TitleAndLanguage, CustomTable } from 'components';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { DEFAULT_PAGESIZE, DAY_FORMAT_NUMBER } from 'consts';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import ProfileImg from 'assets/img/profile.png';
const ListCourseHistory = () => {
  const [data, setData] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('vn');
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: DEFAULT_PAGESIZE
  });
  const user = useSelector((state) => state.user);
  const onChangeLanguage = (e) => {
    setLanguage(e.target.value);
  };
  const getListData = async () => {
    try {
      setLoading(true);
      const data = await CourseAPI.getListHistoryFilter({
        userId: user?.id,
        ...pagination,
        ...searchParams
      });
      if (data.data) {
        const newData = data.data?.data?.items?.map((item, index) => {
          return { ...item, index: index + 1 };
        });
        setData(newData);
        setRowCount(data?.data?.data?.totalRecords);
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Something went wrong');
    }
  };
  const onPageSizeChange = (pageSize) => {
    setPagination({ pageNo: 1, pageSize });
  };
  const onPageChange = (page) => {
    setPagination({ ...pagination, pageNo: page + 1 });
  };
  useEffect(() => {
    getListData();
  }, [searchParams, pagination]);
  const columns = [
    {
      field: 'index',
      headerName: 'STT',
      minWidth: 34
    },
    {
      field: 'courseTypeName',
      headerName: 'Nội dung',
      minWidth: 286,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', margin: '6px 0' }}>
            <img src={ProfileImg} alt={params?.row?.name} width="53px" height="53px" />
            <Box sx={{ marginLeft: '1.125rem' }}>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '1rem',
                  lineHeight: '1.125rem',
                  color: '#457EFF'
                }}
              >
                {params?.row?.name}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  lineHeight: '130%'
                }}
              >
                {params?.row?.courseTypeName}
              </Typography>
              <Typography
                sx={{
                  fontWeight: '700',
                  fontSize: '0.75rem',
                  lineHeight: '130%'
                }}
              >
                Người giảng dạy
              </Typography>
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  lineHeight: '130%',
                  color: '#66788A'
                }}
              >
                Địa điểm
              </Typography>
              <Typography
                sx={{
                  fontWeight: '500',
                  fontSize: '0.875rem',
                  lineHeight: '130%',
                  color: '#66788A'
                }}
              >
                Ngày bắt đầu:{' '}
                {params?.row?.startedDate &&
                  dayjs(params?.row?.startedDate).format(DAY_FORMAT_NUMBER)}
              </Typography>
            </Box>
          </Box>
        );
      }
    },
    {
      field: 'lastUpdate',
      headerName: 'Tiến độ',
      minWidth: 250,
      renderCell: (params) => {
        const progress = Number(params?.row?.courseProgress?.replace('%', ''));
        return (
          <Box sx={{ width: '100%', textAlign: 'center' }}>
            <Typography>{params?.row?.courseProgress}</Typography>
            <LinearProgress variant="determinate" value={progress} />
          </Box>
        );
      }
    },
    {
      field: 'dueDate',
      headerName: 'Thời hạn ',
      minWidth: 232,
      renderCell: (params) => {
        if (!params?.row?.dueDate) return '';
        return (
          <Box sx={{}}>
            <Typography
              sx={{
                fontWeight: '400',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                color: '#66788A'
              }}
            >
              {params?.row?.dueDate && dayjs(params?.row?.dueDate).format(DAY_FORMAT_NUMBER)}
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '0.75rem',
                lineHeight: '169%',
                color: '#1FBDF8'
              }}
            >
              còn lại {params?.row?.remainingTime ? params?.row?.remainingTime : 0} ngày
            </Typography>
          </Box>
        );
      }
    },
    {
      field: 'statusCourse',
      headerName: 'trạng thái',
      minWidth: 232,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color: '#66788A'
            }}
          >
            {params?.row?.statusCourse === 'COMPLETED'
              ? 'Đã hoàn thành'
              : params?.row?.statusCourse === 'UNCOMPLETED'
              ? 'Chưa hoàn thành'
              : 'Quá hạn'}
          </Typography>
        );
      }
    },
    {
      field: 'typeAssign',
      headerName: 'loại khoá học',
      minWidth: 232,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color: '#66788A'
            }}
          >
            {params?.row?.typeAssign === 'COMPULSORY' ? 'Bắt buộc' : 'Tuỳ chọn'}
          </Typography>
        );
      }
    }
  ];
  return (
    <>
      <Box>
        <TitleAndLanguage
          title="danh sách"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchLearningHistory setSearchParams={setSearchParams} />
      </Box>
      <Box sx={{ marginTop: 3, marginBottom: '7.75rem' }}>
        <CustomTable
          rows={data}
          getRowId={(row) => row.index}
          columns={columns}
          getRowHeight={() => 'auto'}
          loading={loading}
          onPageChange={onPageChange}
          onPageSizeChange={onPageSizeChange}
          rowCount={rowCount}
          page={pagination.pageNo - 1}
          pageSize={pagination.pageSize}
          paginationMode="server"
        />
      </Box>
    </>
  );
};
export default ListCourseHistory;

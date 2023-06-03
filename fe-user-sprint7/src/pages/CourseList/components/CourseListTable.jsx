import { Box, LinearProgress, MenuItem, Select, Typography } from '@mui/material';
import { CourseAPI } from 'apis/Course/CourseAPI';
import ProfileImg from 'assets/img/profile.png';
import { CustomTable, TitleAndLanguage } from 'components';
import { DAY_FORMAT_NUMBER, DEFAULT_PAGESIZE } from 'consts';
import { ROUTE_PATH } from 'consts/system.const';
import dayjs from 'dayjs';
import SearchLearningHistory from 'pages/LearningHistory/ListCourseHistory/components/SearchCourse';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/configureStore';
import { TypographyStyled } from '../style';

const CourseListTable = () => {
  const [searchParams, setSearchParams] = useState({});
  const user = useAppSelector((state) => state.user);
  const [data, setData] = useState([]);
  const [rowCount, setRowCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState('vn');
  const [pagination, setPagination] = useState({
    pageNo: 1,
    pageSize: DEFAULT_PAGESIZE
  });

  // const courseChartLabel = `${courseChartData.completedCourse}/${courseChartData.total}`;

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

  const isExpired = (date) => dayjs().isAfter(dayjs(date), 'day');

  useEffect(() => {
    getListData();
  }, [searchParams, pagination]);
  const columns = [
    // {
    //   field: 'index',
    //   headerName: 'STT',
    //   minWidth: 34
    // },
    {
      field: 'courseTypeName',
      sortable: false,
      headerName: 'Nội dung',
      minWidth: 286,
      flex: 1,
      renderCell: (params) => {
        return (
          <Box sx={{ display: 'flex', margin: '6px 0' }}>
            <img src={ProfileImg} alt="Avatar profile" width="53px" height="53px" />
            <Box sx={{ marginLeft: '1.125rem' }}>
              <Link
                to={`${ROUTE_PATH.COURSE_DETAIL}/${params?.row?.courseId}`}
                style={{ textDecoration: 'none' }}
              >
                <TypographyStyled>{params?.row?.name}</TypographyStyled>
              </Link>

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
      sortable: false,
      headerName: 'Tiến độ',
      minWidth: 270,
      renderCell: (params) => {
        const progress = Number(params?.row?.courseProgress?.replace('%', ''));
        return (
          <Box sx={{ width: '90%', textAlign: 'center', marginRight: '10px' }}>
            <Typography>{params?.row?.courseProgress}</Typography>
            <LinearProgress
              variant={'determinate'}
              value={progress}
              color={
                params?.row?.dueDate && isExpired(params.row.dueDate) && progress !== 100
                  ? 'error'
                  : 'secondary'
              }
            />
          </Box>
        );
      }
    },
    {
      sortable: false,
      field: 'dueDate',
      headerName: 'Thời hạn ',
      minWidth: 160,
      renderCell: (params) => {
        // if (!params?.row?.dueDate) return '';
        return (
          <Box>
            <Typography
              sx={{
                fontWeight: '700',
                fontSize: '0.875rem',
                lineHeight: '1.25rem',
                color: '#201B40'
              }}
            >
              {params?.row?.dueDate
                ? dayjs(params?.row?.dueDate).format(DAY_FORMAT_NUMBER)
                : 'Không thời hạn'}
            </Typography>
            <Typography
              sx={{
                fontWeight: '500',
                fontSize: '0.75rem',
                lineHeight: '169%',
                color: '#AFAFAF'
              }}
            >
              {params?.row?.dueDate ? `còn lại ${params?.row?.remainingTime ?? 0} ngày` : ''}
              {/* còn lại {params?.row?.remainingTime ?? 0} ngày */}
            </Typography>
          </Box>
        );
      }
    },
    {
      sortable: false,
      field: 'statusCourse',
      headerName: 'trạng thái',
      minWidth: 160,
      renderCell: (params) => {
        return (
          <Typography
            sx={{
              fontWeight: '400',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
              color: '#201B40'
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
      sortable: false,
      field: 'action',
      headerName: 'Thao tác',
      minWidth: 180,
      renderCell: (params) => {
        return (
          <Select size="small" sx={{ width: '190px' }}>
            <MenuItem value="request">Yêu cầu học lại</MenuItem>
            <MenuItem value="unsubscribe">Hủy đăng ký</MenuItem>
            {(!params?.row?.dueDate || !isExpired(params?.row?.dueDate)) && (
              <Link
                to={`${ROUTE_PATH.COURSE_INFORMATION}/${params?.row?.courseId}`}
                style={{ textDecoration: 'none' }}
              >
                <MenuItem value="start" sx={{ color: '#212121' }}>
                  Bắt đầu học
                </MenuItem>
              </Link>
            )}
          </Select>
        );
      }
    }
    // {
    //   field: 'typeAssign',
    //   headerName: 'loại khoá học',
    //   minWidth: 232,
    //   renderCell: (params) => {
    //     return (
    //       <Typography
    //         sx={{
    //           fontWeight: '400',
    //           fontSize: '0.875rem',
    //           lineHeight: '1.25rem',
    //           color: '#66788A'
    //         }}
    //       >
    //         {params?.row?.typeAssign === 'COMPULSORY' ? 'Bắt buộc' : 'Tuỳ chọn'}
    //       </Typography>
    //     );
    //   }
    // }
  ];
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        borderRadius: '7px',
        p: ' 1.5rem',
        mt: '1.875rem'
      }}
    >
      <Box>
        <TitleAndLanguage
          title="danh sách"
          language={language}
          onChangeLanguage={onChangeLanguage}
        />
        <SearchLearningHistory setSearchParams={setSearchParams} />
      </Box>
      <Box sx={{ marginTop: 3 }}>
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
          height="750px"
        />
      </Box>
    </Box>
  );
};

export default CourseListTable;

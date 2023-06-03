import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { Avatar, Box } from '@mui/material';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { ArcElement, Chart as ChartJS, Legend } from 'chart.js';
import { DEFAULT_PAGE_PARAMS } from 'consts/system.const';
import dayjs from 'dayjs';
import { useGetProfile } from 'pages/Profile/Profile.query';
import { useEffect, useMemo, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppSelector } from 'store/configureStore';
import {
  BackgroundStyled,
  BoxUserHeaderStyled,
  DoughnutChartStyled,
  FlexChartDetailStyled,
  UserInfoStyled
} from '../style';
import { options } from './CourseListDoughnutChart';

ChartJS.register(ArcElement, Legend);

const UserHeader = () => {
  const [searchParams, setSearchParams] = useState({});
  const [chartCourse, setChartCourse] = useState({ data: { datasets: [] } });

  const [chartCertificate, setChartCertificate] = useState({
    data: { datasets: [] }
  });
  const user = useAppSelector((state) => state.user);
  const { data: profile } = useGetProfile(user.id);
  const [courseList, setCourseList] = useState([]);
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    // doneCourses / courses
    setChartCourse({
      data: {
        datasets: [
          {
            data:
              ((courseList?.expiredCourse === courseList?.uncompletedCourse) ===
                courseList?.completedCourse) ===
              0
                ? [1, 1, 1]
                : [
                    courseList?.completedCourse,
                    courseList?.uncompletedCourse,
                    courseList?.expiredCourse
                  ],
            backgroundColor: ['#55C763', '#FFDF5C', '#FF7373'],
            borderWidth: 0
          }
        ]
      }
    });

    // certificates / course
    setChartCertificate({
      data: {
        datasets: [
          {
            data:
              (courseList?.totalAwardedCertifications === courseList?.totalCertifications) === 0
                ? [0, 1]
                : [
                    courseList?.totalAwardedCertifications,
                    courseList?.totalCertifications - courseList?.totalAwardedCertifications
                  ],
            backgroundColor: ['#55C763', '#E9E9E9'],
            borderWidth: 0
          }
        ]
      }
    });
  }, [courseList]);

  useEffect(() => {
    getProcessUserCourses();
  }, [searchParams]);

  const getProcessUserCourses = async () => {
    try {
      const params = {
        // ...DEFAULT_PAGE_PARAMS,
        // ...searchParams,
        userId: user.id
      };

      const res = await CourseAPI.getProcessUserCourses(params);
      setCourseList(res?.data?.data);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const avatarNameWord = profile?.fullname?.split(/\s+/g).at(-1)[0];

  return (
    <BoxUserHeaderStyled>
      <div style={{ padding: '24px', display: 'flex', alignItems: 'stretch' }}>
        <BackgroundStyled style={{ width: '22rem' }}>
          <UserInfoStyled>
            <Avatar
              alt="Remy Sharp"
              src={profile?.avatarUrl}
              sx={{
                width: 80,
                height: 80
              }}
            >
              <Box
                sx={{
                  display: 'inline-block',
                  ':first-letter': {
                    textTransform: 'capitalize'
                  }
                }}
              >
                {avatarNameWord}
              </Box>
            </Avatar>
            <div>
              <div id="name">{profile?.fullname}</div>
              <div id="job">{profile?.position}</div>
            </div>
          </UserInfoStyled>
        </BackgroundStyled>
        <BackgroundStyled>
          <DoughnutChartStyled>
            <div id="name-chart">Khóa học</div>
            <Doughnut
              id="doughnut-chart"
              data={chartCourse.data && chartCourse.data}
              options={options}
            />
            <div style={{ marginTop: '0.75rem' }}>
              {chartCourse?.data?.datasets[0]?.backgroundColor &&
                chartCourse.data.datasets[0].backgroundColor?.map((item, index) => (
                  <FlexChartDetailStyled key={index}>
                    <div>
                      <FiberManualRecordIcon
                        sx={{
                          color: item,
                          mr: '6px'
                        }}
                        fontSize="15px"
                      />
                      <span>
                        {item === '#FF7373'
                          ? 'Quá hạn'
                          : item === '#FFDF5C'
                          ? 'Chưa hoàn thành'
                          : 'Đã hoàn thành'}
                      </span>
                    </div>
                    <div>{chartCourse.data.datasets[0].data[index]}</div>
                  </FlexChartDetailStyled>
                ))}
            </div>
          </DoughnutChartStyled>
        </BackgroundStyled>
        <BackgroundStyled>
          <DoughnutChartStyled>
            <div id="name-chart">Chứng chỉ</div>
            <Doughnut
              id="doughnut-chart"
              data={chartCertificate.data && chartCertificate.data}
              options={options}
              onClick={() => navigate('/my-certificate')}
            />
            <div style={{ marginTop: '0.75rem' }}>
              {chartCertificate?.data?.datasets[0]?.backgroundColor &&
                chartCertificate.data.datasets[0].backgroundColor?.map((item, index) => (
                  <FlexChartDetailStyled key={index}>
                    <div>
                      <FiberManualRecordIcon
                        sx={{
                          color: item,
                          mr: '6px'
                        }}
                        fontSize="15px"
                      />
                      <span>{item === '#55C763' ? 'Đã được cấp' : 'Còn lại'}</span>
                    </div>
                    <div>{chartCertificate.data.datasets[0].data[index]}</div>
                  </FlexChartDetailStyled>
                ))}
            </div>
          </DoughnutChartStyled>
        </BackgroundStyled>
      </div>
    </BoxUserHeaderStyled>
  );
};

export default UserHeader;

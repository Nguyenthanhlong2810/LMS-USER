import { Box, Grid } from '@mui/material';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import { CourseAPI } from 'apis/Course/CourseAPI';
import { ExperiencesAPI } from 'apis/Experiences';
import { SkillsAPI } from 'apis/Skills';
import Search from 'components/SearchCourse/SearchCourse';
import { DEFAULT_PAGESIZE, httpStatus } from 'consts';
import { useLoading } from 'hooks/LoadingProvider';
import { CommonLayout } from 'layouts/common';
import { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import CourseSearchResult from './components/CourseSearchResult';
import CourseFilterSideBar from './components/CourseSearchSideBar';

const CourseSearch = () => {
  const { t } = useTranslation();
  const { showLoading, hideLoading } = useLoading();
  const [courseFilter, setCourseFilter] = useState([]);
  const [skills, setSkills] = useState();
  const [experiences, setExperiences] = useState();
  const [category, setCategory] = useState();
  const [filterBar, setFilterBar] = useState([
    {
      title: 'Chủ đề',
      type: 'topics',
      expanded: false,
      showMore: false
    },
    {
      title: 'Kinh nghiệm làm việc',
      type: 'experiences',
      expanded: false,
      showMore: false
    },
    {
      title: 'Kỹ năng',
      type: 'skills',
      expanded: false,
      showMore: false
    }
  ]);
  const [searchParams] = useSearchParams();
  let name = searchParams.get('name');
  let topics = searchParams.get('topics');
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [totalRecords, setTotalRecords] = useState();
  const [checkedFilter, setCheckedFilter] = useState({
    topics: [],
    skills: [],
    experiences: []
  });
  const debounceRef = useRef();

  useEffect(() => {
    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }
    debounceRef.current = setTimeout(() => {
      getCourseFilter({ name: name });
    }, 500);
  }, [page, pageSize, name, checkedFilter]);

  useEffect(() => {
    setCheckedFilter({
      ...checkedFilter,
      topics: [topics]
    });
    setPage(1);
  }, [topics]);

  useEffect(() => {
    getSkills();
    getExperiences();
    getCategoryTraining();
  }, []);

  const handleExpandClick = (index) => {
    const filterNew = filterBar;
    filterNew[index].expanded = !filterNew[index].expanded;
    setFilterBar([...filterNew]);
  };
  const handleShowMoreClick = (index) => {
    const filterNew = filterBar;
    filterNew[index].showMore = !filterNew[index].showMore;
    setFilterBar([...filterNew]);
  };
  const getCourseFilter = async (data) => {
    const params = {
      name: data.name || '',
      topics: (checkedFilter?.topics ?? []).join(','),
      experiences: (checkedFilter?.experiences ?? []).join(','),
      skills: (checkedFilter?.skills ?? []).join(','),
      pageNo: data.pageNo || page,
      pageSize: pageSize ?? 5
    };
    try {
      showLoading();
      const res = await CourseAPI.getCourseFilter(params);
      if (res.data.data.status === httpStatus.StatusOK) {
        setCourseFilter(res.data.data?.data?.data?.items);
        setTotalRecords(res?.totalRecords);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    } finally {
      hideLoading();
      clearTimeout(debounceRef.current);
    }
  };
  const getSkills = async (data) => {
    try {
      const res = await SkillsAPI.filterAll(data);
      if (res.data.status === httpStatus.StatusOK) {
        setSkills(res.data.data);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const getExperiences = async (data) => {
    try {
      const res = await ExperiencesAPI.filterAll(data);
      if (res.data.status === httpStatus.StatusOK) {
        setExperiences(res.data.data);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const getCategoryTraining = async (data) => {
    try {
      const res = await CategoryTrainingAPI.filterAll({ language: 'vn', ...data });
      if (res.data.status === httpStatus.StatusOK) {
        setCategory(res.data.data?.data);
      }
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };
  const handlePageChange = (event, value) => {
    setPage(value + 1);
  };

  const handlePageSizeChange = (event) => {
    setPageSize(parseInt(event.target.value, 10));
    setPage(1);
  };

  const handleCheckedChange = (event, type) => {
    const newCheck = checkedFilter;
    event.target.checked
      ? (newCheck[type] = [...newCheck[type], event.target.name])
      : (newCheck[type] = newCheck[type].filter((item) => item !== event.target.name));
    setPage(1);
    setCheckedFilter({ ...newCheck });
  };
  const result = totalRecords ? new Intl.NumberFormat('en-IN').format(totalRecords) : '0';

  return (
    <CommonLayout>
      <Box sx={{ width: '95%', margin: 'auto', paddingBottom: '6.25rem' }}>
        <Search params={name} result={result} getSearchCourse={getCourseFilter} setPage={setPage} />
        <Grid container spacing={2}>
          <Grid item xs={3} rowSpacing={2}>
            {filterBar.map((item, index) => (
              <CourseFilterSideBar
                key={index}
                title={item.title}
                index={index}
                type={item.type}
                list={
                  item.type === 'topics'
                    ? category
                    : item.type === 'experiences'
                    ? experiences
                    : skills
                }
                handleExpandClick={handleExpandClick}
                handleShowMoreClick={handleShowMoreClick}
                handleCheckedChange={handleCheckedChange}
                expanded={item.expanded}
                showMore={item.showMore}
                checkedFilter={checkedFilter[item.type]}
              />
            ))}
          </Grid>
          <Grid item xs={9}>
            <CourseSearchResult
              courseFilter={courseFilter}
              page={page - 1}
              pageSize={pageSize}
              totalRecords={totalRecords}
              handlePageChange={handlePageChange}
              handlePageSizeChange={handlePageSizeChange}
            />
          </Grid>
        </Grid>
      </Box>
    </CommonLayout>
  );
};

export default CourseSearch;

import React, { useState } from 'react';
import { Grid, MenuItem, Select } from '@mui/material';
import { formatReq } from 'helpers';
import { Controller, useForm } from 'react-hook-form';
import { FormControl } from 'components/FormControl/FormControl';
import { GroupButtonSearch } from 'components/GroupButton/GroupButtonSearch';
import { CategoryTrainingAPI } from 'apis/CategoryTraining';
import { useEffect } from 'react';

const defaultValues = { status: 'all', category: 'all', courseType: 'all', progressStatus: 'all' };
export const COURSE_STATUS = [
  { value: true, label: 'Đang hoạt động' },
  { value: false, label: 'Không hoạt động' }
];
const ORDER_FILTER = [
  {
    value: 'most_recent',
    label: 'Truy cập gần nhất'
  },
  {
    value: 'a-z',
    label: 'Hiển thị A->Z'
  }
];
const PROGRESS_FILTER = [
  {
    value: 'NOT_STARTED',
    label: 'Chưa bắt đầu'
  },
  {
    value: 'UNCOMPLETED',
    label: 'Đang học'
  },
  {
    value: 'COMPLETED',
    label: 'Đã hoàn thành'
  }
];

const COURSE_TYPE = [
  {
    value: 'COMPULSORY',
    label: 'Bắt buộc'
  },
  {
    value: 'VOLUNTARY',
    label: 'Tùy chọn'
  }
];

export default function SearchCourseList({ setSearchParams }) {
  const { handleSubmit, control, register, reset } = useForm({
    defaultValues: defaultValues
  });
  const [categories, setCategories] = useState([]);

  function handleSearch(values) {
    setSearchParams({ ...formatReq(values) });
  }
  function handleReset() {
    reset();
    setSearchParams({ ...formatReq(defaultValues) });
  }

  useEffect(() => {
    getAllCategories();
  }, []);

  async function getAllCategories() {
    try {
      const res = await CategoryTrainingAPI.get();
      if (res?.data) {
        setCategories(res.data.data.items);
      }
    } catch (error) {}
  }

  return (
    <form onSubmit={handleSubmit(handleSearch)}>
      <Grid container direction="row" justifyContent="start" alignItems="flex-end" spacing={2}>
        <Grid item xs={2.5}>
          <FormControl label="Lọc theo" padding={0}>
            <Controller
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {ORDER_FILTER.map((c, i) => (
                    <MenuItem value={c.value} key={i}>
                      {c.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl label="Hạng mục" padding={0}>
            <Controller
              name="category"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {categories.map((c, i) => (
                    <MenuItem value={c.id} key={i}>
                      {c.name}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl label="Tiến độ" padding={0}>
            <Controller
              name="progressStatus"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {PROGRESS_FILTER.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <Grid item xs={2.5}>
          <FormControl label="Loại khóa học" padding={0}>
            <Controller
              name="courseType"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {COURSE_TYPE.map((type, i) => (
                    <MenuItem value={type.value} key={i}>
                      {type.label}
                    </MenuItem>
                  ))}
                </Select>
              )}
              control={control}
            />
          </FormControl>
        </Grid>
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
}

import React, { useState } from 'react';
import { Grid, TextField, Select, MenuItem } from '@mui/material';
import { FormControl, GroupButtonSearch } from 'components';
import { formatReq } from 'helpers';
import { useForm } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { DUE_SELECT, PROGRESS_STATUS } from 'consts/system.const';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import { toast } from 'react-toastify';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const schema = yup.object({
  beforeDate: yup
    .string()
    .nullable()
    .test(
      'beforeDate',
      'Ngày được nhập không đúng định dạng, vui lòng nhập thời gian theo định dạng dd/mm/yyyy',
      function (value) {
        if (value) {
          const a = dayjs(dayjs(value).format('DD/MM/YYYY'), 'DD/MM/YYYY').isValid();
          return a;
        } else return true;
      }
    ),
  // .when('afterDate', (afterDate, schema) => {
  //   if (afterDate) {
  //     debugger;
  //     // const dayAfter = dayjs(afterDate).add(1, 'day');
  //     const a = schema.min(dayjs(afterDate));
  //     return schema.min(dayjs(afterDate), 'Ngày kết thúc phải sau ngày bắt đầu');
  //   }

  //   return schema;
  // })
  afterDate: yup
    .string()
    .nullable()
    .test(
      'afterDate',
      'Ngày được nhập không đúng định dạng, vui lòng nhập thời gian theo định dạng dd/mm/yyyy',
      function (value) {
        if (value) {
          const a = dayjs(dayjs(value).format('DD/MM/YYYY'), 'DD/MM/YYYY').isValid();
          return a;
        } else return true;
      }
    )
});
const defaultValues = {
  status: 'all',
  progressStatus: 'all',
  courseName: '',
  courseType: 'all',
  afterDate: null,
  beforeDate: null
};
const SearchLearningHistory = ({ setSearchParams }) => {
  const [dueTime, setDueTime] = useState('all');
  const [afterDate, setAfterDate] = useState(null);
  const [beforeDate, setBeforeDate] = useState(null);

  const {
    handleSubmit,
    register,
    reset,
    control,
    unregister,
    formState: { errors }
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema)
  });

  function handleSearch(values) {
    if (values?.afterDate) {
      // values.afterDate = values.afterDate.toISOString();
      values.afterDate = dayjs(values.afterDate).toISOString();
    }
    if (values?.beforeDate) {
      values.beforeDate = dayjs(values.beforeDate).toISOString();
    }
    if (values?.status === 'all') {
      delete values?.afterDate;
      delete values?.beforeDate;
    }
    if (values?.status === 'indefinite') {
      delete values?.afterDate;
      delete values?.beforeDate;
      values.indefinite = 'INDEFINITE';
    }

    if (values?.status === 'before') {
      delete values?.afterDate;
    }
    if (values?.status === 'after') {
      delete values?.beforeDate;
    }
    if (values?.progressStatus === 'all') {
      values.progressStatus = '';
    }
    setSearchParams({ ...formatReq(values) });
  }
  function handleReset() {
    reset();
    defaultValues.afterDate = null;
    setDueTime('all');
    setAfterDate(null);
    setBeforeDate(null);
    setSearchParams({ ...formatReq(defaultValues) });
  }

  const checkDueTime = () => {
    if (dueTime === 'before') {
      unregister('afterDate');
    }
    if (dueTime === 'after') {
      unregister('beforeDate');
    }
    if (dueTime === 'all' || dueTime === 'indefinite') {
      unregister('afterDate');
      unregister('beforeDate');
    }
  };

  const onError = () => {
    console.log(errors);
    errors?.beforeDate && toast.error(errors?.beforeDate.message);
    errors?.afterDate && toast.error(errors?.afterDate.message);
  };

  return (
    <form onSubmit={handleSubmit(handleSearch, onError)}>
      <Grid
        container
        // justifyContent="space-between"
        alignItems="flex-end"
        spacing={2}
      >
        <Grid item md={3}>
          <FormControl label="Nội dung" padding={0}>
            <TextField
              {...register('courseName')}
              placeholder="Nhập tên nội dung"
              inputProps={{
                maxLength: 50
              }}
            />
          </FormControl>
        </Grid>
        {/* <Grid item md={2}>
          <FormControl label="Loại" padding={0}>
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
        </Grid> */}
        <Grid item md={2}>
          <FormControl label="Trạng thái" padding={0}>
            <Controller
              name="progressStatus"
              render={({ field: { value, onChange } }) => (
                <Select value={value} onChange={onChange}>
                  <MenuItem value="all">Tất cả</MenuItem>
                  {PROGRESS_STATUS.map((type, i) => (
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
        <Grid item md={2}>
          <FormControl label="Thời hạn" padding={0}>
            <Controller
              name="status"
              render={({ field: { value, onChange } }) => (
                <Select
                  value={value}
                  onChange={(event) => {
                    setDueTime(event.target.value);
                    onChange(event.target.value);
                  }}
                >
                  <MenuItem value="all">Tất cả</MenuItem>
                  {DUE_SELECT.map((type, i) => (
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
        {['after', 'range'].includes(dueTime) && (
          <Grid item md={2}>
            <FormControl label="" padding={0}>
              <Controller
                name={'afterDate'}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value}
                    onChange={(value) => {
                      checkDueTime();
                      setAfterDate(value);
                      onChange(value);
                    }}
                    inputFormat="DD/MM/YYYY"
                    maxDate={dueTime === 'range' ? dayjs(beforeDate) : undefined}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
                control={control}
              />
            </FormControl>
          </Grid>
        )}

        {(dueTime === 'range' || dueTime === 'before') && (
          <Grid item md={2}>
            <FormControl label="" padding={0}>
              <Controller
                name={'beforeDate'}
                render={({ field: { value, onChange } }) => (
                  <DatePicker
                    value={value}
                    onChange={(value) => {
                      checkDueTime();
                      setBeforeDate(value);
                      onChange(value);
                    }}
                    disabled={dueTime === 'range' && !Boolean(afterDate)}
                    inputFormat="DD/MM/YYYY"
                    minDate={dueTime === 'range' ? dayjs(afterDate) : undefined}
                    renderInput={(params) => <TextField {...params} />}
                  />
                )}
                control={control}
              />
            </FormControl>
          </Grid>
        )}
        <GroupButtonSearch handleReset={handleReset} />
      </Grid>
    </form>
  );
};

export default SearchLearningHistory;

import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material';
import { useAppSelector } from 'store/configureStore';
import { DatePicker } from 'components/DatePicker/DatePicker';
import { useGetAccountIntroSetting } from 'pages/AccountIntro/AccountIntro.query';
import { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useGetProfile, useUpdateProfile } from '../Profile.query';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useLoading } from 'hooks/LoadingProvider';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMemo } from 'react';
import { InputWithLabel } from 'components/InputWithLabel/InputWithLabel';
import AvatarUpload from './AvatarUpload';
import dayjs from 'dayjs';
import { IMAGE_ACCEPT } from 'consts';

const phoneNumberRegex = /^[0]\d{8,}$/g;

export const ProfileForm = () => {
  const { t } = useTranslation();
  const user = useAppSelector((state) => state.user);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useLoading();
  const { data: dataAdmin } = useGetAccountIntroSetting();
  const { data: profile } = useGetProfile(user.id);
  const { mutate: updateProfile } = useUpdateProfile(user.username);
  const [avatar, setAvatar] = useState(null);

  const validatationSchema = Yup.object({
    phoneNumber: Yup.string()
      .required('Trường này không thể bỏ trống')
      .nullable()
      .matches(phoneNumberRegex, 'Số điện thoại không đúng định dạng'),
    experiences: Yup.object().nullable().required('Trường không thể bỏ trống'),
    skillsInteresting: Yup.array()
      .min(1, 'Trường không thể bỏ trống')
      .max(5, 'Bạn đã vượt quá số lựa chọn cho phép')
  });

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
    setFocus
  } = useForm({ resolver: yupResolver(validatationSchema) });

  const experiences = dataAdmin?.data?.data?.experiences?.map((c) => ({
    label: c.name,
    id: c.id
  }));

  const skills = dataAdmin?.data?.data?.skills?.map((c) => ({
    label: c.name,
    id: c.id
  }));

  const onSubmit = async (data) => {
    const submitData = { ...data };
    ['managerName', 'facebook', 'learningPath']?.forEach(
      (c) => (submitData[c] = submitData[c]?.trim())
    );
    submitData.experiences = [
      dataAdmin?.data?.data?.experiences?.find((c) => c?.id === data?.experiences?.id)
    ];
    submitData.skillsInteresting = submitData?.skillsInteresting?.map((c) => ({ id: c.id }));
    submitData.birthdate = submitData?.birthdate
      ? dayjs(submitData?.birthdate)?.format('DD/MM/YYYY')
      : null;
    showLoading();
    await updateProfile({ ...submitData, avatar: typeof avatar === 'string' ? null : avatar });
    hideLoading();
  };

  const handlePhoneNumber = (e, onChange) => {
    const value = e.target.value;
    onChange(value.length > 13 ? value.slice(0, 13) : value);
  };

  useEffect(() => {
    if (profile) {
      profile.experiences =
        profile.experiences && profile.experiences[0]
          ? {
              label: profile.experiences[0].name,
              id: profile.experiences[0].id
            }
          : null;

      profile.skillsInteresting = profile.skillsInteresting
        ? profile.skillsInteresting.map((c) => ({
            label: c.name,
            id: c.id
          }))
        : [];
      setAvatar(profile.avatarUrl);
      profile.birthdate = dayjs(profile?.birthdate, 'DD/MM/YYYY', true).isValid()
        ? dayjs(profile?.birthdate, 'DD/MM/YYYY')
        : dayjs(profile?.birthdate);

      reset(profile);
    }
  }, [profile, reset]);

  useEffect(() => {
    const firstError = Object.keys(errors)[0];
    if (['phoneNumber', 'experiences', 'skillsInteresting'].includes(firstError)) {
      setFocus(firstError);
    }
  }, [errors]);

  const profileAvatarName = useMemo(() => {
    if (profile?.fullname) {
      const words = profile.fullname.trim().split(/\s+/);
      return words?.at(-1)[0]?.toUpperCase();
    }
    return 'USER';
  }, [profile]);
  if (!profile) return 'Loading...';

  const MIN_DIMENSIONS_IMAGE = {
    width: 170,
    height: 170
  };

  return (
    <Box p={4} display="flex">
      <Box textAlign="center">
        <AvatarUpload
          setAvatar={setAvatar}
          avatar={avatar}
          avatarName={profileAvatarName}
          accept={IMAGE_ACCEPT}
          acceptDimensions={MIN_DIMENSIONS_IMAGE}
          maxSize={5}
        />

        <Typography fontWeight={300} fontSize={16} color="#5D5A6F">
          {t`profile:my-profile.your-avatar`}
        </Typography>
      </Box>
      <Box
        component="form"
        display="flex"
        flexDirection="column"
        gap={3}
        maxWidth={422}
        width="100%"
        onSubmit={handleSubmit(onSubmit)}
      >
        <InputWithLabel label={t`profile:my-profile.full-name`}>
          <TextField disabled {...register('fullname', { required: true })} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.email-cmc`}>
          <TextField disabled {...register('email', { required: true })} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.division`}>
          <TextField disabled {...register('division')} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.department`}>
          <TextField disabled {...register('department')} />
        </InputWithLabel>
        <InputWithLabel required label={t`profile:my-profile.date-of-birth`}>
          <Controller
            control={control}
            render={({ field: { onChange, value } }) => (
              <DatePicker onChange={onChange} value={dayjs(value)} />
            )}
            name="birthdate"
          />
        </InputWithLabel>
        <InputWithLabel required label={t`profile:my-profile.phone-number`}>
          <Controller
            control={control}
            render={({ field: { ref, onChange, value } }) => (
              <TextField
                value={value}
                inputRef={ref}
                onChange={(e) => handlePhoneNumber(e, onChange)}
                error={Boolean(errors.phoneNumber)}
                helperText={errors.phoneNumber?.message}
              />
            )}
            name="phoneNumber"
          />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.site`}>
          <TextField disabled {...register('site')} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.position`}>
          <TextField disabled {...register('position')} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.manager-name`}>
          <TextField {...register('managerName')} inputProps={{ maxLength: 150 }} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.manager-email`}>
          <TextField disabled {...register('managerEmail')} />
        </InputWithLabel>

        <InputWithLabel required label={t`profile:my-profile.experience`}>
          <Controller
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                onChange={(e, v) => onChange(v)}
                options={experiences || []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                value={value || ''}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    error={Boolean(errors.experiences)}
                    helperText={errors.experiences?.message}
                  />
                )}
              />
            )}
            name="experiences"
          />
        </InputWithLabel>

        <InputWithLabel required label={t`profile:my-profile.interested-skills`}>
          <Controller
            control={control}
            render={({ field: { onChange, value, ref } }) => (
              <Autocomplete
                multiple={true}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                onChange={(e, v) => onChange(v)}
                options={skills || []}
                value={value || []}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    inputRef={ref}
                    error={Boolean(errors.skillsInteresting)}
                    helperText={errors.skillsInteresting?.message}
                  />
                )}
              />
            )}
            name="skillsInteresting"
          />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.facebook`}>
          <TextField {...register('facebook')} inputProps={{ maxLength: 150 }} />
        </InputWithLabel>
        <InputWithLabel label={t`profile:my-profile.desired-learning-path`}>
          <TextField
            multiline
            rows={3}
            {...register('learningPath')}
            inputProps={{ maxLength: 150 }}
          />
        </InputWithLabel>

        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="neutral"
            sx={{ marginRight: 2 }}
            onClick={() => navigate('/')}
          >
            {t`profile:my-profile.cancel`}
          </Button>
          <Button type="submit" variant="contained" color="success">
            {t`profile:my-profile.save`}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

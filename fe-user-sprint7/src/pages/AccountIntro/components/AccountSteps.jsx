import { Box, Button, TextField, Typography } from '@mui/material';
import { TagSelector } from 'components/Tag/TagSelector';
import { useTranslation } from 'react-i18next';
import { useGetAccountIntroSetting } from '../AccountIntro.query';
import { useAccountStore } from '../AccountIntro.store';
import { setUserFirstLogin } from 'apis/AdminInfo';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { fetchUser } from 'store/thunk/userThunk';
import { useLoading } from 'hooks/LoadingProvider';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'components/Layout/Flex';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';
import { useEffect } from 'react';

export const AccountSteps = () => {
  const { t } = useTranslation();
  const { step, nextStep, prevStep, exp, setExp, skills, setSkills, optional, setOptional, reset } =
    useAccountStore();
  const { data: adminInfo, isLoading } = useGetAccountIntroSetting();
  const dispatch = useDispatch();
  const { showLoading, hideLoading } = useLoading();
  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      reset();
    };
  }, []);

  useEffect(() => {
    isLoading ? showLoading() : hideLoading();
  }, [isLoading]);

  const onSubmit = async () => {
    const data = {
      skills,
      experiences: exp,
      learningPath: optional
    };
    if (!skip && !optional) {
      return;
    }
    submitFirstLogin(data);
  };

  const onSkip = async () => {
    setOptional('');
    const data = {
      skills,
      experiences: exp,
      learningPath: ''
    };
    submitFirstLogin(data);
  };

  const submitFirstLogin = async (data) => {
    try {
      showLoading();
      await setUserFirstLogin(data);
      toast.success('Cài đặt thành công');
      dispatch(fetchUser());

      setTimeout(() => {
        hideLoading();
        navigate('/');
      }, 1000);
    } catch (error) {
      toast.error(t('error_occurred'));
    }
  };

  if (!adminInfo) return '';

  const { skills: appSkills, experiences, skip } = adminInfo?.data.data;

  if (step === 1) {
    return (
      <>
        <Typography fontSize={14} fontWeight={500} color="white">
          #1
        </Typography>
        <TagSelector
          title={t`profile:account-intro.experience-description`}
          tags={experiences || []}
          selectedTags={exp || []}
          setSelectedTags={setExp}
          isSingleSelect
        />
        <Box display="flex" justifyContent="end">
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 12 }}
            onClick={nextStep}
            disabled={!exp?.length}
          >
            {t`profile:account-intro.next`}
          </Button>
        </Box>
      </>
    );
  }
  if (step === 2) {
    return (
      <>
        <Typography fontSize={14} fontWeight={500} color="white">
          #2
        </Typography>
        <TagSelector
          title={t`profile:account-intro.interested-skills-description`}
          tags={appSkills || []}
          selectedTags={skills || []}
          setSelectedTags={setSkills}
          maxSelect={5}
          allowOther
        />
        <Box display="flex" justifyContent="end">
          {/* <Button
            variant="contained"
            color="info"
            sx={{ marginTop: 12, marginRight: 2 }}
            onClick={prevStep}
          >
            {t`profile:account-intro.previous`}
          </Button> */}
          <Button
            variant="contained"
            color="success"
            sx={{ marginTop: 12 }}
            onClick={nextStep}
            disabled={!skills?.length}
          >
            {t`profile:account-intro.next`}
          </Button>
        </Box>
      </>
    );
  }

  return (
    <>
      {skip && (
        <Flex justifyContent="flex-end">
          <Button type="link" sx={{ color: 'white' }} onClick={onSkip}>
            {t`profile:account-intro.skip`} <KeyboardDoubleArrowRightIcon />
          </Button>
        </Flex>
      )}
      <Typography fontSize={14} fontWeight={500} color="white">
        #{step}
      </Typography>
      <Typography color="white" fontWeight={700} fontSize={29} mb={1}>
        {t`profile:account-intro.desired-learning-path`}
      </Typography>
      <Box display="flex" alignItems="center">
        <TextField
          variant="outlined"
          size="small"
          value={optional}
          inputProps={{ maxLength: 50 }}
          sx={{ width: 500, background: 'white', borderRadius: 1 }}
          onChange={(e) => setOptional(e.target.value)}
        />
        <Button
          variant="contained"
          color="success"
          sx={{ marginLeft: 2, color: 'white' }}
          onClick={onSubmit}
          disabled={!optional?.trim()}
        >
          {t`profile:account-intro.submit`}
        </Button>
      </Box>
      {/* <Box display="flex" justifyContent="end">
        <Button variant="contained" color="info" sx={{ marginTop: 12 }} onClick={prevStep}>
          {t`profile:account-intro.previous`}
        </Button>
      </Box> */}
    </>
  );
};

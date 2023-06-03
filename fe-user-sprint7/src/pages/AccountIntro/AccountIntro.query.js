import { getAdminInfo, getAccountIntroductionSetting } from 'apis/AdminInfo';
import { useMutation, useQuery } from 'react-query';

const ACCOUNT_INTRO_CACHE_KEYS = {
  get_admin_info: 'get_admin_info',
  update_account_intro: 'update_account_intro',
  get_account_introduction: 'get_account_introduction'
};
export const useGetAdminInfo = () => {
  return useQuery(ACCOUNT_INTRO_CACHE_KEYS.get_admin_info, getAdminInfo);
};

export const useUpdateAccountIntro = () => {
  return useMutation(ACCOUNT_INTRO_CACHE_KEYS.update_account_intro, (info) => getAdminInfo(info));
};

export const useGetAccountIntroSetting = () => {
  return useQuery(ACCOUNT_INTRO_CACHE_KEYS.get_account_introduction, getAccountIntroductionSetting);
};

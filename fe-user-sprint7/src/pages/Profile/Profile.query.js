import { UserApi } from 'apis/Profile';
import { queryClient } from 'index';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';
import { toast } from 'react-toastify';

const PROFILE_CACHE_KEYS = {
  get_profile: 'get_profile',
  update_profile: 'update_profile'
};
export const useGetProfile = (id) => {
  return useQuery(PROFILE_CACHE_KEYS.get_profile, () => UserApi.getProfile(id), {
    refetchOnWindowFocus: false,
    enabled: !!id
  });
};
export const useUpdateProfile = (username = '') => {
  const { t } = useTranslation();

  return useMutation(
    [PROFILE_CACHE_KEYS.update_profile, username],
    (data) => UserApi.updateProfile(username, data, data.avatar),
    {
      onError: (err) => toast.error(err?.response?.data?.message || t('error_occurred')),
      onSuccess: () => {
        queryClient.invalidateQueries(PROFILE_CACHE_KEYS.get_profile);
        toast.success('Cập nhật thành công');
      }
    }
  );
};

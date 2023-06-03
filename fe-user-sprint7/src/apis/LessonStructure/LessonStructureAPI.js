import httpClient from 'configs/axios/http-client';

const BASE_URL = '/lesson-structure';

export const LessonStructureAPI = {
  searchLessonStructureByCourseId: (id) => {
    return httpClient.get(`${BASE_URL}/course-id/${id}`);
  }
};

import create from 'zustand';

export const useProfileStore = create((set) => ({
  exp: [],
  skills: [],
  optional: '',
  setExp: (selected) => set(() => ({ exp: [selected] })),
  setSkills: (selected) => set(() => ({ skills: selected })),
  setOptional: (event) => set(() => ({ optional: event.target.value }))
}));

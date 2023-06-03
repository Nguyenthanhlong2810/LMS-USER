import create from 'zustand';

export const useAccountStore = create((set) => ({
  step: 1,
  nextStep: () => set((state) => ({ step: state.step + 1 })),
  prevStep: () => set((state) => ({ step: state.step - 1 })),

  exp: [],
  skills: [],
  optional: '',
  setExp: (selected) => set(() => ({ exp: [selected] })),
  setSkills: (selected) => set(() => ({ skills: selected })),
  setOptional: (value) => set(() => ({ optional: value })),

  reset: () =>
    set(() => ({
      step: 1,
      exp: [],
      skills: [],
      optional: ''
    }))
}));

import create from 'zustand';

type State = {
  height: number;
  setHeight: (height: number) => void;
};

const useHeader = create<State>((set) => ({
  height: null,
  setHeight: (height: number) => set((state) => ({ ...state, height })),
}));

export default useHeader;

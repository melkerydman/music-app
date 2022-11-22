import create from 'zustand';

type State = {
  height: string;
  setHeight: (height: string) => void;
};

const useHeader = create<State>((set) => ({
  height: 'auto',
  setHeight: (height: string) => set((state) => ({ ...state, height })),
}));

export default useHeader;

// TODO: Rename this and create slice
import create from 'zustand';

type State = {
  height: string;
  setHeight: (height: string) => void;
};

const useHeaderStore = create<State>((set) => ({
  height: 'auto',
  setHeight: (height: string) => set((state) => ({ ...state, height })),
}));

export default useHeaderStore;

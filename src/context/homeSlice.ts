import {create} from 'zustand';

interface HomeState {
  sidebarOn: boolean;
  setSidebarOn: (sidebarOn: boolean) => void;
}

const useHomeStore = create<HomeState>(set => ({
  sidebarOn: false,
  setSidebarOn: (sidebarOn: boolean) => set(() => ({sidebarOn})),
}));

export default useHomeStore;

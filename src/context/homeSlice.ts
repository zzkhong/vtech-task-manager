import {create} from 'zustand';
import {TaskCategory} from './types';

interface HomeState {
  sidebarOn: boolean;
  statusFilter?: TaskCategory;

  setSidebarOn: (sidebarOn: boolean) => void;
  setStatusFilter: (status?: TaskCategory) => void;
}

const useHomeStore = create<HomeState>(set => ({
  sidebarOn: false,
  statusFilter: 'all',

  setSidebarOn: (sidebarOn: boolean) => set(() => ({sidebarOn})),
  setStatusFilter: (status?: TaskCategory) =>
    set(() => ({statusFilter: status})),
}));

export default useHomeStore;

import {create} from 'zustand';
import dayjs from 'dayjs';
import uuid from 'react-native-uuid';

import {Task} from './types';

interface TaskState {
  tasks: Task[];
  addTask: (taskName: string) => void;
}

const useTaskStore = create<TaskState>(set => ({
  tasks: [],

  addTask: (taskName: string) => {
    if (taskName) {
      const newTask = {
        id: uuid.v4().toString(),
        name: taskName,
        createdAt: dayjs().unix(),
      };

      set(state => ({
        tasks: [...state.tasks, newTask],
      }));
    }
  },
}));

export default useTaskStore;

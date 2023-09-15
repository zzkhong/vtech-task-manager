import {create} from 'zustand';
import {immer} from 'zustand/middleware/immer';

import dayjs from 'dayjs';
import uuid from 'react-native-uuid';

import {Task} from './types';

// 用 object index 会比 array index 更有效率
// 而且把数据摊平会更容易 filter，search, delete
// 不过在 flatlist 转化成 array 会有一些吃力（如果数据量太大）
interface TaskState {
  tasks: Record<string, Task>;
  addTask: (taskName: string, parentId?: string) => void;
  removeTask: (taskId: string) => void;
  startTask: (taskId: string, timestamp: number) => void;
  completeTask: (task: Task) => void;
}

const useTaskStore = create(
  immer<TaskState>(set => ({
    tasks: {},

    addTask: (taskName, parentId) => {
      if (taskName) {
        const newTask: Task = {
          id: uuid.v4().toString(),
          name: taskName,
          parentId: parentId || undefined,
        };

        return set(state => ({
          tasks: {
            ...state.tasks,
            [newTask.id]: newTask,
          },
        }));
      }
    },

    removeTask: taskId => {
      return set(state => {
        if (state.tasks[taskId]) {
          const newTasks = {...state.tasks};
          delete newTasks[taskId];

          return {
            tasks: newTasks,
          };
        }
      });
    },

    startTask: (taskId, timestamp) => {
      return set(state => {
        if (state.tasks[taskId]) {
          const dTask = {...state.tasks};
          const task: Task = {
            ...dTask[taskId],
            status: 'running',
            startAt: timestamp,
          };

          return {
            tasks: {
              ...dTask,
              [task.id]: task,
            },
          };
        }
      });
    },

    completeTask: (task: Task) => {
      return set(state => {
        const newTask: Task = {
          ...task,
          status: 'completed',
          completedAt: dayjs().valueOf() - (task.startAt || 0),
        };

        return {
          tasks: {
            ...state.tasks,
            [newTask.id]: newTask,
          },
        };
      });
    },
  })),
);

export default useTaskStore;

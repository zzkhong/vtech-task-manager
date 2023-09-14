// Theme Slice
export type ThemeType = 'blue' | 'purple' | 'green' | 'orange';

export type ThemeColorMap = {
  label: string;
  primaryColor: string;
  secondaryColor: string;
};

// Task Slice
export type TaskStatus = 'running' | 'completed';

export interface TaskLookup {
  id: string;
  name: string;
}

export interface Task {
  id: string;
  name: string;
  status?: TaskStatus;
  remark?: string;
  startAt: number;

  parent?: TaskLookup;
  subtasks?: Task[];
}

// Theme Slice
export type ThemeType = 'blue' | 'purple' | 'green' | 'orange';

export type ThemeColorMap = {
  label: string;
  primaryColor: string;
  secondaryColor: string;
};

// Task Slice
export type TaskStatus = 'running' | 'completed';

export interface Task {
  id: string;
  name: string;
  status?: TaskStatus;
  remark?: string;
  createdAt: number;
  subtasks?: Task[];
}

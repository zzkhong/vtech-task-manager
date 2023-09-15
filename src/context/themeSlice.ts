import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {ThemeColorMap, ThemeType} from './types';
import {Colors} from 'styles';

interface ThemeState {
  theme: ThemeType;
  setTheme: (theme: ThemeType) => void;
}

export const themeMapping: Record<ThemeType, ThemeColorMap> = {
  blue: {
    label: '蓝色',
    primaryColor: Colors.bluePrimary,
    secondaryColor: Colors.blueSecondary,
  },
  purple: {
    label: '紫色',
    primaryColor: Colors.purplePrimary,
    secondaryColor: Colors.purpleSecondary,
  },
  green: {
    label: '绿色',
    primaryColor: Colors.greenPrimary,
    secondaryColor: Colors.greenSecondary,
  },
  orange: {
    label: '橘色',
    primaryColor: Colors.orangePrimary,
    secondaryColor: Colors.orangeSecondary,
  },
};

const useThemeStore = create(
  persist<ThemeState>(
    set => ({
      theme: 'blue',

      setTheme: (newTheme: ThemeType) =>
        set(() => ({
          theme: newTheme,
        })),
    }),
    {
      name: 'theme-persist',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default useThemeStore;

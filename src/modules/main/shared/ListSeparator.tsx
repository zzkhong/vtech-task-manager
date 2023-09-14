import React from 'react';
import {StyleSheet, View} from 'react-native';
import useThemeStore, {themeMapping} from 'context/themeSlice';

const ListSeparator: React.FC = () => {
  const {theme} = useThemeStore();
  return (
    <View
      style={[
        styles.separator,
        {
          backgroundColor: themeMapping[theme].primaryColor,
        },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    width: '100%',
    height: 2,
  },
});

export default ListSeparator;

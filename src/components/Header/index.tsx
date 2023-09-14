import React from 'react';
import {View, ViewProps, TextStyle, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from 'components/Text';
import useThemeStore, {themeMapping} from 'context/themeSlice';

import {Colors, Typography} from 'styles';

interface HeaderProps extends ViewProps {
  title?: string;
  titleStyle?: TextStyle;
  headerLeft: React.ReactNode;
}

const Header: React.FC<HeaderProps> = ({title, titleStyle, headerLeft}) => {
  const insets = useSafeAreaInsets();
  const {theme} = useThemeStore();

  return (
    <View
      style={[
        styles.header,
        {
          backgroundColor: themeMapping[theme].primaryColor,
          paddingTop: insets.top,
        },
      ]}>
      <>{headerLeft}</>
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    position: 'relative',
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  title: {
    ...Typography.headline,
    flex: 1,
    color: Colors.white,
    paddingHorizontal: 12,
  },
  headerLeftCustom: {
    position: 'absolute',
    zIndex: 1,
    borderWidth: 1,
  },
});

export default Header;

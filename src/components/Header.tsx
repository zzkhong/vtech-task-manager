import React from 'react';
import {View, ViewProps, TextStyle, StyleSheet} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from 'components/Text';
import useThemeStore, {themeMapping} from 'context/themeSlice';

import {Colors, Typography} from 'styles';

interface HeaderProps extends ViewProps {
  title?: string;
  titleStyle?: TextStyle;
}

const Header: React.FC<HeaderProps> = ({title, titleStyle}) => {
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
      <Text style={[styles.title, titleStyle]}>{title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    height: 60,
    alignItems: 'center',
  },
  title: {
    ...Typography.headline,
    flex: 1,
    textAlign: 'center',
    color: Colors.white,
  },
});

export default Header;

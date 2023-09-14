import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import Text from 'components/Text';
import useThemeStore, {themeMapping} from 'context/themeSlice';

import {Colors} from 'styles';

// 如果是页面跳转，会使用 react-navigation-bottom-tab
// 单纯的 theme switch 直接做个组件就好
const Palette: React.FC = () => {
  const insets = useSafeAreaInsets();
  const {theme, setTheme} = useThemeStore();

  return (
    <View
      style={[
        styles.container,
        styles.shadow,
        {
          paddingBottom: insets.bottom,
        },
      ]}>
      <View style={styles.content}>
        {Object.entries(themeMapping).map(([key, value]) => (
          <TouchableOpacity
            key={key}
            style={[
              styles.item,
              {
                backgroundColor:
                  key === theme ? value.secondaryColor : Colors.white,
              },
            ]}
            onPress={() => setTheme(key)}>
            <View
              style={[
                styles.box,
                {
                  backgroundColor: value.primaryColor,
                },
              ]}
            />
            <Text style={{color: value.primaryColor}}>{value.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    height: 60,
    backgroundColor: Colors.white,
  },
  box: {
    width: 20,
    height: 20,
  },
  item: {
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    flex: 1,
  },
  content: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    flexBasis: 'auto',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: Colors.textPrimary,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 16,
  },
});

export default Palette;

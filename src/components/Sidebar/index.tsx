import React, {useState, useEffect, useMemo} from 'react';
import {
  View,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Text from 'components/Text';
import useHomeStore from 'context/homeSlice';
import {Colors, Typography} from 'styles';
import useThemeStore, {themeMapping} from 'context/themeSlice';

// 跟 Palette 组件一样， 没有 navigation
// 单纯用来 filter 事项，所以不用 react-navigation
const Sidebar: React.FC = () => {
  const {sidebarOn, statusFilter, setSidebarOn, setStatusFilter} =
    useHomeStore();
  const {theme} = useThemeStore();

  const [translateX] = useState(new Animated.Value(-200));

  useEffect(() => {
    Animated.timing(translateX, {
      toValue: !sidebarOn ? -200 : 0,
      duration: 100,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sidebarOn]);

  const buttonItems = useMemo(
    () => [
      {
        key: 'all',
        label: '所有事项',
        onPress: () => setStatusFilter('all'),
      },
      {
        key: 'completed',
        label: '已完成事项',
        onPress: () => setStatusFilter('completed'),
      },
      {
        key: 'incomplete',
        label: '未完成事项',
        onPress: () => setStatusFilter('incomplete'),
      },
    ],
    [setStatusFilter],
  );

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.overlay, {display: !sidebarOn ? 'none' : 'flex'}]}>
      <View style={styles.container}>
        <Animated.View style={[styles.sidebar, {transform: [{translateX}]}]}>
          <Text style={styles.title}>TODO</Text>

          {buttonItems.map(item => (
            <TouchableOpacity
              key={item.key}
              onPress={item.onPress}
              style={[
                styles.button,
                {
                  backgroundColor:
                    statusFilter === item.key
                      ? themeMapping[theme].secondaryColor
                      : Colors.white,
                },
              ]}>
              <Text>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </Animated.View>

        <View style={styles.touchBox} onTouchEnd={() => setSidebarOn(false)} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    zIndex: 1,
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: '#00000060',
  },
  container: {
    flexGrow: 1,
    flexDirection: 'row',
  },
  sidebar: {
    height: '100%',
    width: 200,
    backgroundColor: Colors.white,
    paddingVertical: 24,
    paddingHorizontal: 12,
  },
  touchBox: {
    flex: 1,
  },
  title: {
    ...Typography.headline,
    paddingBottom: 12,
  },
  button: {
    paddingVertical: 4,
  },
});

export default Sidebar;

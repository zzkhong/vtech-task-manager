import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Animated, Easing} from 'react-native';
import Text from 'components/Text';
import useHomeStore from 'context/homeSlice';
import {Colors, Typography} from 'styles';

// 跟 Palette 组件一样， 没有 navigation
// 单纯用来 filter 事项，所以不用 react-navigation
const Sidebar: React.FC = () => {
  const {sidebarOn, setSidebarOn} = useHomeStore();
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

  return (
    <View
      // eslint-disable-next-line react-native/no-inline-styles
      style={[styles.overlay, {display: !sidebarOn ? 'none' : 'flex'}]}>
      <View style={styles.container}>
        <Animated.View style={[styles.sidebar, {transform: [{translateX}]}]}>
          <Text style={styles.title}>TODO</Text>

          <Text>所有事项</Text>
          <Text>已完成事项</Text>
          <Text>未完成事项</Text>
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
  },
});

export default Sidebar;

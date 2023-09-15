import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';

import {Colors, Container, Typography} from 'styles';

import Header from 'components/Header';
import Palette from 'components/Palette';
import useTaskStore from 'context/taskSlice';
import useHomeStore from 'context/homeSlice';
import BurgerIcon from 'assets/BurgerIcon';
import EmptyContent from './shared/EmptyContent';
import TaskContent from './shared/TaskContent';

const HomePage: React.FC = () => {
  const {tasks} = useTaskStore();
  const {setSidebarOn} = useHomeStore();

  return (
    <>
      <Header
        headerLeft={
          <TouchableOpacity
            style={styles.headerLeft}
            hitSlop={{
              right: 12,
              bottom: 12,
            }}
            onPress={() => setSidebarOn(true)}>
            <BurgerIcon color={Colors.white} />
          </TouchableOpacity>
        }
        title="TODO"
        titleStyle={styles.headerTitle}
      />

      <View style={styles.wrapper}>
        {Object.keys(tasks).length > 0 ? <TaskContent /> : <EmptyContent />}
      </View>

      <Palette />
    </>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    ...Container.pageContainer,
    backgroundColor: Colors.white,
    paddingBottom: 60,
  },
  headline: {
    ...Typography.headline,
  },
  headerTitle: {
    textAlign: 'center',
  },
  headerLeft: {
    position: 'absolute',
    zIndex: 1,
    left: 12,
  },
});

export default HomePage;

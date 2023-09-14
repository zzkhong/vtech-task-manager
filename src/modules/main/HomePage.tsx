import React from 'react';
import {View, StyleSheet} from 'react-native';

import {Colors, Container, Typography} from 'styles';

import Header from 'components/Header';
import Palette from 'components/Palette';
import EmptyContent from './shared/EmptyContent';
import TaskContent from './shared/TaskContent';
import useTaskStore from 'context/taskSlice';

const HomePage: React.FC = () => {
  const {tasks} = useTaskStore();

  return (
    <>
      <Header title="TODO" />

      <View style={styles.wrapper}>
        {tasks.length > 0 ? <TaskContent /> : <EmptyContent />}
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
});

export default HomePage;

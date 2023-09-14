import React from 'react';
import {StyleSheet, View, ScrollView} from 'react-native';

import {Colors, Container, Typography} from 'styles';

import Button from 'components/Button';
import Spacer from 'components/Spacer';
import Palette from 'components/Palette';
import Header from 'components/Header';

const DetailPage: React.FC = () => {
  return (
    <>
      <Header title="TODO" />

      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <Button>完成</Button>
          <Spacer />
          <Button type="danger">删除</Button>
        </ScrollView>
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
  container: {
    flexGrow: 1,
  },
  headline: {
    ...Typography.headline,
  },
});

export default DetailPage;

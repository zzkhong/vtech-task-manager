import React from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';

import {Colors, Container, Typography} from 'styles';
import useAppNavigation from 'routes/useAppNavigation';

import Button from 'components/Button';
import Palette from 'components/Palette';
import Header from 'components/Header';
import Text from 'components/Text';
import {Task} from 'context/types';
import Input from 'components/Input';

const DetailPage: React.FC = () => {
  const navigation = useAppNavigation();
  const {params: task} = useRoute<RouteProp<{params: Task}, 'params'>>();

  console.log(task);

  return (
    <>
      <Header
        headerLeft={
          <TouchableOpacity
            hitSlop={{
              right: 12,
              bottom: 12,
            }}
            onPress={() => navigation.goBack()}>
            <Text style={styles.headerLeftText}>返回</Text>
          </TouchableOpacity>
        }
        title={task?.name}
      />

      <View style={styles.wrapper}>
        <ScrollView contentContainerStyle={styles.container}>
          <View style={styles.row}>
            <Text>上层任务</Text>
            <Text style={styles.value}>{task?.parent?.name || '无'}</Text>
          </View>

          <View style={styles.row}>
            <Text>进行时间</Text>
            <Text style={styles.value}>{task?.parent?.name || '无'}</Text>
          </View>

          <View>
            <Text>备注</Text>
            <Input
              multiline
              placeholder="输入备注"
              style={styles.input}
              textAlignVertical="top"
              defaultValue={task?.remark}
            />
          </View>

          <Button style={styles.button}>完成</Button>
          <Button style={styles.button} type="danger">
            删除
          </Button>
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
  headerLeftText: {
    paddingLeft: 12,
    color: Colors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 12,
  },
  value: {
    color: Colors.textSecondary,
    paddingHorizontal: 12,
  },
  input: {
    marginVertical: 12,
    minHeight: 200,
  },
  button: {
    marginVertical: 6,
  },
});

export default DetailPage;

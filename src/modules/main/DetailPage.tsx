import React, {useCallback, useRef, useState} from 'react';
import {StyleSheet, View, ScrollView, TouchableOpacity} from 'react-native';
import {RouteProp, useRoute} from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';

import {Colors, Container, Typography} from 'styles';
import useAppNavigation from 'routes/useAppNavigation';

import Button from 'components/Button';
import Palette from 'components/Palette';
import Header from 'components/Header';
import Text from 'components/Text';
import {Task} from 'context/types';
import Input from 'components/Input';
import useTaskStore from 'context/taskSlice';
import dayjs from 'dayjs';

const DetailPage: React.FC = () => {
  const {tasks, removeTask, startTask, completeTask} = useTaskStore();

  const [task, setTask] = useState<Task>();
  const [timer, setTimer] = useState<number>(0);
  const [remark, setRemark] = useState<string>();

  const navigation = useAppNavigation();
  const {params} = useRoute<RouteProp<{params: {taskId: string}}, 'params'>>();

  const timerRef = useRef<NodeJS.Timeout>();

  const handleStartTask = () => {
    if (task) {
      const timestamp = dayjs().valueOf();

      startTask(task.id, timestamp);

      // Sync state task
      setTask({
        ...task,
        status: 'running',
        startAt: timestamp,
      });

      // start timer
      timerRef.current = setInterval(() => {
        setTimer(dayjs().valueOf() - (task?.startAt || timestamp));
      }, 1000);
    }
  };

  const handleRemoveTask = () => {
    if (task?.id) {
      removeTask(task?.id);
      navigation.goBack();
    }
  };

  const handleCompleteTask = () => {
    if (task?.id) {
      completeTask({
        ...task,
        remark,
      });
      navigation.goBack();
    }
  };

  useFocusEffect(
    useCallback(() => {
      let cTask = tasks[params?.taskId];

      if (cTask) {
        setTask(cTask);

        if (cTask.status === 'running') {
          timerRef.current = setInterval(() => {
            setTimer(dayjs().valueOf() - (cTask.startAt || 0));
          }, 1000);
        }
      }

      return () => clearInterval(timerRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

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
            <Text style={styles.value}>{task?.parentId || '无'}</Text>
          </View>

          <View style={styles.row}>
            <Text>进行时间</Text>
            <TouchableOpacity onPress={handleStartTask}>
              {/* 要优化，懒惰写 */}
              {task?.completedAt ? (
                <Text style={styles.value}>
                  {dayjs(task.completedAt).format('mm 分 ss 秒')}
                </Text>
              ) : (
                <Text style={styles.value}>
                  {task?.status === 'running'
                    ? dayjs(timer).format('mm 分 ss 秒')
                    : '开始'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View>
            <Text>备注*</Text>
            <Input
              multiline
              placeholder="输入备注"
              style={styles.input}
              onChangeText={setRemark}
              textAlignVertical="top"
              defaultValue={task?.remark}
            />
          </View>

          <Button
            style={[
              styles.button,
              // eslint-disable-next-line react-native/no-inline-styles
              {
                display: task?.status === 'completed' ? 'none' : 'flex',
              },
            ]}
            onPress={handleCompleteTask}
            disabled={task?.status === undefined}>
            完成
          </Button>
          <Button
            style={styles.button}
            type="danger"
            onPress={handleRemoveTask}>
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

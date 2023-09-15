import React, {useCallback, useState, useRef} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';

import CustomInput from 'components/Input/CustomInput';
import Text from 'components/Text';
import useTaskStore from 'context/taskSlice';
import Button from 'components/Button';
import useThemeStore, {themeMapping} from 'context/themeSlice';
import ArrowIcon from 'assets/ArrowIcon';

import {Colors, Container, Typography} from 'styles';
import {Task} from 'context/types';
import ListSeparator from './ListSeparator';
import useAppNavigation from 'routes/useAppNavigation';
import PlusIcon from 'assets/PlusIcon';
import useHomeStore from 'context/homeSlice';
import dayjs from 'dayjs';

const TaskContent: React.FC = () => {
  const {tasks, addTask} = useTaskStore();
  const {theme} = useThemeStore();
  const {statusFilter} = useHomeStore();

  const navigation = useAppNavigation();

  const [items, setItems] = useState<Task[]>();
  const [timer, setTimer] = useState<number>(0);

  const [editMode, setEditMode] = useState(false);

  const timerRef = useRef<NodeJS.Timeout>();

  // Initialize list item on focus
  useFocusEffect(
    useCallback(() => {
      setItems(
        Object.values(tasks).filter(item => {
          switch (statusFilter) {
            case 'completed':
              return item.status === 'completed';
            case 'incomplete':
              return item.status !== 'completed';
            default:
              return item;
          }
        }),
      );
    }, [tasks, setItems, statusFilter]),
  );

  useFocusEffect(
    useCallback(() => {
      timerRef.current = setInterval(() => {
        setTimer(dayjs().valueOf());
      }, 1000);

      return () => clearInterval(timerRef.current);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const renderButtonGroup = useCallback(
    (value: string) => {
      return !editMode ? (
        <Button>搜寻</Button>
      ) : (
        <>
          <Button onPress={() => addTask(value)} disabled={!value?.length}>
            新增
          </Button>
          <Button type="neutral" onPress={() => setEditMode(false)}>
            取消
          </Button>
        </>
      );
    },
    [editMode, addTask],
  );

  const renderTasksItem: ListRenderItem<Task> = ({item}) => {
    const subTasks = Object.values(tasks).filter(i => i?.parentId === item?.id);

    return (
      <>
        <View style={styles.listItem}>
          <Text style={styles.listLabel}>{item.name}</Text>

          {!editMode && (
            <TouchableOpacity onPress={() => setEditMode(true)}>
              <PlusIcon />
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('main_detail_page', {taskId: item.id})
            }>
            <ArrowIcon />
          </TouchableOpacity>
        </View>
        {item.status === 'running' && (
          <View
            style={[
              styles.captionBar,
              {
                backgroundColor: themeMapping[theme].primaryColor,
              },
            ]}>
            <Text style={styles.listCaption}>
              {dayjs(timer - (item.startAt || 0)).format('mm 分 ss 秒')}
            </Text>
          </View>
        )}

        {/* Nested Flatlist */}
        {subTasks.length > 0 && (
          <FlatList
            data={subTasks}
            style={styles.list}
            renderItem={renderTasksItem}
          />
        )}
      </>
    );
  };

  return (
    <View style={styles.container}>
      <CustomInput
        style={styles.input}
        placeholder={'输入事项名'}
        renderButtons={renderButtonGroup}
      />

      <FlatList
        data={items}
        renderItem={renderTasksItem}
        ItemSeparatorComponent={ListSeparator}
        style={styles.list}
        ListFooterComponent={
          !editMode ? (
            <TouchableOpacity
              style={styles.footer}
              onPress={() => setEditMode(true)}>
              <Text
                style={[
                  styles.footerLabel,
                  {color: themeMapping[theme].primaryColor},
                ]}>
                + 新建一个事项
              </Text>
            </TouchableOpacity>
          ) : null
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Container.pageContainer,
    backgroundColor: Colors.white,
    alignItems: 'center',
  },
  headline: {
    ...Typography.headline,
  },
  input: {
    flex: 3,
  },
  footer: {
    alignItems: 'center',
    paddingTop: 12,
  },
  footerLabel: {
    color: Colors.bluePrimary,
  },
  list: {
    width: '100%',
    paddingVertical: 12,
  },
  listLabel: {
    flexGrow: 1,
    color: Colors.textPrimary,
  },
  listCaption: {
    flexGrow: 1,
    color: Colors.white,
  },
  captionBar: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItem: {
    flexGrow: 1,
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
  },
});

export default TaskContent;

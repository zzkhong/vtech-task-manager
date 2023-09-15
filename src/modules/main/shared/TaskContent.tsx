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
  const [query, setQuery] = useState<string>('');
  const [collapsed, setCollapsed] = useState<string[]>([]);

  const [editId, setEditId] = useState<string | null>(null);

  const timerRef = useRef<NodeJS.Timeout>();

  // 优化会把它移到 utils, 懒惰
  useFocusEffect(
    useCallback(() => {
      // 过滤 和 搜引 可能有冲突（子集完成，母集未完成）
      // 过滤
      const filteredByCategory = Object.values(tasks).filter(item => {
        switch (statusFilter) {
          case 'completed':
            return item.status === 'completed';
          case 'incomplete':
            return item.status !== 'completed';
          default:
            return item;
        }
      });

      // 搜引
      const filteredByQuery = filteredByCategory.filter(item =>
        item.name.includes(query.trim()),
      );

      // 因为母集有可能没有 query 的字眼，所以会加回去
      if (query) {
        const parentTasks: Record<string, Task> = {};
        let pids = filteredByQuery.map(i => i.parentId).filter(i => !!i);

        while (pids.length > 0) {
          const newParentIds = [];
          for (let id of pids) {
            if (id && !parentTasks[id]) {
              parentTasks[id] = tasks[id];
              newParentIds.push(tasks[id].parentId);
            }
          }
          pids = newParentIds;
        }

        setItems([...filteredByQuery, ...Object.values(parentTasks)]);
      } else {
        setItems(filteredByQuery);
      }
    }, [query, tasks, setItems, statusFilter]),
  );

  useFocusEffect(
    useCallback(() => {
      timerRef.current = setInterval(() => {
        setTimer(dayjs().valueOf());
      }, 1000);

      return () => clearInterval(timerRef.current);
    }, []),
  );

  const toggleCollapsible = (id: string) => {
    if (collapsed.includes(id)) {
      setCollapsed(collapsed.filter(item => item !== id));
    } else {
      setCollapsed([...collapsed, id]);
    }
  };

  const renderButtonGroup = (value: string) => {
    return editId === null ? (
      <Button onPress={() => setQuery(value)}>搜寻</Button>
    ) : (
      <>
        <Button
          onPress={() => addTask(value, editId)}
          disabled={!value?.length}>
          新增
        </Button>
        <Button type="neutral" onPress={() => setEditId(null)}>
          取消
        </Button>
      </>
    );
  };

  const renderTasksItem: ListRenderItem<Task> = ({item}) => {
    const subTasks = items?.filter(i => i?.parentId === item?.id);

    return (
      <>
        <View style={styles.listItem}>
          <TouchableOpacity
            style={styles.listRow}
            onPress={() => toggleCollapsible(item.id)}>
            <Text style={styles.listLabel}>{`${
              collapsed.includes(item.id) ? '-' : '+'
            } ${item.name}`}</Text>
          </TouchableOpacity>

          {editId === null && (
            <TouchableOpacity onPress={() => setEditId(item.id)}>
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

        {subTasks && subTasks?.length > 0 && !collapsed.includes(item.id) && (
          <FlatList
            data={subTasks}
            renderItem={renderTasksItem}
            style={[
              styles.list,
              styles.sublist,
              {
                borderColor: themeMapping[theme].primaryColor,
              },
            ]}
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
        // 主事项
        data={items?.filter(item => item.parentId === undefined)}
        renderItem={renderTasksItem}
        ItemSeparatorComponent={ListSeparator}
        style={styles.list}
        ListFooterComponent={
          editId === null ? (
            <TouchableOpacity
              style={styles.footer}
              onPress={() => setEditId('')}>
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
    paddingVertical: 8,
  },
  sublist: {
    paddingLeft: 12,
    borderTopWidth: 1,
  },
  listRow: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  listLabel: {
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

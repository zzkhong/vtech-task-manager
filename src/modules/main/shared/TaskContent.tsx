import React, {useCallback, useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  ListRenderItem,
} from 'react-native';

import CustomInput from 'components/Input/CustomInput';
import Text from 'components/Text';
import useTaskStore from 'context/taskSlice';
import Button from 'components/Button';
import useThemeStore, {themeMapping} from 'context/themeSlice';
import ArrowIcon from 'assets/arrowIcon';

import {Colors, Container, Typography} from 'styles';
import {Task} from 'context/types';
import ListSeparator from './ListSeparator';
import useAppNavigation from 'routes/useAppNavigation';

const TaskContent: React.FC = () => {
  const {tasks, addTask} = useTaskStore();
  const {theme} = useThemeStore();
  const navigation = useAppNavigation();

  const [searchMode, setSearchMode] = useState(true);

  const renderButtonGroup = useCallback(
    (value: string) => {
      return searchMode ? (
        <Button>搜寻</Button>
      ) : (
        <>
          <Button onPress={() => addTask(value)} disabled={!value?.length}>
            新增
          </Button>
          <Button type="neutral" onPress={() => setSearchMode(true)}>
            取消
          </Button>
        </>
      );
    },
    [searchMode, addTask],
  );

  const renderTasksItem: ListRenderItem<Task> = ({item}) => {
    return (
      <View style={styles.listItem}>
        <Text style={styles.listLabel}>{item.name}</Text>

        <TouchableOpacity>
          {<Text style={{color: themeMapping[theme].primaryColor}}>+</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('main_detail_page', item)}>
          <ArrowIcon />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <CustomInput
        style={styles.input}
        placeholder={searchMode ? '输入事项名' : '输入子层事项名'}
        renderButtons={renderButtonGroup}
      />

      <FlatList
        data={tasks}
        renderItem={renderTasksItem}
        ItemSeparatorComponent={ListSeparator}
        style={styles.list}
        ListFooterComponent={
          searchMode ? (
            <TouchableOpacity
              style={styles.footer}
              onPress={() => setSearchMode(false)}>
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
  listItem: {
    flexGrow: 1,
    flexDirection: 'row',
    height: 32,
    alignItems: 'center',
  },
});

export default TaskContent;

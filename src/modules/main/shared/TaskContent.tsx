import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import CustomInput from 'components/Input/CustomInput';
import Text from 'components/Text';
import useTaskStore from 'context/taskSlice';
import Button from 'components/Button';
import useThemeStore, {themeMapping} from 'context/themeSlice';

import {Colors, Container, Typography} from 'styles';

const TaskContent: React.FC = () => {
  const {tasks, addTask} = useTaskStore();
  const {theme} = useThemeStore();

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

  return (
    <View style={styles.emptyContent}>
      <CustomInput
        style={styles.input}
        placeholder={searchMode ? '输入事项名' : '输入子层事项名'}
        renderButtons={renderButtonGroup}
      />

      <Text>{JSON.stringify(tasks, null, 2)}</Text>

      {searchMode ? (
        <TouchableOpacity onPress={() => setSearchMode(false)}>
          <Text
            style={[
              styles.footerLabel,
              {color: themeMapping[theme].primaryColor},
            ]}>
            + 新建一个事项
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContent: {
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
  footerLabel: {
    color: Colors.bluePrimary,
  },
});

export default TaskContent;

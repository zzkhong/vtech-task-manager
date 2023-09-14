import React, {useCallback, useState} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';

import Text from 'components/Text';
import CustomInput from 'components/Input/CustomInput';
import useTaskStore from 'context/taskSlice';

import {Colors, Container, Typography} from 'styles';
import Button from 'components/Button';

const EmptyContent: React.FC = () => {
  const [showInput, setShowInput] = useState(false);
  const {addTask} = useTaskStore();

  const handlePress = useCallback(() => {
    setShowInput(true);
  }, []);

  return (
    <View style={styles.emptyContent}>
      {showInput ? (
        <CustomInput
          style={styles.input}
          placeholder="输入事项名"
          renderButtons={value => (
            <Button onPress={() => addTask(value)} disabled={!value?.length}>
              新增
            </Button>
          )}
        />
      ) : (
        <TouchableOpacity onPress={handlePress}>
          <Text style={styles.headline}>+ 新建一个事项</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  emptyContent: {
    ...Container.pageContainer,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headline: {
    ...Typography.headline,
  },
  input: {
    flex: 3,
  },
});

export default EmptyContent;

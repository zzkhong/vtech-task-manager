import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Colors} from 'styles/index';

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = ({placeholder}) => {
  return (
    <TextInput
      style={styles.input}
      placeholder={placeholder}
      placeholderTextColor={Colors.textSecondary}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    height: 48,
    color: Colors.textPrimary,
    paddingHorizontal: 12,
  },
});

export default Input;

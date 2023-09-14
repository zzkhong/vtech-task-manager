import React from 'react';
import {StyleSheet, TextInput, TextInputProps} from 'react-native';
import {Colors} from 'styles/index';

interface InputProps extends TextInputProps {}

const Input: React.FC<InputProps> = props => {
  const {style, placeholder} = props;

  return (
    <TextInput
      {...props}
      style={[styles.input, style]}
      placeholder={placeholder}
      placeholderTextColor={Colors.textSecondary}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    flex: 1,
    borderWidth: 1,
    minHeight: 48,
    color: Colors.textPrimary,
    paddingHorizontal: 12,
  },
});

export default Input;

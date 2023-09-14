import React, {useState} from 'react';
import {StyleSheet, View, TextInput, TextInputProps} from 'react-native';
import {Colors} from 'styles/index';

interface CustomInputProps extends TextInputProps {
  renderButtons: (input: string) => React.ReactNode;
}

const CustomInput: React.FC<CustomInputProps> = (
  {style, placeholder, renderButtons},
  ref,
) => {
  const [input, setInput] = useState('');

  return (
    <View style={styles.wrapper}>
      <TextInput
        ref={ref}
        style={[styles.input, style]}
        onChangeText={setInput}
        placeholder={placeholder}
        placeholderTextColor={Colors.textSecondary}
      />
      <>{renderButtons(input)}</>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
  },
  input: {
    flex: 1,
    borderWidth: 1,
    height: 48,
    color: Colors.textPrimary,
    paddingHorizontal: 12,
  },
});

export default CustomInput;

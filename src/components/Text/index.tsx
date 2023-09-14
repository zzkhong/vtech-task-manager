import React from 'react';
import {
  StyleSheet,
  Text as RNText,
  TextProps as RNTextProps,
} from 'react-native';
import {Colors, Typography} from 'styles';

const Text: React.FC<RNTextProps> = props => {
  const {style, children} = props;

  return (
    <RNText
      allowFontScaling={false}
      style={[styles.textBase, style]}
      {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  textBase: {
    ...Typography.body,
    color: Colors.textPrimary,
  },
});

export default Text;

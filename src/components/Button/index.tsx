import Text from 'components/Text';
import useThemeStore, {themeMapping} from 'context/themeSlice';
import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  TouchableOpacityProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import {Colors} from 'styles/index';

interface ButtonProps extends TouchableOpacityProps {
  children: string | React.ReactNode;
  style?: StyleProp<ViewStyle>;
  labelStyle?: StyleProp<TextStyle>;
  type?: 'primary' | 'danger' | 'neutral';
}

const Button: React.FC<ButtonProps> = props => {
  const {children, style, labelStyle, disabled, type = 'primary'} = props;
  const {theme} = useThemeStore();

  const getButtonStyle = () => {
    switch (type) {
      case 'primary':
        return {
          backgroundColor: themeMapping[theme].primaryColor,
        };
      case 'danger':
        return styles.danger;
      case 'neutral':
        return styles.neutral;
      default:
        break;
    }
  };

  return (
    <TouchableOpacity
      {...props}
      activeOpacity={0.7}
      style={[
        styles.button,
        getButtonStyle(),
        disabled && styles.disabled,
        style,
      ]}>
      {typeof children === 'string' ? (
        <Text style={labelStyle}>{children}</Text>
      ) : (
        children
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flex: 1,
    maxHeight: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primary: {
    backgroundColor: Colors.bluePrimary,
  },
  danger: {
    backgroundColor: Colors.error,
  },
  neutral: {
    backgroundColor: Colors.textSecondary,
  },
  disabled: {
    opacity: 0.5,
  },
});

export default Button;

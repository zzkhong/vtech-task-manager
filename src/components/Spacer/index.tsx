import React from 'react';
import {View, ViewProps} from 'react-native';

type SpacerType = 'small' | 'normal' | 'large';

interface SpacerProps extends ViewProps {
  type?: SpacerType;
}

const spacingMap: Record<SpacerType, number> = {
  small: 4,
  normal: 16,
  large: 32,
};

const Spacer: React.FC<SpacerProps> = ({type = 'small'}) => {
  return (
    <View
      style={{
        marginVertical: spacingMap[type],
      }}
    />
  );
};

export default Spacer;

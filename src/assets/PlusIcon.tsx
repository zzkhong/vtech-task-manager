import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import useThemeStore, {themeMapping} from 'context/themeSlice';

const PlusIcon = (props: SvgProps) => {
  const {color} = props;
  const {theme} = useThemeStore();

  return (
    <Svg
      height="24px"
      viewBox="0 0 24 24"
      width="24px"
      fill={color || themeMapping[theme].primaryColor}
      {...props}>
      <Path d="M0 0h24v24H0z" fill="none" />
      <Path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" />
    </Svg>
  );
};
export default PlusIcon;

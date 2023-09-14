import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import useThemeStore, {themeMapping} from 'context/themeSlice';

const ArrowIcon = (props: SvgProps) => {
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
      <Path d="M16.01 11H4v2h12.01v3L20 12l-3.99-4z" />
    </Svg>
  );
};
export default ArrowIcon;

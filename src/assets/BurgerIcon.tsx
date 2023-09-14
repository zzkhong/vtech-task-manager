import * as React from 'react';
import Svg, {SvgProps, Path} from 'react-native-svg';
import useThemeStore, {themeMapping} from 'context/themeSlice';

const BurgerIcon = (props: SvgProps) => {
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
      <Path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z" />
    </Svg>
  );
};

export default BurgerIcon;

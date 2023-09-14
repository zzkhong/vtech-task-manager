import {NavigationProp, useNavigation} from '@react-navigation/native';

const routes = {
  main_home_page: undefined,
  main_detail_page: {},
};

export type RootRouteType = typeof routes;

const useAppNavigation = () => {
  const navigation = useNavigation<NavigationProp<RootRouteType>>();

  return navigation;
};

export default useAppNavigation;

import React from 'react';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import RootNavigator from 'routes/RootNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <RootNavigator />
    </SafeAreaProvider>
  );
};

export default App;

/**
 * @format
 */
import 'react-native-gesture-handler';
import {AppRegistry} from 'react-native';
import {name as appName} from './app.json';
import MainApp from './src/navigation/MainApp';
import {Provider} from 'react-redux';
import store from './src/config/store';

const ProviderApp = () => {
  return (
    <Provider store={store}>
      <MainApp />
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => ProviderApp);

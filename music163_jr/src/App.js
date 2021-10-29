import {HashRouter} from 'react-router-dom';
import {renderRoutes} from 'react-router-config';
import routes from '@/router';
import AppHeader from 'components/app-header';
import AppFooter from 'components/app-footer';
import AppPlayerBar from '@/pages/player/app-player-bar';

import {Provider} from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <HashRouter>
        <AppHeader />
        {/* Router路由映射，动态渲染组件 */}
        {renderRoutes(routes)}
        <AppFooter />
        <AppPlayerBar />
      </HashRouter>
    </Provider>
  );
}

export default App;

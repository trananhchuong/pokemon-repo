import 'antd/dist/antd.css';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch } from 'react-router-dom';
import LayoutApp from './components/layouts/LayoutApp';
import store from './store';

function App() {
  return (
    <div className="barker-app">
      <Provider store={store}>
        <Router>
          <Switch>
            <LayoutApp />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import LayoutApp from './components/layouts/LayoutApp';
import store from './store';
import 'antd/dist/antd.css';
import Generations from './components/generations/Generations';

function App() {
  return (
    <div className="barker-app">
      <Provider store={store}>
        <Router>
          <Switch>
            {/* <Route
              path="/generations"
              render={(props) => {
                return (
                  <Generations />
                );
              }}
              exact={true}
            /> */}

            <LayoutApp />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

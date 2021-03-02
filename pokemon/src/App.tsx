import 'antd/dist/antd.css';
import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import HomePage from './components/homePage';
import LayoutApp from './components/layouts/LayoutApp';
import store from './store';
import './stylesGlobal.scss';

function App() {
  return (
    <div className="pokemon-app">
      <Provider store={store}>
        <Router>
          <Switch>
            {/* Route User  */}
            <Route
              path="/home-page"
              render={(props: any) => {
                return (
                  <HomePage />
                );
              }}
              exact={true}
            />
            <LayoutApp />
          </Switch>
        </Router>
      </Provider>
    </div>
  );
}

export default App;

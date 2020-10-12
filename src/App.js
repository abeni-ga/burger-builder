import React, { Component } from 'react';

import Layout from './components/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import { Route, Switch } from 'react-router-dom';
import Order from './containers/Orders/Orders';

class App extends Component {
  render () {
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/checkout' component={Checkout} />
            <Route path='/order' component={Order} />
            <Route path='/' component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default App;

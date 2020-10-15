import * as React from 'react'
import { Route, Switch } from 'react-router-dom'

import ProductList from './components/Product/ProductList'
import ProductDetails from './components/Product/ProductDetails'


// If your app is big + you have routes with a lot of components, you should consider
// code-splitting your routes! If you bundle stuff up with Webpack, I recommend `react-loadable`.
//
// $ yarn add react-loadable
// $ yarn add --dev @types/react-loadable
//
// The given `pages/` directory provides an example of a directory structure that's easily
// code-splittable.

const Routes: React.SFC = () => (
    <Switch>
      <Route exact path="/:query" component={ProductList} />
      <Route exact path="/" component={ProductList} />
      <Route exact path="/product/:productId" component={ProductDetails} />
      <Route component={() => <div>Not Found</div>} />
    </Switch>
)

export default Routes

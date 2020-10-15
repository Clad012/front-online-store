import { combineReducers } from 'redux'
import { all, fork } from 'redux-saga/effects'
import { connectRouter, RouterState } from 'connected-react-router'
import { History } from 'history'


import productsSaga from './products/sagas'
import { productsReducer } from './products/reducer'
import { ProductsState } from './products/types'



export interface ApplicationState {
  products: ProductsState
  router: RouterState
}

export const createRootReducer = (history: History) =>
  combineReducers({
    products: productsReducer,
    router: connectRouter(history)
  })

export function* rootSaga() {
  yield all([fork(productsSaga)])
}

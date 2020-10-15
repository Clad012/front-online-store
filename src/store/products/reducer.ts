import { Reducer } from 'redux'
import { ProductsState, ProductsActionTypes } from './types'



export const initialState: ProductsState = {
  data: [],
  errors: undefined,
  product: undefined,
  loading: false,
  query: 'all'
}

const reducer: Reducer<ProductsState> = (state = initialState, action) => {
  switch (action.type) {
    case ProductsActionTypes.FETCH_REQUEST: {
      return { ...state, loading: true, query: action.payload }
    }
    case ProductsActionTypes.FETCH_ONE_REQUEST: {
      return { ...state, loading: true }
    }
    case ProductsActionTypes.FETCH_ONE_REQUEST_SUCCESS: {
      return { ...state, loading: false, product: action.payload }
    }
    case ProductsActionTypes.FETCH_SUCCESS: {
      return { ...state, loading: false, data: action.payload }
    }
    case ProductsActionTypes.FETCH_ERROR: {
      return { ...state, loading: false, errors: action.payload }
    }
    default: {
      return state
    }
  }
}

export { reducer as productsReducer }

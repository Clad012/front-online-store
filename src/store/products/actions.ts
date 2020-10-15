import { action } from 'typesafe-actions'
import { ProductsActionTypes, Product } from './types'


export const fetchRequest = (query: string) => action(ProductsActionTypes.FETCH_REQUEST, query)
export const fetchOneProductRequest = (query: string) => action(ProductsActionTypes.FETCH_ONE_REQUEST, query)

export const setQuery = (query: string) => action(ProductsActionTypes.SET_QUERY, query)


export const fetchSuccess = (data: Product[]) => action(ProductsActionTypes.FETCH_SUCCESS, data)
export const fetchOneProductSuccess = (data: Product) => action(ProductsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data)

export const fetchError = (message: string) => action(ProductsActionTypes.FETCH_ERROR, message)

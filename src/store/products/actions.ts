import { action } from 'typesafe-actions'
import { ProductsActionTypes, Product } from './types'

// Here we use the `action` helper function provided by `typesafe-actions`.
// This library provides really useful helpers for writing Redux actions in a type-safe manner.
// For more info: https://github.com/piotrwitek/typesafe-actions
export const fetchRequest = (query: string) => action(ProductsActionTypes.FETCH_REQUEST, query)
export const fetchOneProductRequest = (query: string) => action(ProductsActionTypes.FETCH_ONE_REQUEST, query)

export const setQuery = (query: string) => action(ProductsActionTypes.SET_QUERY, query)

// Remember, you can also pass parameters into an action creator. Make sure to
// type them properly as well.
export const fetchSuccess = (data: Product[]) => action(ProductsActionTypes.FETCH_SUCCESS, data)
export const fetchOneProductSuccess = (data: Product) => action(ProductsActionTypes.FETCH_ONE_REQUEST_SUCCESS, data)

export const fetchError = (message: string) => action(ProductsActionTypes.FETCH_ERROR, message)

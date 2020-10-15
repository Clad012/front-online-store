export interface Product extends ApiResponse {
  id: number
  name: string
  price: number
  description: string
  category: string
  image: string
}

export type ApiResponse = Record<string, any>

export enum ProductsActionTypes {
  FETCH_REQUEST = '@@products/FETCH_REQUEST',
  FETCH_SUCCESS = '@@products/FETCH_SUCCESS',
  FETCH_ONE_REQUEST = '@@products/FETCH_ONE_REQUEST',
  FETCH_ONE_REQUEST_SUCCESS = '@@products/FETCH_ONE_REQUEST_SUCCESS',
  FETCH_ERROR = '@@products/FETCH_ERROR',
  SELECTED = '@@products/SELECTED',
  SET_QUERY = '@@products/SET_QUERY'
}

// Declare state types with `readonly` modifier to get compile time immutability.
// https://github.com/piotrwitek/react-redux-typescript-guide#state-with-type-level-immutability
export interface ProductsState {
  readonly loading: boolean
  readonly data: Product[],
  readonly product?: Product,
  readonly errors?: string,
  readonly query?: string
}
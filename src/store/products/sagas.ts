import { all, call, fork, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { ProductsActionTypes } from './types'
import { fetchError, fetchSuccess, fetchRequest, fetchOneProductRequest, fetchOneProductSuccess } from './actions'
import { callApi } from '../../utils/api'

const isLocal = false;
const GLITCH_ENDPOINT = 'https://backend-api-store.glitch.me';
const LOCAL_API = process.env.REACT_APP_API_ENDPOINT || 'http://localhost:4000'
const API_ENDPOINT = isLocal ? LOCAL_API : GLITCH_ENDPOINT;
function* handleFetch(action: ReturnType<typeof fetchRequest>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, 'products?query='+action.payload)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('Une erreur est survenue.'))
    }
  }
}

function* handleFetchOneProduct(action: ReturnType<typeof fetchOneProductRequest>) {
  try {
    // To call async functions, use redux-saga's `call()`.
    const res = yield call(callApi, 'get', API_ENDPOINT, 'products/'+action.payload)

    if (res.error) {
      yield put(fetchError(res.error))
    } else {
      yield put(fetchOneProductSuccess(res))
    }
  } catch (err) {
    if (err instanceof Error && err.stack) {
      yield put(fetchError(err.stack))
    } else {
      yield put(fetchError('Une erreur est survenue.'))
    }
  }
}


// watcher function. `take*()` functions to watch Redux for a specific action
// type, and run saga, for example the `handleFetch()` saga above.
function* watchFetchRequest() {
  yield takeEvery(ProductsActionTypes.FETCH_REQUEST, handleFetch)
}
function* watchFetchRequestOneProduct() {
  yield takeLatest(ProductsActionTypes.FETCH_ONE_REQUEST, handleFetchOneProduct)
}

// We can also use `fork()` here to split our saga into multiple watchers.
function* productsSaga() {
  yield all([fork(watchFetchRequest), fork(watchFetchRequestOneProduct)])
}

export default productsSaga

import { createStore, combineReducers, compose, applyMiddleware } from 'redux'
import userReducer, { restoreSessionAction } from './userDuck'
import thunk from 'redux-thunk'
import charsReducers, { getCharactersActions } from './charstDucks'

let rootReducer = combineReducers({
  user: userReducer,
  characters: charsReducers,
})

export default function generateStroe() {
  let store = createStore(rootReducer, applyMiddleware(thunk))
  //obteniendo los personajes por primera vez
  getCharactersActions()(store.dispatch, store.getState)
  restoreSessionAction()(store.dispatch)
  return store
}

import axios from 'axios'

//constanes
let initialData = {
  fetchin: false,
  array: [],
  current: {},
  favorites: [],
}
let URL = 'https://rickandmortyapi.com/api/character'
let GET_CHARACTER = 'GET_CHARACTER'
let GET_CHARACTER_SUCCESS = 'GET_CHARACTER_SUCCESS'
let GET_CHARACTER_ERROR = 'GET_CHARACTER_ERRO'
let REMOVE_CHARACTER = 'REMOVE_CHARACTER'
let ADD_TO_FAVORITES = 'ADD_TO_FAVORITES'
//reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case ADD_TO_FAVORITES:
      return { ...state, ...action.payload }
    case REMOVE_CHARACTER:
      return { ...state, array: action.payload }
    case GET_CHARACTER:
      return { ...state, fetchin: true }
    case GET_CHARACTER_SUCCESS:
      return { ...state, array: action.payload, fetchin: false }
    case GET_CHARACTER_ERROR:
      return { ...state, fetchin: false, error: action.payload }
    default:
      return state
  }
}
//action (thunks)
export let addToFavoitesAction = () => (dispatch, getState) => {
  let { array, favorites } = getState().characters
  let char = array.shift()
  favorites.push(char)
  dispatch({
    type: ADD_TO_FAVORITES,
    payload: { array: [...array], favorites: [...favorites] },
  })
}

export let removeCharacterAction = () => (dispatch, getState) => {
  let { array } = getState().characters
  array.shift()
  dispatch({
    type: REMOVE_CHARACTER,
    payload: [...array],
  })
}

export let getCharactersActions = () => (dispatch, getState) => {
  dispatch({
    type: GET_CHARACTER,
  })
  return axios
    .get(URL)
    .then((res) => {
      dispatch({
        type: GET_CHARACTER_SUCCESS,
        payload: res.data.results,
      })
    })
    .catch((err) => {
      dispatch({
        type: GET_CHARACTER_ERROR,
        payload: err.response.message,
      })
    })
}

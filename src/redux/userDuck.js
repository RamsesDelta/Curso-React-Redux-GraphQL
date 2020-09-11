import { loginWithGoogle, signOutGoogle } from '../firebase'
//constants
let initialData = {
  loggedIn: false,
  fetching: false,
}

let LOGIN = 'LOGIN'
let LOGIN_SUCCESS = 'LOGIN_SUCCESS'
let LOGIN_ERROR = 'LOGIN_ERROR'
let LOGIN_OUT = 'LOGIN_OUT'
//reducer
export default function reducer(state = initialData, action) {
  switch (action.type) {
    case LOGIN_OUT:
      return { ...initialData }
    case LOGIN_SUCCESS:
      return { ...state, fetching: false, ...action.payload, loggedIn: true }
    case LOGIN_ERROR:
      return { ...state, fetching: false, error: action.payload }
    case LOGIN:
      return { ...state, fetching: true }
    default:
      return state
  }
}

//aux
function saveStorage(storage) {
  localStorage.storage = JSON.stringify(storage)
}

//action (action creator)
export let logOutAction = () => (dispach, getState) => {
  signOutGoogle()
  dispach({
    type: LOGIN_OUT,
  })
  localStorage.removeItem('storage')
}

export let restoreSessionAction = () => (dispach) => {
  let storage = localStorage.getItem('storage')
  storage = JSON.parse(storage)
  if (storage && storage.user) {
    dispach({
      type: LOGIN_SUCCESS,
      payload: storage.user,
    })
  }
}

export let doGoogleLoginAction = () => (dispach, getState) => {
  dispach({
    type: LOGIN,
  })
  return loginWithGoogle()
    .then((user) => {
      dispach({
        type: LOGIN_SUCCESS,
        payload: {
          uid: user.uid,
          displayName: user.displayName,
          email: user.email,
          photoURL: user.photoURL,
        },
      })
      saveStorage(getState())
    })
    .catch((e) => {
      dispach({
        type: LOGIN_ERROR,
        payload: e.message,
      })
    })
}

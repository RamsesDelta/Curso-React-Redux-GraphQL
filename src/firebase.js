import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: 'AIzaSyCPorFuXcMeeOQNJ5hvPMUUGo_QmR30Leg',
  authDomain: 'redux-9aaf5.firebaseapp.com',
  databaseURL: 'https://redux-9aaf5.firebaseio.com',
  projectId: 'redux-9aaf5',
  storageBucket: 'redux-9aaf5.appspot.com',
  messagingSenderId: '342820633558',
  appId: '1:342820633558:web:b7956cfa288016d488c277',
}

//inicializar firebase
firebase.initializeApp(firebaseConfig)

export function signOutGoogle() {
  firebase.auth().signOut()
}

export function loginWithGoogle() {
  let provider = new firebase.auth.GoogleAuthProvider()
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then((snap) => snap.user)
}

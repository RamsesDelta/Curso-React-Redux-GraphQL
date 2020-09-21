import firebase from 'firebase/app'
import 'firebase/auth'

let firebaseConfig = {
  apiKey: 'AIzaSyACb7imRmi0T5rHkZ3zanCvr3Qr2zSgE1Q',
  authDomain: 'sherlock-holmes-1db20.firebaseapp.com',
  databaseURL: 'https://sherlock-holmes-1db20.firebaseio.com',
  projectId: 'sherlock-holmes-1db20',
  storageBucket: 'sherlock-holmes-1db20.appspot.com',
  messagingSenderId: '540929236256',
  appId: '1:540929236256:web:329c5ccfa497c37bcd4b45',
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

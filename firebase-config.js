import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import firebase from 'firebase/app'
import 'firebase/firestore'

// const firebaseConfig = {
//   apiKey: 'AIzaSyBwoDD-ZZG6EZVk3QVTtRh4ewMvYIGBLdg',
//   authDomain: 'bookrack-40f2a.firebaseapp.com',
//   projectId: 'bookrack-40f2a',
//   storageBucket: 'bookrack-40f2a.appspot.com',
//   messagingSenderId: '775762010157',
//   appId: '1:775762010157:web:a184c6ccea2c6e649058a4',
//   measurementId: 'G-8LQYV0BJR7',
// }

const firebaseConfig = {
  apiKey: 'AIzaSyAEvVCC3fvPEKw42ZqaT7jchh7j_lC3AOM',
  authDomain: 'bookrack-b5a7d.firebaseapp.com',
  projectId: 'bookrack-b5a7d',
  storageBucket: 'bookrack-b5a7d.appspot.com',
  messagingSenderId: '482349842336',
  appId: '1:482349842336:web:5abac60c0be76086402ec5',
  measurementId: 'G-6KL14VG4K8',
}
export const app = initializeApp(firebaseConfig)
export const auth = getAuth()
export const db = getFirestore(app)
export const storage = getStorage(app)

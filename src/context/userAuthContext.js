import { useContext, createContext, useState, useEffect } from 'react'

import {
  AuthErrorCodes,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from 'firebase/auth'

import { auth, db } from '../../firebase-config'
import { addDoc, collection, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'

const userContext = createContext()
export const useAuth = () => {
  return useContext(userContext)
}

const UserAuthContext = ({ children }) => {
  const router = useRouter()
  const [error, setError] = useState('')
  const [currentUser, setUser] = useState()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      // console.log(user)
      if (user) {
        setUser(user)
        // console.log('You are logging in')
      } else {
        alert('You are logging out')
        router.push('/signin')
      }
    })
  }, [])

  const SignUp = async (email, password, userName) => {
    setError('')
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result)
        try {
          const ref = doc(db, 'users', result.user.uid)
          const docRef = await setDoc(ref, {
            userName,
            email,
            allBooks: [],
            favourites: [],
            wantToRead: [],
            completed: [],
            reading: [],
          })

          alert('Welcome new user created Succesfully')
          router.push('/dashboard')
        } catch (e) {
          console.error('Error Adding document: ', e)
        }
      })
      .catch((err) => {
        if (err.code === 'auth/email-already-in-use') {
          setInterval(() => {
            setError('')
          }, 5000)
          setError('email already in use try another email')
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setInterval(() => {
            setError('')
          }, 5000)
          setError('Password must be 6character long')
        } else {
          setError(err.message)
        }
      })
  }
  const value = {
    SignUp,
    error,
    currentUser,
  }
  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export default UserAuthContext

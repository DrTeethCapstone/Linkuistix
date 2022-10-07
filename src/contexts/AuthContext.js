import React, { useContext, useEffect, useState } from 'react'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'firebase/auth'
import { collection, addDoc, doc, setDoc, getDoc, getDocs, where, query } from "firebase/firestore";
import { auth, db } from '../firebase'

const AuthContext = React.createContext()

export const useAuth = () => {
    return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    //auth functions
    const signup = async (email, password, username) => {
        createUserWithEmailAndPassword(auth, email, password)
        await addDoc(collection(db, 'users'), {
            email: email,
            username: username
        })
    }
    // const addUserToDb = async (email, username) => {
    //     const docRef = doc(db, 'users')
    //     await setDoc(docRef, {
    //         email: email,
    //         username: username
    //     })
    // }

    const login = (email, password) => {
        return signInWithEmailAndPassword(auth, email, password)
    }

    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
        })

        return unsubscribe
    }, [])

    // database functions

    const getUserData = async () => {
        const userDataRef = collection(db, '/users')
        const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
        await getDocs(q)
        // console.log(data.doc)

        // return data
    }


    const value = {
        currentUser,
        login,
        signup,
        logout,
        getUserData
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}
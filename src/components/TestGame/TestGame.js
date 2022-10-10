import React, { useEffect, useState } from 'react'
import { collection, Timestamp, setDoc, query, where, getDocs, arrayUnion, doc, addDoc, getDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from '../Landing/Sidebar';


function TestGame() {
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(10)
    const [gameStart, setGameStart] = useState(false)
    const [username, setUsername] = useState('')

    const { currentUser } = useAuth()

    useEffect(() => {
        if (gameStart) {
            timer > 0 && setTimeout(() => setTimer(timer - 1), 100)
            if (timer === 0) {
                setGameStart(false)
                setTimer(10)
                const sendData = async () => {
                    // const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
                    // const docRef = await getDocs(q)
                    // docRef.forEach(async (document) => {
                    //     const id = document.id
                    //     const docRef = doc(db, 'users', id)
                    //     setDoc(docRef, { scores: arrayUnion({ score: score, time: Timestamp.fromDate(new Date) }) }, { merge: true })
                    // })

                    await addDoc(collection(db, 'scores'), {
                        score: score,
                        username: username,
                        scoreCreatedAt: Timestamp.fromDate(new Date)
                    })
                }
                sendData()
            }
        }
    }, [timer, gameStart])
    useEffect(() => {
        console.log(currentUser?.email)

        const sendData = async () => {
            const q = query(collection(db, 'users'), where('email', '==', currentUser?.email))
            const docRef = await getDocs(q)
            docRef.forEach(async (doc) => {
                setUsername(doc.data().username)
                console.log(username)
            })
        }
        sendData()
    }, [])

    return (
        <>
            <Sidebar />
            <div className='game-container'>
                {gameStart ?
                    <>
                        <h1>Score: {score}</h1>
                        <h3>Timer: {timer}</h3>
                        <button onClick={() => setScore(score + 10)}>+10</button>
                    </>
                    :
                    <>
                        <h1>prev score: {score}</h1>
                        <button onClick={() => setGameStart(true)}>Start</button>
                    </>

                }

            </div>
        </>

    )
}

export default TestGame
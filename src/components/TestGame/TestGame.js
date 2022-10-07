import React, { useEffect, useState } from 'react'
import { collection, addDoc } from "firebase/firestore";
import { db } from '../../firebase'
import { useAuth } from '../../contexts/AuthContext'
import Sidebar from '../Landing/Sidebar';


function TestGame() {
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(10)
    const [gameStart, setGameStart] = useState(false)

    const { currentUser } = useAuth()


    useEffect(() => {
        if (gameStart) {
            timer > 0 && setTimeout(() => setTimer(timer - 1), 500)
            if (timer === 0) {
                setGameStart(false)
                setTimer(10)
                console.log(score)
                // create score in database with ref to user email
                const sendData = async () => {
                    const docRef = await addDoc(collection(db, 'scores'), {
                        score: score,
                        userEmail: currentUser.email
                    })
                    console.log(docRef)
                }
                sendData()
            }
        }
    }, [timer, gameStart])

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
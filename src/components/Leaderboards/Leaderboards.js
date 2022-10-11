import React, { useEffect, useState } from 'react'
import { collection, getDocs, query, orderBy, limitToLast, limit, startAfter, endBefore, } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'



function Leaderboards() {
    const [leaderboard, setLeaderboard] = useState([])
    const [loading, setLoading] = useState(true)
    const [message, setMessage] = useState('')


    useEffect(() => {
        const getData = async () => {
            const first = query(collection(db, 'scores'), orderBy('score', 'desc'), limit(10))
            const docSnap = await getDocs(first)
            docSnap.forEach((doc) => {
                console.log(doc.data())
                leaderboard.push(doc.data())
            })
            setLoading(false)
        }
        getData()

    }, [])

    const handleNext = async () => {
        const lastVisible = leaderboard[leaderboard.length - 1]
        const next = query(collection(db, 'scores'),
            orderBy('score', 'desc'),
            startAfter(lastVisible.score),
            limit(10)
        )
        const nextDoc = await getDocs(next)
        if (nextDoc.docs.length) {
            setMessage('')
            let newArr = []
            nextDoc.forEach((doc) => {
                newArr.push(doc.data())
            })
            setLeaderboard(newArr)
        } else {
            setMessage('Last page')
        }

    }

    //main arr of 100 scores


    const handlePrev = async () => {
        const firstVisible = leaderboard[0]
        const next = query(collection(db, 'scores'),
            orderBy('score', 'desc'),
            endBefore(firstVisible.score),
            limitToLast(10)
        )

        const nextDoc = await getDocs(next)
        if (nextDoc.docs.length) {
            setMessage('')
            let newArr = []
            nextDoc.forEach((doc, idx, arr) => {

                newArr.push(doc.data())
            })
            setLeaderboard(newArr)
        } else {
            setMessage('Cant go back')
        }

    }


    return (
        <>
            <Sidebar />
            <div className='leaderboards-container'>
                <h1>Leaderboards</h1>
                <div>
                    {/* {loading ? <p>loading...</p>
                        :
                        leaderboards.sort((a, b) => {
                            return b.score - a.score
                        }).map((ele) =>
                            <>
                                <p>{ele.score} by {ele.userEmail}</p>
                            </>
                        )
                    } */}
                    {loading ? <p>loading...</p>
                        :
                        <>
                            {leaderboard.map((ele) =>
                                <>
                                    <p>{ele.score} by {ele.username}</p>
                                </>
                            )}
                            <button onClick={handlePrev}>prev</button>
                            <button onClick={handleNext}>next</button>
                            <div>
                                {message}
                            </div>
                        </>

                    }
                </div>
            </div>
        </>

    )
}

export default Leaderboards




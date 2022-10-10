import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, doc, query, where, orderBy, limitToLast, limit, startAfter, endBefore, startAt } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'



function Leaderboards() {
    const [leaderboard, setLeaderboard] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [loading, setLoading] = useState(true)
    const [button, setButton] = useState(false)
    const [message, setMessage] = useState('')

    const { currentUser } = useAuth()

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
        console.log(leaderboard)
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

    //next -> called by next button -> setleaderboard to new 10 scores

    // console.log(scoreData)
    // if (scoreData.length > 0) {
    //     const orderedScores = scoreData.sort((a, b) =>
    //         b.score.score - a.score.score
    //     ).map((ele) =>
    //         <>
    //             <p>{ele.score.score} by {ele.user}</p>
    //         </>
    //     )
    //     console.log(orderedScores)
    //     let paginationScores
    // }
    // take scoredata -> newarr = scoredata from [0] - [9]
    // newarrmap to display stats
    // '

    console.log(leaderboard)

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



// useEffect(() => {
//     const getScoreData = async () => {
//         // const allUsersCollection = collection(db, 'users')
//         // const userDocRef = await getDocs(allUsersCollection)
//         // userDocRef.forEach((doc) =>
//         //     // console.log(doc.data().scores)
//         //     doc.data().scores.forEach((scores) =>
//         //         scoreData.push({ score: scores, user: doc.data().username })
//         //     )
//         // )

//         const first = query(collection(db, 'users'), where('scores', 'array-contains', 'time'), limit(23))
//         const docSnap = await getDocs(first)
//         console.log(docSnap)
//         docSnap.forEach((doc) =>
//             console.log(doc.data())
//         )

//         setLoading(false)
//     }
//     getScoreData()
// }, [scoreData])
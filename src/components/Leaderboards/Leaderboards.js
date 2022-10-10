import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, doc, query, where, orderBy, limit } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'



function Leaderboards() {
    const [leaderboards, setLeaderBoards] = useState([])
    const [scoreData, setScoreData] = useState([])
    const [loading, setLoading] = useState(true)

    const { currentUser } = useAuth()

    useEffect(() => {
        const getScoreData = async () => {
            // const allUsersCollection = collection(db, 'users')
            // const userDocRef = await getDocs(allUsersCollection)
            // userDocRef.forEach((doc) =>
            //     // console.log(doc.data().scores)
            //     doc.data().scores.forEach((scores) =>
            //         scoreData.push({ score: scores, user: doc.data().username })
            //     )
            // )

            const first = query(collection(db, 'users'), where('scores', 'array-contains', 'time'), limit(23))
            const docSnap = await getDocs(first)
            console.log(docSnap)
            docSnap.forEach((doc) =>
                console.log(doc.data())
            )

            setLoading(false)
        }
        getScoreData()
    }, [scoreData])
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
                        scoreData.sort((a, b) =>
                            b.score.score - a.score.score
                        ).map((ele) =>
                            <>
                                <p>{ele.score.score} by {ele.user}</p>
                            </>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default Leaderboards
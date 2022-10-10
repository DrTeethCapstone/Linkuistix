import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, doc, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'


function Leaderboards() {
    const [leaderboards, setLeaderBoards] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getScoreData = async () => {
            const scoreCollection = collection(db, 'scores')
            const collectionSnap = await getDocs(scoreCollection)
            console.log(collectionSnap)
            collectionSnap.forEach((doc) => {
                // console.log(doc.data().score)
                leaderboards.push(doc.data())
            })
            setLoading(false)
        }
        getScoreData()
    }, [leaderboards])
    console.log(leaderboards)



    return (
        <>
            <Sidebar />
            <div className='leaderboards-container'>
                <h1>Leaderboards</h1>
                <div>
                    {loading ? <p>loading...</p>
                        :
                        leaderboards.sort((a, b) => {
                            return b.score - a.score
                        }).map((ele) =>
                            <>
                                <p>{ele.score} by {ele.userEmail}</p>
                            </>
                        )
                    }
                </div>
            </div>
        </>

    )
}

export default Leaderboards
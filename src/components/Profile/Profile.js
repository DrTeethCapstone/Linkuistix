import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'


function Profile() {
    const [userData, setUserData] = useState({})
    const [scoreData, setScoreData] = useState([])
    const { getUserData, currentUser } = useAuth()
    console.log(currentUser)
    useEffect(() => {
        const getUserData = async () => {
            const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
            const queryUsers = await getDocs(q)
            console.log(queryUsers)
            queryUsers.forEach((doc) => {
                console.log(doc.data())

                setUserData(doc.data())
            })
        }
        const getScoreData = async () => {
            const q = query(collection(db, 'scores'), where('userEmail', '==', currentUser.email))
            const queryScores = await getDocs(q)

            queryScores.forEach((doc) => {
                console.log(doc.data().score)
                scoreData.push(doc.data().score)
            })

        }
        getScoreData()
        getUserData()

    }, [])
    console.log('userData', userData)
    console.log('scoreData', scoreData)
    // const dataMap = data.forEach((doc) => {
    //     console.log(doc.data())
    // })
    const arr = [1, 2, 3, 4, 5]

    return (
        <>
            <Sidebar />
            <div className='profile-container'>
                <h1>username: {userData.username}</h1>
                <div>
                    <h3>Player Scores:</h3>
                    {scoreData.sort((a, b) =>
                        b - a
                    ).map(ele =>
                        <>
                            <p>{ele}</p>
                        </>
                    )}
                </div>
            </div>
        </>

    )
}

export default Profile


// useEffect(() => {
//     const getData = async () => {
//         try {
//             console.log(await getUserData())
//             return await getUserData()
//         } catch (error) {
//             console.log(error)
//         }
//     }
//     // setData(getData())
//     console.log(getData())
//     getData()
// }, [])
//     // console.log(data)
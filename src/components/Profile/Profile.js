import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'


function Profile() {
    const [data, setData] = useState({})
    const { getUserData, currentUser } = useAuth()

    useEffect(() => {
        const getData = async () => {
            const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
            const querySnapshot = await getDocs(q)

            querySnapshot.forEach((doc) => {
                setData(doc.data())
            })
        }
        // console.log(getData())
        getData()

    }, [])
    console.log(data)
    // const dataMap = data.forEach((doc) => {
    //     console.log(doc.data())
    // })

    return (
        <>
            <Sidebar />
            <div className='profile-container'>
                <h1>username: {data.username}</h1>
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
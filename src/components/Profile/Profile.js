import React, { useEffect, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { collection, getDocs, query, where, orderBy, limit, limitToLast, } from 'firebase/firestore'
import { db } from '../../firebase'
import Sidebar from '../Landing/Sidebar'


function Profile() {
    const [scoreData, setScoreData] = useState([])
    const [currentPage, setCurrentPage] = useState(1)
    const { currentUser, userLogin } = useAuth()
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        const getUserData = async () => {
                    const q = query(collection(db, 'users'), where('email', '==', currentUser.email))
                    
                    const queryUsers = await getDocs(q)
                        queryUsers.forEach(async (doc) => {
                            setUserData(doc.data())
                            const qu = query(collection(db, 'scores'), where('username', '==', doc.data().username))
                            const queryScores = await getDocs(qu)
                            const newArr = []
                            queryScores.forEach((doc) => {   
                                newArr.push(doc.data().score)
                            })
                            setScoreData(newArr)
                        })
        }
        getUserData()

    },[])

        function goToNextPage(){
            setCurrentPage(currentPage+1)
        }
        function goToPreviousPage(){
            setCurrentPage(currentPage-1)
        }
        function getPaginationData(data){
           const startIndex = currentPage*10-10
           const endIndex = startIndex + 10
           return data.slice(startIndex,endIndex)
        }
    let sortedData = scoreData.length ? scoreData.sort((a,b)=>b-a) : null
    let showData = scoreData.length ? getPaginationData(sortedData) : null
    return (
        <>
            <Sidebar />
            <div className='profile-container'>
                <h1>username: {userData.username}</h1>
                <div>
                    <h3>Player Scores:</h3>
                    {showData ? showData.map(ele =>
                        <>
                            <p>{ele}</p>
                        </>
                    ):null}
                     <button onClick={goToPreviousPage}>prev</button>
                    <button onClick={goToNextPage}>next</button>
                </div>
            </div>
        </>

    )
}

export default Profile
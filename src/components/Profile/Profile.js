import React from 'react'
import { useAuth } from '../../contexts/AuthContext'

function Profile() {
    const { currentUser } = useAuth()
    console.log(currentUser)
    return (
        <div>Profile</div>
    )
}

export default Profile
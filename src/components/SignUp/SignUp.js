import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'



function SignUp() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()
    // const docRef = doc(db, 'users', currentUser.uid)
    // await setDoc(docRef, {
    //     username: username
    // })

    const { signup, addUserToDb } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            return setError('password no matchy')
        }
        try {
            setError('')
            setLoading(true)
            // await signup(email, password)
            signup(email, password, username)
            // await addUserToDb(email, username)
            // await addUserToDb(username)
            navigate('/landing')
        } catch (error) {
            console.log(error)
            setError('failed to create account')
        }
        setLoading(false)
    }

    return (
        <>
            <div className='form-container'>
                <div>
                    <h2>SIGN UP</h2>
                    {error && window.alert(error)}
                    <form onSubmit={handleSubmit}>
                        <input placeholder='username' value={username} onChange={(e) => setUsername(e.target.value)} type='text' />
                        <input placeholder='email' value={email} onChange={(e) => setEmail(e.target.value)} type='text' />
                        <input placeholder='password' value={password} onChange={(e) => setPassword(e.target.value)} type='password' />
                        <input placeholder='confirm password' value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type='password' />
                        <button disabled={loading} type='submit'>Sign Up</button>
                    </form>
                    <p>Already Have An Account?</p>
                    <p><Link to='/login'>Log In</Link></p>
                </div>
            </div>
        </>
    )
}

export default SignUp
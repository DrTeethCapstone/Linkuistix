import React, { useRef, useState } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { Link, useNavigate } from 'react-router-dom'

function LogIn() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const { login } = useAuth()

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            setError('')
            setLoading(true)
            await login(email, password)
            navigate('/landing')
        } catch (error) {
            setError('failed to log in')
        }
        setLoading(false)
    }

    return (
        <>
            <div className='form-container'>
                <div>
                    <h2>LOGIN</h2>
                    <form onSubmit={handleSubmit}>
                        <input placeholder='email' type='email' value={email} onChange={(event) => setEmail(event.target.value)} required />
                        <input placeholder='password' type='password' value={password} onChange={(event) => setPassword(event.target.value)} required />
                        <button disabled={loading} type='submit'>Log In</button>
                    </form>
                    <p>Don't Have An Account?</p>
                    <p><Link to='/'>Sign Up</Link></p>
                </div>
            </div>
        </>
    )
}

export default LogIn
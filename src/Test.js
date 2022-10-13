import React, { useEffect, useState } from 'react'
import { Sketch } from "./animation/app";
import { useAuth } from './contexts/AuthContext'

function Test() {
    const [state, setState] = useState(20000)
    const { setScoreState, scoreState } = useAuth()
    console.log(state)
    console.log(scoreState)
    useEffect(() => {
        const test = new Sketch()
        setScoreState(test.score)
        setState(test.score)
        console.log(test)
        console.log(state)
    }, [])
}

export default Test
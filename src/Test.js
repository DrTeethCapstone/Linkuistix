import React, { useEffect, useState } from 'react'
import { GameMenu } from "./animation/app";
import { useAuth } from './contexts/AuthContext'

function Test() {
    const [state, setState] = useState(20000)
    const { setScoreState, scoreState } = useAuth()
    console.log(state)
    console.log(scoreState)
    useEffect(() => {
        const test = new GameMenu()
        setScoreState(test.score)
        setState(test.score)
        console.log(test)
        console.log(state)
    }, [])
}

export default Test
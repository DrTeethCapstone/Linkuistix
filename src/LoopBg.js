import React, { useEffect } from 'react'
import { Sketch } from "./animation/app";

function LoopBg() {
    useEffect(() => {
        new Sketch()
    }, [])
}

export default LoopBg
import React, { useEffect } from 'react'
import { Sketch } from "./game/app";

function LoopBg() {
    useEffect(() => {
        new Sketch()
    }, [])
}

export default LoopBg
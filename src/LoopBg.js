import React, { useEffect } from 'react'
import { Sketch } from "./game/app";

function LoopBg() {

    useEffect(() => {
        const sketch = new Sketch()
        sketch.checkPlaying()
    }, [])
}

export default LoopBg
import { Sketch } from '../../game/app'

import React, { useEffect } from 'react'

function WordGame() {
    useEffect(() => {
        new Sketch()
    }, [])
}

export default WordGame
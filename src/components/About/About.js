import React from 'react'

function About() {
    return (
        <>
            <div className='about-container'>
                <div className='about-game-container'>
                    <h3>About the Game</h3>
                    <p>Linkuistix is a game created by 5 dudes using machine learning blah blah more text is uses tensorflow thrreejs at fiurst but then pixi yaddayadda</p>
                </div>
                <h3>Meet the Devs</h3>
                <div className='dev-container'>

                    <div className='bio-container'>
                        <img width='150px' src={require('./faces/pixelWill.png')} alt='pixelWill' />
                        <h5>Will Siddons</h5>
                        <p>ghub link</p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' height='150px' src={require('./faces/pixelBill.png')} alt='pixelBill' />
                        <h5>Bill Munkacsy</h5>
                        <p>ghub link</p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' src={require('./faces/pixelNoel.png')} alt='pixelNoel' />
                        <h5>Noel Benford</h5>
                        <p>ghub link</p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' height='150px' src={require('./faces/pixelDrew.png')} alt='pixelDrew' />
                        <h5>Andrew Dobson</h5>
                        <p>ghub link</p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' src={require('./faces/pixelBilal.png')} alt='pixelBilal' />
                        <h5>Bilal Abbas</h5>
                        <p>ghub link</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
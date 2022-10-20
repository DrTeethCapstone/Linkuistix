import React, { useState } from 'react'

function About() {
    const [willImgState, setWillImgState] = useState('./faces/pixelWill.png')
    const [noelImgState, setNoelImgState] = useState('./faces/pixelNoel.png')
    const [billImgState, setBillImgState] = useState('./faces/pixelBill.png')
    const [drewImgState, setDrewImgState] = useState('./faces/pixelDrew.png')
    const [bilalImgState, setBilalImgState] = useState('./faces/pixelBilal.png')

    return (
        <>
            <div className='about-container'>
                <div className='about-game-container'>
                    <h3>About the Game</h3>
                    <h5><a href='https://github.com/DrTeethCapstone/capstone-ml-three-firebase'>Project Github</a></h5>
                    <p>Linkuistix is a game created by 5 dudes using machine learning blah blah more text is uses tensorflow thrreejs at fiurst but then pixi yaddayadda</p>

                </div>
                <h3>Meet the Devs</h3>
                <div className='dev-container'>

                    <div className='bio-container'>
                        <img width='150px' onMouseLeave={() => setWillImgState('./faces/pixelWill.png')} onMouseEnter={() => setWillImgState('./faces/pixelWill-mouth.png')} src={require(`${willImgState}`)} alt='pixelWill' />
                        <h5>Will Siddons</h5>
                        <p><a href='https://www.linkedin.com/in/willsiddons/'>LinkedIn</a></p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' height='150px' onMouseLeave={() => setBillImgState('./faces/pixelBill.png')} onMouseEnter={() => setBillImgState('./faces/pixelBill-cat.png')} src={require(`${billImgState}`)} alt='pixelBill' />
                        <h5>Bill Munkacsy</h5>
                        <p><a href='https://www.linkedin.com/in/williammunkacsy/'>LinkedIn</a></p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' onMouseLeave={() => setNoelImgState('./faces/pixelNoel.png')} onMouseEnter={() => setNoelImgState('./faces/pixelNoel-pirate.png')} src={require(`${noelImgState}`)} alt='pixelNoel' />
                        <h5>Noel Benford</h5>
                        <p><a href='https://www.linkedin.com/in/noelbenford/'>LinkedIn</a></p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' height='150px' onMouseLeave={() => setDrewImgState('./faces/pixelDrew.png')} onMouseEnter={() => setDrewImgState('./faces/pixelDrew-dog.png')} src={require(`${drewImgState}`)} alt='pixelDrew' />
                        <h5>Andrew Dobson</h5>
                        <p><a href='https://www.linkedin.com/in/tandrewlopez/'>LinkedIn</a></p>
                    </div>
                    <div className='bio-container'>
                        <img width='150px' onMouseLeave={() => setBilalImgState('./faces/pixelBilal.png')} onMouseEnter={() => setBilalImgState('./faces/pixelBilal-crown.png')} src={require(`${bilalImgState}`)} alt='pixelBilal' />
                        <h5>Bilal Abbas</h5>
                        <p><a href='https://www.linkedin.com/in/babbasuk/'>LinkedIn</a></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default About
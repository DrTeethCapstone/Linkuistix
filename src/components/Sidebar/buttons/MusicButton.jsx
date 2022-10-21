import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStop, faPlay } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function MusicButton({
  handleMusicOn,
  handleMusicOff,
  showMusic,
  musicOn,
  showSidebar,
  isFirstLogin,
}) {
  //animation for buttons
  const [isBoopedMusic, setBoopedMusic] = useState(false);

  const [styleMusic, apiMusic] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'lightgreen',
    config: config.slow,
  }));

  //first load animation
  //highlight the music button on first login
  console.log('music is first and showS: ', isFirstLogin, showSidebar);
  if (isFirstLogin && showSidebar) {
    setTimeout(() => {
      setBoopedMusic(true);
    }, 3000);

    setTimeout(() => {
      setBoopedMusic(false);
    }, 5700);
  }

  //handles all the mouseovers
  const onMouseEnter8 = useCallback(() => setBoopedMusic(true), []);
  const onMouseLeave8 = useCallback(() => setBoopedMusic(false), []);

  useEffect(() => {
    if (isBoopedMusic) {
      apiMusic.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiMusic.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedMusic, apiMusic]);

  //tooltip renderer
  const renderTooltipMusic = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Music On/Off{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        {...showMusic}
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipMusic}
      >
        <animated.div
          style={styleMusic}
          onMouseEnter={onMouseEnter8}
          onMouseLeave={onMouseLeave8}
        >
          <span onClick={musicOn ? handleMusicOff : handleMusicOn}>
            {' '}
            <FontAwesomeIcon
              icon={musicOn ? faStop : faPlay}
              className="soundIcon"
              size="lg"
              fixedWidth
              inverse
            />
          </span>
        </animated.div>
      </OverlayTrigger>
    </>
  );
}

export default MusicButton;

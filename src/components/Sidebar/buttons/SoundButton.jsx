import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faVolumeHigh, faVolumeXmark } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function SoundButton({
  handleSoundOnOff,
  soundOn,
  showSound,
  showSidebar,
  isFirstLogin,
}) {
  //animation for buttons
  const [isBoopedSound, setBoopedSound] = useState(false);

  const [styleSound, apiSound] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'cornflowerblue',
    config: config.slow,
  }));

  //first load animation
  //highlight the mute button on first login
  if (isFirstLogin && showSidebar) {
    setTimeout(() => {
      setBoopedSound(true);
    }, 6000);

    setTimeout(() => {
      setBoopedSound(false);
    }, 9000);
  }

  //handles all the mouseovers
  const onMouseEnter7 = useCallback(() => setBoopedSound(true), []);
  const onMouseLeave7 = useCallback(() => setBoopedSound(false), []);

  useEffect(() => {
    if (isBoopedSound) {
      apiSound.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiSound.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedSound, apiSound]);

  //tooltip renderer
  const renderTooltipSound = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Sound On/Off{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        {...showSound}
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipSound}
      >
        <animated.div
          style={styleSound}
          onMouseEnter={onMouseEnter7}
          onMouseLeave={onMouseLeave7}
        >
          <span onClick={handleSoundOnOff}>
            {' '}
            <FontAwesomeIcon
              icon={soundOn ? faVolumeHigh : faVolumeXmark}
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

export default SoundButton;

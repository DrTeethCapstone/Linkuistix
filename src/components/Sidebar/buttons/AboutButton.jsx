import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function AboutButton({ handleAboutShow }) {
  //animation for buttons
  const [isBoopedAbout, setBoopedAbout] = useState(false);

  const [styleAbout, apiAbout] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'aliceblue',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter9 = useCallback(() => setBoopedAbout(true), []);
  const onMouseLeave9 = useCallback(() => setBoopedAbout(false), []);

  useEffect(() => {
    if (isBoopedAbout) {
      apiAbout.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiAbout.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedAbout, apiAbout]);

  //tooltip renderer

  const renderTooltipAbout = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      About{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipAbout}
      >
        <animated.div
          style={styleAbout}
          onMouseEnter={onMouseEnter9}
          onMouseLeave={onMouseLeave9}
          onClick={handleAboutShow}
        >
          <FontAwesomeIcon
            icon={faCircleInfo}
            size="lg"
            fixedWidth
            className="aboutIcon"
            inverse
          />
        </animated.div>
      </OverlayTrigger>
    </>
  );
}

export default AboutButton;

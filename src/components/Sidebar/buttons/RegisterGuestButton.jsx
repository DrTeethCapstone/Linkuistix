import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFloppyDisk } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function RegisterGuestButton({ handleRegisterGuestShow, currentUser }) {
  //animation for buttons
  const [isBoopedSave, setBoopedSave] = useState(false);

  const [styleSave, apiSave] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter1 = useCallback(() => setBoopedSave(true), []);
  const onMouseLeave1 = useCallback(() => setBoopedSave(false), []);

  useEffect(() => {
    if (isBoopedSave) {
      apiSave.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiSave.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedSave, apiSave]);

  //tooltip renderer
  const renderTooltipSave = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Save Progress{' '}
    </Tooltip>
  );

  return (
    <>
      {currentUser?.isAnonymous ? (
        <OverlayTrigger
          placement="left"
          delay={{ show: 100, hide: 400 }}
          overlay={renderTooltipSave}
        >
          <animated.div
            style={styleSave}
            onMouseEnter={onMouseEnter1}
            onMouseLeave={onMouseLeave1}
            onClick={handleRegisterGuestShow}
          >
            <FontAwesomeIcon
              icon={faFloppyDisk}
              size="lg"
              fixedWidth
              className="sidebarIcon"
              inverse
            />
          </animated.div>
        </OverlayTrigger>
      ) : (
        <></>
      )}
    </>
  );
}

export default RegisterGuestButton;

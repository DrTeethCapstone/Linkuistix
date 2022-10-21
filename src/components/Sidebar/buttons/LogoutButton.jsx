import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleXmark } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function LogoutButton({ handleLogout }) {
  //animation for buttons
  const [isBoopedLogout, setBoopedLogout] = useState(false);

  const [styleLogout, apiLogout] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    borderColor: 'red',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter5 = useCallback(() => setBoopedLogout(true), []);
  const onMouseLeave5 = useCallback(() => setBoopedLogout(false), []);

  useEffect(() => {
    if (isBoopedLogout) {
      apiLogout.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiLogout.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedLogout, apiLogout]);

  //tooltip renderer
  const renderTooltipLogout = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Log Out{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipLogout}
      >
        <animated.div
          style={styleLogout}
          onMouseEnter={onMouseEnter5}
          onMouseLeave={onMouseLeave5}
        >
          <span onClick={handleLogout}>
            {' '}
            <FontAwesomeIcon
              icon={faCircleXmark}
              className="logoutIcon"
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

export default LogoutButton;

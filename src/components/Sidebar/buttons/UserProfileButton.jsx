import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function UserProfileButton({ handleUserShow }) {
  //animation for buttons
  const [isBoopedUser, setBoopedUser] = useState(false);

  const [styleUser, apiUser] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter2 = useCallback(() => setBoopedUser(true), []);
  const onMouseLeave2 = useCallback(() => setBoopedUser(false), []);

  useEffect(() => {
    if (isBoopedUser) {
      apiUser.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiUser.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedUser, apiUser]);

  //tooltip renderer
  const renderTooltipProfile = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      User Profile{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipProfile}
      >
        <animated.div
          style={styleUser}
          onMouseEnter={onMouseEnter2}
          onMouseLeave={onMouseLeave2}
          onClick={handleUserShow}
        >
          <FontAwesomeIcon
            icon={faUser}
            size="lg"
            fixedWidth
            className="sidebarIcon"
            inverse
          />
        </animated.div>
      </OverlayTrigger>
    </>
  );
}

export default UserProfileButton;

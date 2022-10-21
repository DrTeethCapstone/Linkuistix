import React, { useState, useEffect, useCallback } from 'react';

//tooltips
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';

//animation
import { useSpring, animated, config } from '@react-spring/web';

function LeaderboardButton({ handleLeaderboardShow }) {
  //animation for buttons
  const [isBoopedLeaderboard, setBoopedLeaderboard] = useState(false);

  const [styleLeaderboard, apiLeaderboard] = useSpring(() => ({
    opacity: 0.3,
    borderWidth: '2px',
    config: config.slow,
  }));

  //handles all the mouseovers
  const onMouseEnter4 = useCallback(() => setBoopedLeaderboard(true), []);
  const onMouseLeave4 = useCallback(() => setBoopedLeaderboard(false), []);

  useEffect(() => {
    if (isBoopedLeaderboard) {
      apiLeaderboard.start({
        opacity: 1,
        borderWidth: '5px',
        scale: 1.2,
      });
    } else {
      apiLeaderboard.start({
        opacity: 0.3,
        borderWidth: '2px',
        scale: 1,
      });
    }
  }, [isBoopedLeaderboard, apiLeaderboard]);

  //tooltip renderer
  const renderTooltipLeaderboard = (props) => (
    <Tooltip id="button-tooltip" {...props} className="sidebarTooltip">
      Leaderboard{' '}
    </Tooltip>
  );

  return (
    <>
      <OverlayTrigger
        placement="left"
        delay={{ show: 100, hide: 100 }}
        overlay={renderTooltipLeaderboard}
      >
        <animated.div
          style={styleLeaderboard}
          onMouseEnter={onMouseEnter4}
          onMouseLeave={onMouseLeave4}
          onClick={handleLeaderboardShow}
        >
          <FontAwesomeIcon
            icon={faTrophy}
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

export default LeaderboardButton;

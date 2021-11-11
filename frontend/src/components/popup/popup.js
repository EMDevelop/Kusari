import React from 'react';
import './_popup.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

function Popup(props) {
  return props.trigger ? (
    <div className="popup">
      <div className="popup-inner">
        <a onClick={() => props.setTrigger(false)}>
          <div className="close-button">
            <FontAwesomeIcon icon={faTimesCircle} />
          </div>
        </a>
        {props.children}
      </div>
    </div>
  ) : (
    ''
  );
}

export default Popup;

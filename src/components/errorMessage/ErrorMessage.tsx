import React, { FunctionComponent, useState, useEffect } from 'react';
import './ErrorMessage.scss';
import Icon from '@material-ui/core/Icon';

type Props = {
  show?: boolean;
  message: string;
  onClose?: () => void;
};

const ErrorMessage: FunctionComponent<Props> = ({ message, onClose }) => {
  const [showError, setShowError] = useState(true);

  useEffect(() => {
    console.log(message);
    
    if (message) {
      setShowError(true);
    }
  }, [message]);

  const handleClose = () => {
    setShowError(false);
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {showError && (
        <div className="error-messages">
          <span>{message}</span>

          <Icon className="btn-close" onClick={handleClose}>
            close
          </Icon>
        </div>
      )}
    </>
  );
};

export default ErrorMessage;

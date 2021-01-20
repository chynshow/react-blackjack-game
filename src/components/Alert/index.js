import React, { useContext } from 'react';
import { AppContext } from '../../state/AppContext';

const Alert = () => {
  const {
    state: {
      alert: { msg, state },
    },
  } = useContext(AppContext);
  return (
    <>
      {msg !== null && <div className={`c-alert c-alert--${state}`}>{msg}</div>}
    </>
  );
};

export default Alert;

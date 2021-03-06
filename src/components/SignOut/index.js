import React from 'react';

import './signOut.css';

const SignOutButton = (props) => {
  return (
    <button type="button" onClick={props.firebase.doSignOut}>
      Sign Out
    </button>
  );
};

export default SignOutButton;

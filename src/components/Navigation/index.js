import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../constants/routes';
import SignOutButton from '../SignOut';

import './navigation.css';

const Navigation = (props) => {
  return props.authUser ? (
    <NavigationAuth firebase={props.firebase} />
  ) : (
    <NavigationNonAuth />
  );
};

const NavigationAuth = (props) => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACT}>Contact</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
        </li>
        <li>
          <Link to={ROUTES.ADMIN}>Admin</Link>
        </li>
        <li>
          <SignOutButton firebase={props.firebase} />
        </li>
      </ul>
    </div>
  );
};

const NavigationNonAuth = () => {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.CONTACT}>Contact</Link>
        </li>
        <li>
          <Link to={ROUTES.ABOUT}>About</Link>
        </li>
        <li>
          <Link to={ROUTES.SIGNIN}>Sign In</Link>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;

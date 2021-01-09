import React from 'react';
import { NavBarContainer } from './Styled';
import logo from '../../static/assets/images/logo.png';

const NavBar = () => (
  <div>
    <NavBarContainer>
      <img src={logo} alt="header-logo" className="img-fluid" width="120" />
    </NavBarContainer>
  </div>
);

export default NavBar;

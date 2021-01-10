import React, { Fragment } from 'react';

import { NavDiv, NavUl, NavPara } from './Styled';
import ChatImg from '../../static/assets/images/chat.png';
import PeopleImg from '../../static/assets/images/people.png';
import StudioImg from '../../static/assets/images/studio.png';

const RightSideBar = () => (
  <Fragment>
    <NavDiv>
      <NavUl>
        <li>
          <a href="/">
            <img src={ChatImg} alt="live" width="35" />
            <NavPara>Studio</NavPara>
          </a>
        </li>
        <li>
          <a href="/">
            <img src={PeopleImg} alt="live" width="35" />
            <NavPara>Studio</NavPara>
          </a>
        </li>
        <li>
          <a href="/">
            <img src={StudioImg} alt="live" width="35" />
            <NavPara>Studio</NavPara>
          </a>
        </li>
      </NavUl>
    </NavDiv>
  </Fragment>
);

export default RightSideBar;

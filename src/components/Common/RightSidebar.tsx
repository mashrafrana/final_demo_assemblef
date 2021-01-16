import React, { Fragment } from 'react';

import { NavDiv, NavUl, NavPara } from './Styled';
// import ChatImg from '../../static/assets/images/chat.png';
// import PeopleImg from '../../static/assets/images/people.png';
// import StudioImg from '../../static/assets/images/studio.png';
// import ThemeImg from '../../static/assets/images/theme.png';

import { useNavigation } from '../../providers/NavigationProvider';
import { useAppState } from '../../providers/AppStateProvider';

const RightSideBar = () => {
  const { toggleRoster } = useNavigation();
  const { toggleTheme } = useAppState();
  return (
    <Fragment>
      <NavDiv>
        <NavUl>
          <li onClick={toggleRoster}>
            {/* <img src={PeopleImg} alt="people" width="35" /> */}
            <NavPara>People</NavPara>
          </li>
          <li>
            {/* <img src={ChatImg} alt="chat" width="35" /> */}
            <NavPara>Chat</NavPara>
          </li>
          <li onClick={toggleTheme}>
            {/* <img src={ThemeImg} alt="theme" width="35" /> */}
            <NavPara>Theme</NavPara>
          </li>
          <li>
            {/* <img src={StudioImg} alt="live" width="35" /> */}
            <NavPara>Studio</NavPara>
          </li>
        </NavUl>
      </NavDiv>
    </Fragment>
  );
};

export default RightSideBar;

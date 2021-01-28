import React, { Fragment } from 'react';

import { NavDiv, NavUl, NavPara } from './Styled';
import ChatImg from '../../static/assets/images/chat.png';
import PeopleImg from '../../static/assets/images/people.png';
import ThemeImg from '../../static/assets/images/theme.png';
import Settings from '../../static/assets/images/settings.png';

import { useNavigation } from '../../providers/NavigationProvider';
import { useAppState } from '../../providers/AppStateProvider';

const RightSideBar = ({ setSetting, isSetting }) => {
  const { toggleRoster } = useNavigation();
  const { toggleTheme } = useAppState();
  return (
    <Fragment>
      <NavDiv>
        <NavUl>
          <li onClick={toggleRoster}>
            <img src={PeopleImg} alt="people" width="35" />
            <NavPara>People</NavPara>
          </li>
          <li>
            <img src={ChatImg} alt="chat" width="35" />
            <NavPara>Chat</NavPara>
          </li>
          {/* <li onClick={toggleTheme}>
            <img src={ThemeImg} alt="theme" width="35" />
            <NavPara>Theme</NavPara>
          </li> */}
          <li
            onClick={() => {
              setSetting(!isSetting);
              toggleRoster();
            }}
          >
            <img src={Settings} alt="theme" width="35" />
            <NavPara>Settings</NavPara>
          </li>
        </NavUl>
      </NavDiv>
    </Fragment>
  );
};

export default RightSideBar;

import React, { Fragment } from 'react';
import { NavDiv, NavUl, NavPara } from './Styled';
// import NoteSVG from '../../static/assets/images/note.svg';
// import ProfileImg from '../../static/assets/images/profile.png';
// import CommunityImg from '../../static/assets/images/community.svg';
// import PartnerImg from '../../static/assets/images/partners.svg';

const SideBar = () => (
  <Fragment>
    <NavDiv>
      <NavUl>
        <li>
          <a href="/">
            {/* <img
              src={NoteSVG}
              alt="live"
              className="img-fluid mb-2"
              width="35"
            /> */}
            <NavPara>Agenda</NavPara>
          </a>
        </li>
        <li>
          <a href="/">
            {/* <img
              src={CommunityImg}
              alt="live"
              className="img-fluid mb-2"
              width="35"
            /> */}
            <NavPara>Community</NavPara>
          </a>
        </li>
        <li>
          <a href="/">
            {/* <img
              src={ProfileImg}
              alt="live"
              className="img-fluid mb-2"
              width="35"
            /> */}
            <NavPara>Speakers</NavPara>
          </a>
        </li>
        <li>
          <a href="/">
            {/* <img
              src={PartnerImg}
              alt="live"
              className="img-fluid mb-2"
              width="35"
            /> */}
            <NavPara>Partners</NavPara>
          </a>
        </li>
      </NavUl>
    </NavDiv>
  </Fragment>
);

export default SideBar;

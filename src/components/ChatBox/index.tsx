import React, { Fragment } from 'react';

import {
  RightSideBarContainer,
  ChatBoxContainer,
  RightSideBarContainerSearch,
  ChatBoxDiv,
  ChatBoxPara,
  ChatBoxSpan,
  ChatMessage,
} from './Styled';
import UserImg from '../../static/assets/images/user.png';
import SearchImg from '../../static/assets/images/search.png';
import MeetingRoster from '../../containers/MeetingRoster';

const ChatBox = ({ showRoster }) => (
  <Fragment>
    <RightSideBarContainer>
      <ChatBoxContainer>
        {showRoster ? <MeetingRoster /> : null}
        {/* <RightSideBarContainerSearch>
          <input type="text" placeholder="search" />
          <img src={SearchImg} alt="search-img" width="12" />
        </RightSideBarContainerSearch>
        <ChatBoxDiv>
          <div>
            <img src={UserImg} alt="user-img" width="40" />
          </div>
          <ChatMessage>
            <ChatBoxPara>Alia Isfahan</ChatBoxPara>
            <ChatBoxSpan>I can help you funding</ChatBoxSpan>
          </ChatMessage>
        </ChatBoxDiv>
        <ChatBoxDiv>
          <div>
            <img src={UserImg} alt="user-img" width="40" />
          </div>
          <ChatMessage>
            <ChatBoxPara>Alia Isfahan</ChatBoxPara>
            <ChatBoxSpan>I can help you funding</ChatBoxSpan>
          </ChatMessage>
        </ChatBoxDiv>
        <ChatBoxDiv>
          <div>
            <img src={UserImg} alt="user-img" width="40" />
          </div>
          <ChatMessage>
            <ChatBoxPara>Alia Isfahan</ChatBoxPara>
            <ChatBoxSpan>I can help you funding</ChatBoxSpan>
          </ChatMessage>
        </ChatBoxDiv>
        <ChatBoxDiv>
          <div>
            <img src={UserImg} alt="user-img" width="40" />
          </div>
          <ChatMessage>
            <ChatBoxPara>Alia Isfahan</ChatBoxPara>
            <ChatBoxSpan>I can help you funding</ChatBoxSpan>
          </ChatMessage>
        </ChatBoxDiv> */}
      </ChatBoxContainer>
    </RightSideBarContainer>
  </Fragment>
);

export default ChatBox;

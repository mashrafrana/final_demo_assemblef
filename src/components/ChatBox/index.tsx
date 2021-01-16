import React, { Fragment } from 'react';

import { RightSideBarContainer, ChatBoxContainer } from './Styled';
import MeetingRoster from '../../containers/MeetingRoster';
import { EditVideoGrid } from '../EditVideoGrid';

const ChatBox = ({ showRoster }: any) => (
  <Fragment>
    <RightSideBarContainer>
      <ChatBoxContainer>
        {showRoster && <MeetingRoster />}
        <EditVideoGrid />
      </ChatBoxContainer>
    </RightSideBarContainer>
  </Fragment>
);

export default ChatBox;

// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Roster,
  RosterHeader,
  RosterGroup,
  useRosterState,
  RosterAttendee,
} from 'amazon-chime-sdk-component-library-react';
import { ParticipantVideo, RosterDiv } from './Styled';

import { useAppState } from '../providers/AppStateProvider';
import { useNavigation } from '../providers/NavigationProvider';

const MeetingRoster = () => {
  const { roster } = useRosterState();
  const [filter, setFilter] = useState('');
  const { closeRoster } = useNavigation();
  const { setRosterInfo } = useAppState();
  let attendees = Object.values(roster);

  if (filter) {
    attendees = attendees.filter((attendee: any) =>
      attendee?.name.toLowerCase().includes(filter.trim().toLowerCase())
    );
  }

  useEffect(() => {
    setRosterInfo(roster);
  }, [roster, setRosterInfo]);

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setFilter(e.target.value);
  };

  const attendeeItems = attendees.map((attendee: any) => {
    const { chimeAttendeeId } = attendee || {};
    return (
      <RosterAttendee key={chimeAttendeeId} attendeeId={chimeAttendeeId} />
    );
  });

  return (
    <RosterDiv>
      <ParticipantVideo>
        <div className="follower-list">
          <ul className="follower-ul">
            {Object.keys(roster).map((el, index) => (
              <li index={index}>
                <a rel="noopener noreferrer" href="javascript:void(null)">
                  <img
                    height="100%"
                    width="100%"
                    alt="no-image"
                    src="https://firebasestorage.googleapis.com/v0/b/assembly-dev-3c297.appspot.com/o/images%2Fusers%2Fdefault-user-image.png?alt=media&token=49e1855a-e4e2-428e-b5ed-9603b7d5e115"
                  />
                  <span className="follow-name">{roster[el].name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </ParticipantVideo>
      {/* <RosterHeader
        searchValue={filter}
        onSearch={handleSearch}
        onClose={closeRoster}
        title="Present"
        badge={attendees.length}
      />
      <RosterGroup>{attendeeItems}</RosterGroup> */}
    </RosterDiv>
  );
};

export default MeetingRoster;

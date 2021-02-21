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
    console.log('rosterrrrr222 meeting..........', roster);
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
    <Roster className="roster">
      <RosterHeader
        searchValue={filter}
        onSearch={handleSearch}
        onClose={closeRoster}
        title="Present"
        badge={attendees.length}
      />
      <RosterGroup>{attendeeItems}</RosterGroup>
    </Roster>
  );
};

export default MeetingRoster;

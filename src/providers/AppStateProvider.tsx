// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useContext, useState, ReactNode } from 'react';

type Props = {
  children: ReactNode;
};

interface AppStateValue {
  meetingId: string;
  localUserName: string;
  theme: string;
  region: string;
  attendeeId: string;
  isHost: boolean;
  rosterList: array;
  toggleTheme: () => void;
  setAppMeetingInfo: (
    meetingId: string,
    name: string,
    region: string,
    attendeeId: string,
    isHost: boolean
  ) => void;
  setRosterInfo: (rosterList: array)
}

const AppStateContext = React.createContext<AppStateValue | null>(null);

export function useAppState(): AppStateValue {
  const state = useContext(AppStateContext);

  if (!state) {
    throw new Error('useAppState must be used within AppStateProvider');
  }

  return state;
}

const query = new URLSearchParams(location.search);

export function AppStateProvider({ children }: Props) {
  const [meetingId, setMeeting] = useState(query.get('meetingId') || '');
  const [region, setRegion] = useState(query.get('region') || '');
  const [localUserName, setLocalName] = useState('');
  const [isHost, setIsHost] = useState(false);
  const [attendeeId, setAttendeeId] = useState('');
  const [rosterList, setRosterList] = useState([]);
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem('theme');
    return storedTheme || 'light';
  });

  const toggleTheme = (): void => {
    if (theme === 'light') {
      setTheme('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setTheme('light');
      localStorage.setItem('theme', 'light');
    }
  };

  const setAppMeetingInfo = (
    meetingId: string,
    name: string,
    region: string,
    isHost: boolean,
    attendeeId: string
  ) => {
    setRegion(region);
    setMeeting(meetingId);
    setLocalName(name);
    setIsHost(isHost);
    setAttendeeId(attendeeId);
  };

  const setRosterInfo = (rosterList: array) => {
    console.log('setting......')
    setRosterList(rosterList);
  }

  const providerValue = {
    meetingId,
    localUserName,
    theme,
    region,
    attendeeId,
    isHost,
    toggleTheme,
    setAppMeetingInfo,
    rosterList,
    setRosterInfo
  };

  return (
    <AppStateContext.Provider value={providerValue}>
      {children}
    </AppStateContext.Provider>
  );
}

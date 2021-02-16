// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, { useState, Fragment } from 'react';
import {
  //     FeaturedRemoteVideos,
  RemoteVideo,
  //     ContentShare,
  useRemoteVideoTileState,
  useRosterState,
  useMeetingManager,
  useAudioVideo,
} from 'amazon-chime-sdk-component-library-react';
import { useAppState } from '../../providers/AppStateProvider';
// import vp from  "./video-placeholder.jpg";
import fblive from './fblive.png';
import logo from './logo.png';
import { AddLogo } from './Styled';

export const EditVideoGrid: React.FC<Props> = ({ isSetting }) => {
  // const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();
  // const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const { isHost, attendeeId } = useAppState();
  const [attendeeIdList, setAttendeeIdList] = useState([]);
  const audioVideo = useAudioVideo();
  // const videoHandler = (tileId: number) => {
  //   let lis: any = [];
  //   if (!attendeeIdList.includes(tileIdToAttendeeId[tileId])) {
  //     lis = [...attendeeIdList, tileIdToAttendeeId[tileId]];
  //     setAttendeeIdList(lis);
  //   } else {
  //     lis = attendeeIdList.filter(o => o !== tileIdToAttendeeId[tileId]);
  //     setAttendeeIdList(lis);
  //   }
  //   meetingManager.audioVideo.realtimeSendDataMessage(
  //     'attendeeIdList',
  //     lis,
  //     1000
  //   );
  //   console.log(attendeeIdList);
  // };

  // const addLocalVideo = () => {
  //   let lis: any = [];
  //   if (!attendeeIdList.includes(attendeeId)) {
  //     lis = [...attendeeIdList, attendeeId];
  //     setAttendeeIdList(lis);
  //   } else {
  //     lis = attendeeIdList.filter(o => o !== attendeeId);
  //     setAttendeeIdList(lis);
  //   }

  //   meetingManager.audioVideo.realtimeSendDataMessage(
  //     'attendeeIdList',
  //     lis,
  //     1000
  //   );
  // };

  const changeFillStyle = (color: string) => {
    document.getElementById('main_vdo_sec').style.background = color;
    meetingManager.audioVideo.realtimeSendDataMessage('bg', color, 1000);
    document.getElementById('color').value = color;
  };

  const fbGoLive = () => {
    FB.ui(
      {
        display: 'popup',
        method: 'live_broadcast',
        phase: 'create',
      },
      createRes => {
        let mediaRecorder;
        let mediaStream;
        FB.ui(
          {
            display: 'popup',
            method: 'live_broadcast',
            phase: 'publish',
            broadcast_data: createRes,
          },
          publishRes => {
            console.log(publishRes);
          }
        );
        const ws = new WebSocket(
          `wss://live.assemblyf.com:2053/rtmp/${encodeURIComponent(
            createRes.stream_url
          )}`
        );
        ws.addEventListener('open', e => {
          console.log('WebSocket Open', e);
          mediaStream = document.querySelector('canvas').captureStream(30); // 30 FPS
          const AudioContext = window.AudioContext || window.webkitAudioContext;
          const audioCtx = new AudioContext();
          const dest = audioCtx.createMediaStreamDestination();
          const localAudioStream: any =
            audioVideo.realtimeController.state.audioInput;
          const localAudio = audioCtx.createMediaStreamSource(localAudioStream);
          localAudio.connect(dest);
          const audio: any = audioVideo.audioMixController.audioStream;
          if (audio) {
            const partAudio = audioCtx.createMediaStreamSource(audio);
            partAudio.connect(dest);
          }
          if (dest.stream.getAudioTracks().length > 0) {
            mediaStream.addTrack(dest.stream.getAudioTracks()[0]);
          }
          mediaRecorder = new MediaRecorder(mediaStream, {
            mimeType: 'video/webm;codecs=h264',
            videoBitsPerSecond: 3000000,
          });
          mediaRecorder.addEventListener('dataavailable', e => {
            ws.send(e.data);
          });
          mediaRecorder.addEventListener('stop', ws.close.bind(ws));
          mediaRecorder.start(1000); // Start recording, and dump data every second
        });
        ws.addEventListener('close', e => {
          console.log('WebSocket Close', e);
          mediaRecorder.stop();
        });
      }
    );
  };
  const toggleLogo = () => {
    const logo = document.getElementById('logo').value;
    if (logo == 1) {
      document.getElementById('logo').value = 0;
      document.getElementById('logo_dp').style.display = 'none';
      meetingManager.audioVideo.realtimeSendDataMessage('logo', true, 1000);
    } else {
      meetingManager.audioVideo.realtimeSendDataMessage('logo', false, 1000);
      document.getElementById('logo_dp').style.display = '';
      document.getElementById('logo').value = 1;
    }
  };

  // meetingManager?.audioVideo?.realtimeSubscribeToReceiveDataMessage(
  //   'logo',
  //   (dataMessage: DataMessage) => {
  //     if (dataMessage.text() === 'true') {
  //       document.getElementById('logo_dp').style.display = 'none';
  //       document.getElementById('logo').value = 0;
  //     } else {
  //       document.getElementById('logo').value = 1;
  //       document.getElementById('logo_dp').style.display = '';
  //     }
  //   }
  // );

  // meetingManager?.audioVideo?.realtimeSubscribeToReceiveDataMessage(
  //   'bg',
  //   (dataMessage: DataMessage) => {
  //     document.getElementById(
  //       'main_vdo_sec'
  //     ).style.background = dataMessage.text();
  //   }
  // );

  return (
    <Fragment>
      {/* <div className="videoMembersBottom">
        {isHost && !isSetting
          ? tiles.map(tileId => {
              const attendee = roster[tileIdToAttendeeId[tileId]] || {};
              const { name }: any = attendee;
              return (
                <div key={tileId} className="Video">
                  <RemoteVideo
                    tileId={tileId}
                    name={name}
                    className="img-fluid_140"
                    key={tileId}
                  />
                  {isHost ? (
                    <input
                      type="button"
                      value={tileId}
                      style={{ width: '100px', height: '40px' }}
                      onClick={() => {
                        videoHandler(tileId);
                      }}
                    ></input>
                  ) : null}
                </div>
              );
            })
          : null}
      </div> */}
      {isHost && isSetting ? (
        <>
          <div
            style={{
              gridTemplateColumns: '75px 75px',
              gridTemplateRows: '20px',
              padding: '0px 0 0 0',
            }}
          >
            <AddLogo>
              <h4>Add logo</h4>
              <img
                src={logo}
                id="af_logo"
                style={{ width: '130px' }}
                onClick={() => toggleLogo()}
              />
              <hr />
            </AddLogo>

            {/* <AddLogo>
              <h4>Choose Background</h4>
              <div
                style={{
                  display: 'grid',
                  gridColumnGap: '20px',
                  gridTemplateColumns: '20px 20px 20px 20px 20px 20px',
                  gridTemplateRows: '20px',
                  padding: '10px 0 0 0',
                }}
              >
                <div
                  onClick={() => changeFillStyle('#FFF000')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'yellow',
                  }}
                ></div>
                <div
                  onClick={() => changeFillStyle('#000000')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'black',
                  }}
                ></div>
                <div
                  onClick={() => changeFillStyle('#FFFFFF')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: 'white',
                  }}
                ></div>
                <div
                  onClick={() => changeFillStyle('#FCAB86')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#FCAB86',
                  }}
                ></div>
                <div
                  onClick={() => changeFillStyle('#FFE087')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#FFE087',
                  }}
                ></div>
                <div
                  onClick={() => changeFillStyle('#00FF98')}
                  className="yellow"
                  style={{
                    border: 'solid 1px',
                    width: '30px',
                    height: '30px',
                    backgroundColor: '#00FF98',
                  }}
                ></div>
              </div>
            </AddLogo> */}
            {isHost && (
              <AddLogo>
                <h4>Facebook Go Live</h4>
                <img
                  onClick={fbGoLive}
                  src={fblive}
                  width="100px"
                  height="40px"
                />
                <hr />
              </AddLogo>
            )}
            {/* <AddLogo>
              <h4>Text</h4>
              <input type="text" />
            </AddLogo> */}
          </div>
        </>
      ) : null}
      <input type="hidden" id="logo"></input>
      <input type="hidden" id="color"></input>
    </Fragment>
  );
};

export default EditVideoGrid;

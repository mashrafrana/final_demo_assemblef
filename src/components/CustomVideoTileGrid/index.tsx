// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {Fragment} from 'react';
import { SpaceProps } from 'styled-system';
import {
//     VideoGrid,
    LocalVideo,
//     FeaturedRemoteVideos,
    RemoteVideo,
//     ContentShare,
    useFeaturedTileState,
    useLocalVideo,
    useRemoteVideoTileState,
    useContentShareState,
    useRosterState,
    useMeetingManager
} from 'amazon-chime-sdk-component-library-react';
import { useAppState } from '../../providers/AppStateProvider';
// import vp from  "./video-placeholder.jpg";
import ParticipantLocalVideo from '../ParticipantLocalVideo';
import fblive from "./fblive.png";
import logo from "./assemblyf.png";

const fluidStyles = `
  height: 100%;
  width: 100%;
`;

const staticStyles = `
  display: flex;
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  width: 20vw;
  max-height: 30vh;
  height: auto;

  video {
    position: static;
  }
`;
export interface BaseSdkProps {
  /** Optional css */
  css?: string;
  /** Optional class names to apply to the element */
  className?: string;
}

export interface BaseProps extends SpaceProps, BaseSdkProps {
  /** Optional tag to render the component as a different HTML tag */
  tag?: any;
}

export type Layout = 'standard' | 'featured' | null;

interface Props extends BaseProps {
  /** A component to render when there are no remote videos present */
  noRemoteVideoView?: React.ReactNode;
  /** The layout of the grid. */
  layout?: Layout;
}

export const CustomVideoTileGrid: React.FC<Props> = ({
  noRemoteVideoView,
  layout = "featured",
  ...rest
}) => {
  const { tileId: featureTileId } = useFeaturedTileState();
  const { tiles, tileIdToAttendeeId } = useRemoteVideoTileState();
  const { tileId: contentTileId } = useContentShareState();
  const { tileId,isVideoEnabled } = useLocalVideo();
  const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const { isHost } = useAppState();

    const changeFillStyle = (color: string) => {
       document.getElementById('main_vdo_sec').style.background = color;
       meetingManager.audioVideo.realtimeSendDataMessage("bg", color, 1000);
    }

    const fbGoLive = () => {
      FB.ui({
            display: 'popup',
            method: 'live_broadcast',
            phase: 'create'
          }, (createRes) => {
            console.log(createRes);
            let mediaRecorder;
            let mediaStream;

            FB.ui({
                display: 'popup',
                method: 'live_broadcast',
                phase: 'publish',
                broadcast_data: createRes
              }, (publishRes) => {
                console.log(publishRes);
              });
              console.log(createRes.stream_url)
            const ws = new WebSocket(
              'wss://13.212.108.68:3000' + // http: => ws:, https: -> wss:
              '/rtmp/' +
              encodeURIComponent(createRes.stream_url)
            );

            ws.addEventListener('open', (e) => {
              console.log('WebSocket Open', e);
              mediaStream = document.querySelector('canvas').captureStream(24); // 30 FPS
              mediaRecorder = new MediaRecorder(mediaStream, {
                mimeType: 'video/webm;codecs=h264',
                videoBitsPerSecond : 3000000
              });

              mediaRecorder.addEventListener('dataavailable', (e) => {
                ws.send(e.data);
              });
              mediaRecorder.addEventListener('stop', ws.close.bind(ws));
              mediaRecorder.start(1000); // Start recording, and dump data every second
            });

            ws.addEventListener('close', (e) => {
              console.log('WebSocket Close', e);
              mediaRecorder.stop();
            });
          });
        }

    const toggleLogo = () => {
      var logo = document.getElementById('logo').value
      if (logo == 1) {
        document.getElementById('logo').value = 0;
        document.getElementById('logo_dp').style.display = 'none';
        meetingManager.audioVideo.realtimeSendDataMessage("logo", true, 1000);
      } else {
        meetingManager.audioVideo.realtimeSendDataMessage("logo", false, 1000);
        document.getElementById('logo_dp').style.display = '';
        document.getElementById('logo').value = 1;
      }
    }
    meetingManager?.audioVideo?.realtimeSubscribeToReceiveDataMessage("logo", (dataMessage: DataMessage) => {
        console.log(dataMessage.text());
        if("true" === dataMessage.text()) {
            document.getElementById('logo_dp').style.display = 'none';
            document.getElementById('logo').value = 0;
        } else {
           document.getElementById('logo').value = 1;
           document.getElementById('logo_dp').style.display = '';
        }
     });

     meetingManager?.audioVideo?.realtimeSubscribeToReceiveDataMessage("bg", (dataMessage: DataMessage) => {
        document.getElementById('main_vdo_sec').style.background = dataMessage.text();
     });


  return (
        <Fragment>
    <div className={"DashboardMainContent"}>
      <div>
      <div id="main_vdo_sec" className={"VideoSection"}>
        <img id="logo_dp" src={logo} style={{margin: "0 20px 0 0", display: "none"}}/>
        <div className={"MainVideoWrapper"}>
          <div className={"Video"}>
            { featureTileId ? <RemoteVideo
                                tileId={featureTileId}
                                name={name}
                                className={"img-fluid_300"}
                                key={featureTileId}
                              /> :
                                <LocalVideo
                                    nameplate={"Me"}
                                    className={"img-fluid_300"}
                                />
            }
          </div>
          <div className={"MainVideoFourPerson"}>
            { featureTileId != null ?
                <div className={"Video"}>
                    <LocalVideo
                       nameplate={"Me"}
                       className={"img-fluid_140"}
                        />
                </div>
               : null
            }
            { tiles.filter(o => o !== featureTileId).map(tileId => {
                const attendee = roster[tileIdToAttendeeId[tileId]] || {};
                const { name }: any = attendee;
                return (
                  <div key={tileId} className={"Video"}>
                      <RemoteVideo
                        tileId={tileId}
                        name={name}
                        className={"img-fluid_140"}
                        key={tileId}
                      />
                  </div>
                );
               })}
          </div>
        </div>
      </div>
      <div className={"videoMembersBottom"}>
        {isVideoEnabled ?
            <ParticipantLocalVideo
            local= {true}
            tileId={tileId}
                />
          :null}
        { tiles.map(tileId => {
            return (
            
              <ParticipantLocalVideo
                local= {false}
                tileId={tileId}
                />
            );
        })}
{/* <>
<br/>
<br/>
<br/>

<LocalVideo
    nameplate={"Me"}
    className={"img-fluid"}
/>
<RemoteVideo
tileId={null}
name={null}
className={"img-fluid"}

/>

</> */}

      </div>
        { isHost ?
            <><img onClick={fbGoLive} src={fblive} width="100px" height="40px"/>
            <div style={{display: 'grid', gridColumnGap: '20px',gridTemplateColumns: '5px 5px 5px 5px 5px 5px',gridTemplateRows: '20px', padding: '10px 0 0 0'}}>
            <div onClick={() => changeFillStyle('#FFF000')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'yellow' }}></div>
            <div onClick={() => changeFillStyle('#000000')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'black' }}></div>
            <div onClick={() => changeFillStyle('#FFFFFF')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'white' }}></div>
            <div onClick={() => changeFillStyle('#FCAB86')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#FCAB86' }}></div>
            <div onClick={() => changeFillStyle('#FFE087')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#FFE087' }}></div>
            <div onClick={() => changeFillStyle('#00FF98')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#00FF98' }}></div>
          </div>
          <div onClick={() => toggleLogo()} style={{float:'right',width: '100px',height: '20px',fontSize: 'small',marginRight: '160px',cursor: 'pointer'}}>
            <img src={logo} id="af_logo"/>
          </div> </>: null
      }
      </div>
      </div>
      <input type='hidden' id='logo'></input>
    </Fragment>
  );
};

export default CustomVideoTileGrid;

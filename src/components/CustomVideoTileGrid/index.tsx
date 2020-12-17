// Copyright 2020 Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

import React, {useState ,Fragment, useEffect} from 'react';
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
    useMeetingManager,
    useAudioVideo
} from 'amazon-chime-sdk-component-library-react';
import { useAppState } from '../../providers/AppStateProvider';
// import vp from  "./video-placeholder.jpg";
import ParticipantLocalVideo from '../ParticipantLocalVideo';
import fblive from "./fblive.png";
import logo from "./assemblyf.png";


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
  const { tiles, tileIdToAttendeeId ,attendeeIdToTileId } = useRemoteVideoTileState();
  const { tileId: contentTileId } = useContentShareState();
  const { tileId: localVideoTileId, isVideoEnabled } = useLocalVideo();
  const { roster } = useRosterState();
  const meetingManager = useMeetingManager();
  const { isHost , attendeeId } = useAppState();
  const [attendeeIdList  ,setAttendeeIdList] = useState([]);
  // const featureTileId = useState(_featureTileId);
  const audioVideo = useAudioVideo();
  var c :any = [];

  // const attendeeId = audioVideoController.configuration.credentials.attendeeId;
  useEffect(()=>{

    let isMounted = true
    meetingManager?.audioVideo?.realtimeSubscribeToReceiveDataMessage("attendeeIdList", (dataMessage: DataMessage) => { 
      
      if (isMounted) 
      {
        changeState(dataMessage.text());
      }  
    })
    setInterval(function(){draw();}, 25);
    return () => { isMounted = false };
   
  },[]);
    
  const changeState = (data:any)=>{
      c = []; 
      const listAttendee = data.replace('[','').replace(']','').split(',');
      listAttendee.forEach((element:any) => {
         c.push(element.replace('"','').replace('"','').toString());
      });
      console.log(c);
      setAttendeeIdList(c);
    }

  const videoHandler = (tileId : number) => {
      
      let lis :any = [];  
      if(!(attendeeIdList.includes(tileIdToAttendeeId[tileId]))){
        lis = [...attendeeIdList , tileIdToAttendeeId[tileId]];
        setAttendeeIdList(lis);        
      }
      else{
        lis =  attendeeIdList.filter(o => o !== tileIdToAttendeeId[tileId]);
        setAttendeeIdList(lis);
      }
      meetingManager.audioVideo.realtimeSendDataMessage("attendeeIdList", lis, 1000);
      console.log(attendeeIdList);
  
    }

  const addLocalVideo = () => {      
        let lis :any = [];  
        if(!(attendeeIdList.includes(attendeeId))){
        
          lis = [...attendeeIdList , attendeeId];
          setAttendeeIdList(lis);        
          
        }
        else{
          lis =  attendeeIdList.filter(o => o !== attendeeId);
          setAttendeeIdList(lis);
        }

      meetingManager.audioVideo.realtimeSendDataMessage("attendeeIdList", lis, 1000);
      
    }
  
  const changeFillStyle = (color: string) => {
       document.getElementById('main_vdo_sec').style.background = color;
       meetingManager.audioVideo.realtimeSendDataMessage("bg", color, 1000);
       document.getElementById('color').value = color;
    }
  
  const fbGoLive = () => {    
          FB.ui({
                display: 'popup',
                method: 'live_broadcast',
                phase: 'create'
              }, (createRes) => {
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
    
                const ws = new WebSocket(
                  window.location.origin.replace("http", "ws") +
                  '/rtmp/' +
                  encodeURIComponent(createRes.stream_url)
                );
    
                ws.addEventListener('open', (e) => {
                  console.log('WebSocket Open', e);
                  mediaStream = document.querySelector('canvas').captureStream(60); // 30 FPS
                  var AudioContext = window.AudioContext || window.webkitAudioContext;
                    const audioCtx = new AudioContext();
                    var dest = audioCtx.createMediaStreamDestination();
                    var localAudioStream: any = audioVideo.realtimeController.state.audioInput;
                    var localAudio = audioCtx.createMediaStreamSource(localAudioStream);
                    localAudio.connect(dest);
                    var audio: any = audioVideo.audioMixController.audioStream;
                    if(audio){
                        var partAudio = audioCtx.createMediaStreamSource(audio);
                        partAudio.connect(dest);
                    }
                  if (dest.stream.getAudioTracks().length > 0) {
                    mediaStream.addTrack(dest.stream.getAudioTracks()[0]);
                  }
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
  
  const draw = () => {
      var init_x = 60;
      var init_y = 60;
      var big_img_width = 400
      var big_img_height = 225
      var small_img_width = 169
      var small_img_height = 99
      var gap = 20
      // var all_videos = document.getElementsByClassName('canvas_vdo')
      // var all_videos_filtered = [];
      // for (var i = 0; i < all_videos.length; i++) {
      //   if(all_videos[i].attributes["data-active"].nodeValue == "true")
      //     all_videos_filtered.push(all_videos[i])
      // }
      // var video = []
      // for (var i = 0; i < all_videos_filtered.length; i++) {
      //   if(all_videos_filtered[i].className.indexOf('ch-featured-tile') != -1)
      //     video.push(all_videos_filtered[i])
      // }
      // for (var i = 0; i < all_videos_filtered.length; i++) {
      //   if(all_videos_filtered[i].className.indexOf('ch-featured-tile') == -1)
      //     video.push(all_videos_filtered[i]) 
      // }
      var canvas = document.getElementById("canvas");
      var video:any = [];
      var ctx = canvas?.getContext('2d');
      if(ctx){
        var color = document.getElementById('color').value;
        if(color)
          ctx.fillStyle = color
          ctx.fillRect(0,0, 900, 350)
        var logo = document.getElementById('logo').value;
        if (logo == 1 || logo == '1'){
          var img = document.getElementById('af_logo');
          ctx.drawImage(img, init_x + big_img_width + gap*2 + small_img_width*2 - 150, 10, 126, 46)
        }
      }

      var x1 = document.querySelector(".MainVideoWrapper video");
      video.push(x1);
      var x2 = document.querySelectorAll(".MainVideoFourPerson Video");
      for(let j =0; j < x2.length; j++){
        video.push(x2[j]);
      }
      

      // var x3 = document.querySelectorAll("ch-video");
      // video.push(x3);

      if(video && ctx){
        for (let i = 0; i < video.length; i ++){
          if(i == 0)
            ctx.drawImage(video[i], init_x, init_y, big_img_width, big_img_height);
          else if (i == 1) {
            ctx.drawImage(video[i], init_x + big_img_width + gap, init_y, small_img_width, small_img_height);  
          }
          else if (i == 2) {
            ctx.drawImage(video[i], init_x + big_img_width + small_img_width + gap*2, init_y, small_img_width, small_img_height);  
          }
          else if (i == 3) {
            ctx.drawImage(video[i], init_x + big_img_width + gap, init_y + small_img_height + gap, small_img_width, small_img_height);  
          }
          else if (i == 4) {
            ctx.drawImage(video[i], init_x + big_img_width + small_img_width + gap * 2, init_y + small_img_height + gap, small_img_width, small_img_height);  
          }

        }
      }
      // if(all_videos_filtered_.length != all_videos_filtered.length){
      //   for (var i = 0; i < all_videos_filtered.length; i++){
      //     all_videos_filtered_ = []
      //     all_videos_filtered_.push(all_videos_filtered[i])
      //   }
      // }
    }

    
  return (
      <Fragment>
         { isHost ? <canvas id="canvas" width="900" height="350" style={{borderRadius: '20px',backgroundColor:'red', display:''}}></canvas>:null}           
          <div className={"DashboardMainContent"}>
              <div id="main_vdo_sec" className={"VideoSection"}>
                <img id="logo_dp" src={logo} style={{margin: "0 20px 0 0", display: "none"}}/>
                <div className={"MainVideoWrapper"}>
                  <div className={"Video"}>
                      {attendeeIdList.includes(tileIdToAttendeeId[featureTileId])?
                        attendeeIdList.filter(o=> o === tileIdToAttendeeId[featureTileId]).map(featureAttendeeId => {
                          return (
                            <>
                              {featureTileId ?
                                    <ParticipantLocalVideo
                                        tileId={featureTileId}
                                        className ={"img-fluid_300"}
                                        />
                                        :
                                        <ParticipantLocalVideo
                                        tileId={localVideoTileId}
                                        className ={"img-fluid_300"}
                                        />
                              }
                            </>
                          );
                        })
                        :
                        attendeeIdList.filter(o=> o !== attendeeIdToTileId[featureTileId]).map(remoteAttendeeId => {
                          let tileId = attendeeIdToTileId[remoteAttendeeId];
                          
                          if(remoteAttendeeId === attendeeId){
                               return (
                                <ParticipantLocalVideo
                                      tileId={localVideoTileId}
                                      className ={"img-fluid_300"}
                                    />    
                          );
                          }
                        })
                      }
                  </div>
                  <div className={"MainVideoFourPerson"}>
                    {attendeeIdList.filter(o=> o !== attendeeIdToTileId[featureTileId]).map(remoteAttendeeId => {
                        let tileId = attendeeIdToTileId[remoteAttendeeId];
                        const attendee = roster[tileIdToAttendeeId[tileId]] || {};
                        const { name }: any = attendee;
                       
                        return (
                          <>
                            { featureTileId !== tileId ? 
                                  <div key={tileId} className={"Video"}>
                                    { remoteAttendeeId === attendeeId ?
                                      <ParticipantLocalVideo
                                            tileId={localVideoTileId}
                                            className ={"img-fluid_140"}
                                          />                                          
                                      :                                    
                                      <ParticipantLocalVideo
                                        tileId={tileId}
                                        className ={"img-fluid_140"}
                                        />
                                    }
                                  </div>
                            :null}
                              
                            {/* {remoteAttendeeId === attendeeId ?
                              <div key={tileId} className={"Video"}>
                                  <ParticipantLocalVideo
                                    tileId={tileId}
                                    className ={"img-fluid_140"}
                                    />
                              </div>
                            :null}
                            {featureTileId !== tileId ?
                              <div key={tileId} className={"Video"}>
                                  <ParticipantLocalVideo
                                    tileId={tileId}
                                    className ={"img-fluid_140"}
                                    />
                              </div>
                            :null} */}
                          </>
                          );
                      })
                    }
                  </div>
                </div>
              </div>
            <div className={"videoMembersBottom"}>              
              <div>
                <LocalVideo
                        nameplate={"Me"}
                        className={"img-fluid_140"}
                    />
                   {isHost ? <input type="button" value="off" style={{width : "100px",height:'40px'}} 
                              onClick={() =>{
                                addLocalVideo();  
                                }} /> : null }
              </div>
            { isHost ?
             tiles.map(tileId => {               
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
                              {isHost ?<input type="button" value={tileId} style={{width : "100px",height:'40px'}} 
                              onClick={() =>{
                                videoHandler(tileId);  
                                }} ></input>:null}
                          </div>
                        );
            }):null}
            </div>
              { isHost ?
                  <>
                  <div style={{display: 'grid', gridColumnGap: '60px',gridTemplateColumns: '75px 75px',gridTemplateRows: '20px', padding: '90px 0 0 0'}}>
                      <img onClick={fbGoLive} src={fblive} width="100px" height="40px"/>
                      <img src={logo} id="af_logo" onClick={() => toggleLogo()}/>
                   </div>   
                  <div style={{marginTop : '30px' , display: 'grid', gridColumnGap: '20px',gridTemplateColumns: '5px 5px 5px 5px 5px 5px',gridTemplateRows: '20px', padding: '10px 0 0 0'}}>
                  <div onClick={() => changeFillStyle('#FFF000')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'yellow' }}></div>
                  <div onClick={() => changeFillStyle('#000000')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'black' }}></div>
                  <div onClick={() => changeFillStyle('#FFFFFF')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'white' }}></div>
                  <div onClick={() => changeFillStyle('#FCAB86')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#FCAB86' }}></div>
                  <div onClick={() => changeFillStyle('#FFE087')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#FFE087' }}></div>
                  <div onClick={() => changeFillStyle('#00FF98')} className={"yellow"} style={{border: 'solid 1px', width: '20px', height: '20px', backgroundColor:'#00FF98' }}></div>
                </div>
                </>: null
              }
              <input type='hidden' id='logo'></input>
              <input type='hidden' id='color'></input>
               
          </div>  

      </Fragment>
     
    );
};

export default CustomVideoTileGrid;

import React, {Fragment} from "react";
import vp from  "./video-placeholder.jpg";

const VideoContainer = () => {
  return (
    <Fragment>
    <div className={"DashboardMainContent"}>
      <div>
      <div className={"VideoSection"}>
        <div className={"MainVideoWrapper"}>
          <div className={"Video"}>
            <img
              src={vp}
              alt="img"
              className="img-fluid"
            />
          </div>
          <div className={"MainVideoFourPerson"}>
            <div className={"Video"}>
              <img
                src={vp}
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className={"Video"}>
              <img
                src={vp}
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className={"Video"}>
              <img
                src={vp}
                alt="img"
                className="img-fluid"
              />
            </div>
            <div className={"Video"}>
              <img
                src={vp}
                alt="img"
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={"videoMembersBottom"}>
        <img
          src={vp}
          alt="img"
          className="img-fluid"
          width="100"
        />
        <img
          src={vp}
          alt="img"
          className="img-fluid"
          width="100"
        />
        <img
          src={vp}
          alt="img"
          className="img-fluid"
          width="100"
        />
        <img
          src={vp}
          alt="img"
          className="img-fluid"
          width="100"
        />
      </div>
      </div>
      </div>
    </Fragment>
  );
};

export default VideoContainer;

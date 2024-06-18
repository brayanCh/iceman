import { useCallback, useEffect, useState } from "react";

// HostShareScreen is the component that contains the host's screen share.
// It is only visible to the host and it shows the game the host is sharing
// and info about the webrtc stream.
const HostShareScreen = (): React.ReactElement => {
  // time is a string that represents the time since the host started the session.
  // start is the time when the host started the session.
  const [time, setTime] = useState<string>("00:00:00");
  const [start] = useState<Date>(new Date());

  // updateTime is a function that will get a new date and update the time.
  // based on the difference between the new date and the start date.
  const updateTime = useCallback(() => {
    let date = new Date();
    date = new Date(date.getTime() - start.getTime());
    setTime(date.toISOString().substring(11, 19));
  }, [start]);

  // update the time every second.
  useEffect(() => {
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [updateTime]);

  return (
    <div className="host-share-screen">
      <nav className="host-share-screen__bar">
        <div className="host-share-screen__bar__left">
          <div className="host-share-screen__bar__left__logo">☃️</div>
          <h2 className="host-share-screen__bar__left__title">
            Ice Man | Session time: {time}
          </h2>
        </div>
        {/*
        <div className="host-share-screen__bar__right">
          <div className="host-share-screen__bar__right__button">End Game</div>
        </div>
        */}
      </nav>
      <div className="host-share-screen__content">
        <div className="host-share-screen__content__screen">
          <div className="host-share-screen__content__screen_recording">
          </div>
        </div>
        <div className="host-share-screen__content__info">
        </div>
      </div>
    </div>
  );
};

export default HostShareScreen;

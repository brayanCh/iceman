import { DesktopCapturerSource } from "electron";
import { JSX, createSignal } from "solid-js";

// HostShareScreen is the component that contains the host's screen share.
// It is only visible to the host and it shows the game the host is sharing
// and info about the webrtc stream.
const HostShareScreen = (): JSX.Element => {
  const [time, setTime] = createSignal<string>("00:00:00");
  const [start, setStart] = createSignal<Date>(new Date());
  const [isSelectingVideo, setIsSelectingVideo] = createSignal<boolean>(false);
  const [sources, setSources] = createSignal<DesktopCapturerSource[]>([]);

  // updateTime is a function that will get a new date and update the time.
  // based on the difference between the new date and the start date.
  const updateTime = (): void => {
    let date = new Date();
    date = new Date(date.getTime() - start().getTime());
    setTime(date.toISOString().substring(11, 19));
  };

  const shareScreen = async (): Promise<void> => {
    let srcs: DesktopCapturerSource[] =
      await window.capture.getAvailableWindows();
    setIsSelectingVideo(true);
    setSources(srcs);
  };

  const handleStream = async (sourceId: string) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          mandatory: {
            chromeMediaSource: "desktop",
            chromeMediaSourceId: sourceId,
            minWidth: 1280,
            maxWidth: 1280,
            minHeight: 720,
            maxHeight: 720,
          },
        },
      });

      let videoTag = document.getElementById("video-host");

      videoTag.srcObject = stream;
      videoTag.onloadedmetadata = () => videoTag.play();
    } catch (e) {}
  };

  return (
    <div class="host-share-screen">
      <nav class="host-share-screen__bar">
        <div class="host-share-screen__bar__left">
          <div class="host-share-screen__bar__left__logo">☃️</div>
          <h2 class="host-share-screen__bar__left__title">
            Ice Man | Session time: {time()}
          </h2>
        </div>
        <button
          class="host-share-screen__bar__right__button"
          onClick={() => shareScreen()}
        >
          Share Screen
        </button>
      </nav>
      <div class="host-share-screen__content">
        <div class="host-share-screen__content__screen">
          <video
            id="video-host"
            controls
            class="host-share-screen__content__screen_recording"
          />
        </div>
        <div class="host-share-screen__content__info"></div>
      </div>
      {isSelectingVideo() && (
        <div class="host_modal">
          {sources().map((source) => (
            <button onClick={() => handleStream(source.id)}>
              {source.name}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default HostShareScreen;

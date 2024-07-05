import { DesktopCapturerSource } from "electron";
import { JSX, createSignal } from "solid-js";
import Styles from "./host_share_screen.module.css";

// HostShareScreen is the component that contains the host's screen share.
// It is only visible to the host and it shows the game the host is sharing
// and info about the webrtc stream.
const HostShareScreen = (): JSX.Element => {
  const [time, setTime] = createSignal<string>("00:00:00");
  const [start, setStart] = createSignal<Date>(new Date());
  const [isSelectingVideo, setIsSelectingVideo] = createSignal<boolean>(false);
  const [sources, setSources] = createSignal<DesktopCapturerSource[]>([]);
  let interval: number;

  // updateTime is a function that gets a new date and update the time.
  // based on the difference between the new date and the start date.
  const updateTime = (): void => {
    let date = new Date();
    date = new Date(date.getTime() - start().getTime());
    setTime(date.toISOString().substring(11, 19));
  };

  // shareScreen is a function that will get from electron the
  // app availables for sharing and will put a modal in the screen
  // so the user can choose
  const shareScreen = async (): Promise<void> => {
    clearInterval(interval);
    let srcs: DesktopCapturerSource[] =
      await window.capture.getAvailableWindows();
    setSources(srcs);
    setIsSelectingVideo(true);
  };

  // shareScreen is a function that will set the app that
  // is going to be shared, and start the timer in the ui
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

      setStart(new Date());
      interval = window.setInterval(updateTime, 1000);
    } catch (e) {
      console.error(e, "error in handleStream, host_share_screen");
    }
    setIsSelectingVideo(false);
  };

  return (
    <div class={Styles.page}>
      <nav class={Styles.navbar}>
        <div class={Styles.leftBar}>
          <div>☃️</div>
          <h2 class={Styles.leftBarTitle}>Ice Man | Session time: {time()}</h2>
        </div>
        <button class={Styles.rightBar} onClick={() => shareScreen()}>
          Share Screen
        </button>
      </nav>
      <div class={Styles.content}>
        <div class={Styles.screen}>
          <video id="video-host" controls class={Styles.recording} />
        </div>
        <div class={Styles.info}></div>
      </div>
      {isSelectingVideo() && (
        <div class={Styles.modal}>
          <div class={Styles.modalContent}>
            {sources().map((source) => (
              <button
                class={Styles.modalItem}
                onClick={() => handleStream(source.id)}
              >
                {source.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HostShareScreen;

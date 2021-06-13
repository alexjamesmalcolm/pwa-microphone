import { useCallback, useMemo, useState } from "react";

export const useMicrophone = () => {
  const [audio, setAudio] = useState<MediaStream>();
  const connect = useCallback(async () => {
    await navigator.mediaDevices
      .getUserMedia({ audio: true, video: false })
      .then(setAudio);
  }, []);
  const disconnect = useCallback(() => {
    if (audio) {
      audio.getTracks().forEach((track) => track.stop());
      setAudio(undefined);
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: false })
        .then((mediaStream) =>
          mediaStream.getTracks().forEach((track) => track.stop())
        );
    }
  }, [audio]);
  return useMemo(
    () => ({ connect, disconnect, audio }),
    [audio, connect, disconnect]
  );
};

import { AudioAnalyzer } from "./AudioAnalyzer";
import { useMicrophone } from "./useMicrophone";

const App = () => {
  const { audio, connect, disconnect } = useMicrophone();
  return (
    <div>
      <div>
        {!audio && <button onClick={connect}>Connect</button>}
        {audio && <button onClick={disconnect}>Disconnect</button>}
      </div>
      <div>{audio && <AudioAnalyzer audio={audio} />}</div>
    </div>
  );
};

export default App;

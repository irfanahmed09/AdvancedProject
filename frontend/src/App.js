import React from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";
import Command from "./components/commands";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      recordState: null,
      audioData: null,
    };
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
    });
  };

  pause = () => {
    this.setState({
      recordState: RecordState.PAUSE,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
    });
  };

  onStop = (data) => {
    this.setState({
      audioData: data,
    });
    console.log("This is data url : ", data.url);
    this.sendToServer(data.url);
    console.log("onStop: audio data", data);
  };

  sendToServer = async (mediaBlob) => {
    console.log("sending blob to server.");
    if (mediaBlob != null) {
      var xhr_get_audio = new XMLHttpRequest();
      xhr_get_audio.open("GET", mediaBlob, true);
      xhr_get_audio.responseType = "blob";
      xhr_get_audio.onload = function (e) {
        if (this.status === 200 && this.readyState === 4) {
          console.log("this blob is: ", this.response);
          var blob = this.response;
          //send the blob to the server
          var xhr_send = new XMLHttpRequest();
          var fd = new FormData();
          fd.append("audio_data", blob);
          xhr_send.open("POST", "/receive-audio", true);
          // xhr_send.onload = function (e) {
          //   if (this.status === 200 && this.readyState == 4) {
          //     console.log(this.response);
          //     alert("Hooray!");
          //   } else {
          //     console.log(this.response);
          //     alert("Error");
          //   }
          // };
          xhr_send.send(fd);
        }
      };
      xhr_get_audio.send();
    }
  };

  render() {
    const { recordState } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col-sm">
            <AudioReactRecorder
              state={recordState}
              onStop={this.onStop}
              backgroundColor="#99ccff"
            />
            <audio
              id="audio"
              controls
              src={this.state.audioData ? this.state.audioData.url : null}
            ></audio>
            <div className="row">
              <button
                className="btn btn-primary"
                id="record"
                onClick={this.start}
              >
                Start
              </button>
              <button
                className="btn btn-warning"
                id="pause"
                onClick={this.pause}
              >
                Pause
              </button>
              <button className="btn btn-danger" id="stop" onClick={this.stop}>
                Stop
              </button>
            </div>
          </div>
          <div className="command-container bg-secondary rounded col-sm">
            <Command />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

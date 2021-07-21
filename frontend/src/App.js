import React from "react";

import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";
import Command from "./components/commands";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.commandRef = React.createRef();

    this.state = {
      recordState: null,
      audioData: null,
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
    };
  }

  start = () => {
    this.setState({
      recordState: RecordState.START,
      showStart: false,
      showStop: true,
      showUpload: false,
    });
  };

  stop = () => {
    this.setState({
      recordState: RecordState.STOP,
      showStart: false,
      showStop: false,
      showUpload: true,
      disableCancel: false,
    });
    //this.commandRef.current.incrementCommand();
  };

  upload = () => {
    this.setState({
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
    });

    var data = this.state.audioData;
    this.commandRef.current.incrementCommand();
    var command_name = this.commandRef.current.getCurrentText();
    console.log(command_name);
    console.log("This is data url : ", data.url);
    this.sendToServer(data.url, command_name);
    //this.testFun();
    console.log("onStop: audio data", data);
  };

  cancel = () => {
    this.setState({
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
    });
    console.log("Cancelled");
  };

  onStop = (data) => {
    this.setState({
      audioData: data,
    });
  };

  sendToServer = async (mediaBlob, command_name) => {
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
          //fd.append("command_name", "setout");
          xhr_send.open("POST", "/receive-audio", true);
          xhr_send.setRequestHeader("command_name", command_name);
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

  testFun = () => {
    console.log("Sent blob to server.");
  };

  render() {
    const { recordState, showStart, showStop, showUpload, disableCancel } =
      this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div hidden>
              <AudioReactRecorder state={recordState} onStop={this.onStop} />
            </div>
            <div className="command-container rounded col-sm">
              <Command ref={this.commandRef} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            {showStart && (
              <button
                className="btn btn-primary btn-lg"
                id="record"
                style={{ height: "100px", width: "25%" }}
                onClick={this.start}
              >
                Start
              </button>
            )}
            {showStop && (
              <button
                className="btn btn-danger btn-lg"
                id="stop"
                style={{ height: "100px", width: "25%" }}
                onClick={this.stop}
              >
                Stop
              </button>
            )}
            {showUpload && (
              <button
                className="btn btn-success btn-lg"
                id="upload"
                style={{ height: "100px", width: "25%" }}
                onClick={this.upload}
              >
                Next
              </button>
            )}
            {
              <button
                className="btn btn-danger btn-lg offset-lg-2"
                id="cancel"
                style={{ height: "100px", width: "25%" }}
                onClick={this.cancel}
                disabled={disableCancel}
              >
                Cancel
              </button>
            }
          </div>
        </div>
        <div className="row m-4">
          <div className="col text-center">
            <audio
              id="audio"
              controls
              src={this.state.audioData ? this.state.audioData.url : null}
            ></audio>
            <p>
              <i>Click to hear what you've recorded.</i>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

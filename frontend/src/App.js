import React from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";
import Command from "./components/commands";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.commandRef = React.createRef();
    this.state = {
      userId: "",
      recordState: null,
      audioData: null,
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
      showCancel: true,
      showAudio: true,
      showSurvey: false,
      googleFormLink:
        "https://docs.google.com/forms/d/e/1FAIpQLSfDjiBwRF0ih3ERrvPIzb5n3Nvam1huhTQaF7xgd3eHS9SGqg/viewform?usp=pp_url&entry.121201065=",
    };
  }

  componentDidMount() {
    const uuid = uuidv4();
    var link = this.state.googleFormLink + uuid;
    this.setState({
      userId: uuid,
      googleFormLink: link,
    });

    this.sendUserIdToServer({ uuid: uuid });
  }

  sendUserIdToServer = async (formData) => {
    //console.log(formData);

    await axios.post("/receive-userData", formData);
    //console.log("Done");
  };

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
    var userId = this.state.userId;
    console.log(command_name);
    console.log("This is data url : ", data.url);
    this.sendToServer(data.url, command_name, userId);
    //this.testFun();
    console.log("onStop: audio data", data);
  };

  survey = () => {
    this.setState({
      showStart: false,
      showCancel: false,
      showAudio: false,
      showSurvey: true,
    });
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

  sendToServer = async (mediaBlob, command_name, userId) => {
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
          xhr_send.setRequestHeader("command_name", command_name);
          console.log(command_name, userId);
          xhr_send.setRequestHeader("userId", userId);
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
    const {
      recordState,
      showStart,
      showStop,
      showUpload,
      disableCancel,
      showCancel,
      showSurvey,
      googleFormLink,
      showAudio,
    } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div hidden>
              <AudioReactRecorder state={recordState} onStop={this.onStop} />
            </div>

            <div className="command-container rounded col-sm">
              <Command ref={this.commandRef} survey={this.survey} />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-12 text-center">
            {showStart && (
              <button
                className="btn btn-primary btn-lg"
                id="record"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.start}
              >
                Start
              </button>
            )}
            {showStop && (
              <button
                className="btn btn-danger btn-lg"
                id="stop"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.stop}
              >
                Stop
              </button>
            )}
            {showUpload && (
              <button
                className="btn btn-success btn-lg"
                id="upload"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.upload}
              >
                Next
              </button>
            )}
            {showCancel && (
              <button
                className="btn btn-danger btn-lg offset-lg-2"
                id="cancel"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.cancel}
                disabled={disableCancel}
              >
                Cancel
              </button>
            )}
          </div>
        </div>
        <div className="row m-4">
          {showAudio && (
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
          )}
        </div>
        <div className="row m-4">
          {showSurvey && (
            <div className="col text-center">
              <p>
                <i>Please proceed to survey.</i>
              </p>
              <a
                href={googleFormLink}
                className="btn btn-primary btn-lg text-center"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
              >
                Survey
              </a>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import AudioReactRecorder, { RecordState } from "audio-react-recorder";
import "audio-react-recorder/dist/index.css";

class Trial extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [
        "open the browser",
        "print out",
        "play a song",
        "restart computer",
        "close the browser",
      ],
      index: 0,
      currentText: "",
      endOfCommands: false,
      progress: 0,
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
      showCancel: true,
      showAudio: true,
      completeTrial: false,
    };
  }

  componentDidMount() {
    var text = this.state.text;
    this.setState({
      currentText: text[0],
    });
  }

  incrementCommand() {
    var { index, text } = this.state;
    var progress = Math.floor(((index + 1) / text.length) * 100);
    index = index + 1;
    if (index >= text.length) {
      this.setState({
        index: text.length,
        endOfCommands: true,
        progress: 100,
      });
      this.complete();
    } else {
      this.setState({
        index: index,
        currentText: text[index],
        progress: progress,
      });
    }
  }

  complete = () => {
    this.setState({
      showStart: false,
      showCancel: false,
      showAudio: false,
      completeTrial: true,
    });
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
    this.incrementCommand();
    var command_name = this.state.currentText;
    console.log(command_name);
    console.log("This is data url : ", data.url);
    //this.sendToServer(data.url, command_name, userId);
    this.testFun();
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

  testFun = () => {
    console.log("Sent blob to server.");
  };

  loadRealApp = () => {
    this.props.real();
  };

  retry = () => {
    var text = this.state.text;
    this.setState({
      text: [
        "open the browser",
        "print out",
        "play a song",
        "restart computer",
        "close the browser",
      ],
      index: 0,
      currentText: text[0],
      endOfCommands: false,
      progress: 0,
      recordState: null,
      audioData: null,
      showStart: true,
      showStop: false,
      showUpload: false,
      disableCancel: true,
      showCancel: true,
      showAudio: true,
      completeTrial: false,
    });
  };

  render() {
    const {
      currentText,
      endOfCommands,
      progress,
      recordState,
      showStart,
      showStop,
      showUpload,
      disableCancel,
      showCancel,
      showAudio,
      completeTrial,
    } = this.state;

    let displayText;

    if (endOfCommands) {
      displayText = (
        <div
          className="text-white m-2 rounded text-center bg-success"
          style={{ height: "100px" }}
        >
          <h1>Warm Up Completed</h1>
        </div>
      );
    } else {
      displayText = (
        <div
          className="text-black m-2 rounded"
          style={{ height: "100px" }}
          key={currentText}
        >
          <h1 className="text-center">{currentText}</h1>
        </div>
      );
    }

    return (
      <div className="container">
        <div className="row">
          <div className="col text-center">
            <div hidden>
              <AudioReactRecorder state={recordState} onStop={this.onStop} />
            </div>

            <div className="command-container rounded col-sm">
              <div className="row m-2">
                <p>
                  <strong>
                    Progress : {this.state.index}/{this.state.text.length}
                  </strong>
                </p>
                <div className="progress" style={{ height: "20px" }}>
                  <div
                    className="progress-bar progress-bar-striped progress-bar-animated"
                    role="progressbar"
                    style={{
                      width: this.state.progress + "%",
                      color: "black",
                    }}
                    aria-valuenow={progress}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>
              </div>
              <div className="bg-light">
                <p className="text-info">
                  <i>
                    <strong>
                      <u>Please say command as you normally do</u>
                    </strong>
                  </i>
                </p>
                {displayText}
              </div>
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
          {completeTrial && (
            <div className="col text-center">
              <button
                className="btn btn-primary btn-lg"
                id="retry"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.retry}
              >
                Retry WarmUp
              </button>
              <button
                className="btn btn-primary btn-lg offset-lg-2"
                id="real"
                style={{ height: "100px", width: "25%", fontSize: "30px" }}
                onClick={this.loadRealApp}
              >
                Start Real Experiment
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Trial;

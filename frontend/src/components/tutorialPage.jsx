import React, { Component } from "react";
import webApp from "../webApp.png";

class Tutorial extends Component {
  state = {};
  render() {
    return (
      <div className="container-fluid">
        <nav className="navbar navbar-light bg-light">
          <strong>
            {" "}
            <h1>Welcome to Audio Recorder App...</h1>
          </strong>
        </nav>
        <div className="row">
          <p>
            The Web App consists of commands which need to be recited aloud and
            the audio will get recorded.
          </p>
          <p>
            <strong>Components :</strong>
          </p>
          <ul className="list-group">
            <li className="list-group-item list-group-item-primary">
              <u>Start</u> : To begin recording
            </li>
            <li className="list-group-item list-group-item-danger">
              <u>Stop</u> : Click on this button when you have finished reading
              the command
            </li>
            <li className="list-group-item list-group-item-success">
              <u>Next</u> : To proceed to the next phrase to be said
            </li>
            <li className="list-group-item list-group-item-secondary">
              <u>Cancel</u> : Cancel the recording if you want to retry saying
              the command
            </li>
          </ul>
        </div>
        <div className="row m-4">
          <h4>
            <u>View of Web App</u>
          </h4>
          <img src={webApp} className="img-fluid" alt="Web App" />
        </div>
        <div className="row m-4">
          <ul className="list-group">
            <li className="list-group-item list-group-item-primary">
              <u>Steps to follow: </u>
              <p>
                Click on <strong>Start</strong> button and after 1 second, read
                aloud the command being displayed. Click on{" "}
                <strong>Stop</strong> button and then proceed to hear your
                recording. If you want another retry, click on{" "}
                <strong>Cancel</strong> else click on <strong>Next</strong>. The
                progress bar will the show the progress made and count of the
                remaining commands left.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Tutorial;

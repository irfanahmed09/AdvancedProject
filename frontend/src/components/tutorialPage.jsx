import React, { Component } from "react";
import webApp from "../webApp.png";
import start from "../Start.png";
import stop from "../Stop.png";
import upload from "../Upload.png";
import next from "../Next.png";
import cancel from "../Cancel.png";

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
        </div>
        <u>Steps to follow:</u>
        <div className="row m-4 shadow-lg">
          <img src={start} className="img-fluid" alt="Start" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <u>Step #1</u>
              <p>
                Click on <strong>Start</strong> button and after 1 second, read
                aloud the command being displayed.
              </p>
            </li>
          </ul>
        </div>
        <div className="row m-4 shadow-lg">
          <img src={stop} className="img-fluid" alt="stop" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <u>Step #2</u>
              <p>
                Click on <strong>Stop</strong> button after you have finished
                reading the command.
              </p>
            </li>
          </ul>
        </div>
        <div className="row m-4 shadow-lg">
          <img src={next} className="img-fluid" alt="next" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <u>Step #3</u>
              <p>
                Use the playback option as highlighted in the image to hear the
                audio recorded. If you are satisified with the audio, click on{" "}
                <strong>Next</strong> and proceed with the next command or click
                on <strong>Cancel</strong> to retry reciting the command again.
              </p>
            </li>
          </ul>
        </div>
        <div className="row m-4 shadow-lg">
          <img src={upload} className="img-fluid" alt="upload" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <u>Step #4</u>
              <p>
                When <strong>Next</strong> button is clicked.The progress bar
                will the show the progress made and count of the remaining
                commands left.
              </p>
            </li>
          </ul>
        </div>
        <div className="row m-4 shadow-lg">
          <img src={cancel} className="img-fluid" alt="cancel" />
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              <p>
                When <strong>Cancel</strong> button is clicked.
              </p>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}

export default Tutorial;

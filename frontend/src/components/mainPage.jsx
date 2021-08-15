import React, { Component } from "react";
import App from "../App";
import Trial from "./trialCommands";
import Tutorial from "./tutorialPage";

class Main extends Component {
  state = {
    showTutorial: true,
    startTrial: false,
    startReal: false,
  };

  trial = () => {
    this.setState({
      showTutorial: false,
      startTrial: true,
    });
  };

  real = () => {
    this.setState({
      startTrial: false,
      startReal: true,
    });
  };

  render() {
    const { showTutorial, startTrial, startReal } = this.state;

    return (
      <div className="container">
        <div>
          {showTutorial && (
            <div className="container">
              <div className="row">
                <div className="col text-center">
                  <Tutorial></Tutorial>
                </div>
              </div>
              <div className="row m-4">
                <div className="col text-center">
                  <button
                    className="btn btn-danger btn-lg"
                    id="cancel"
                    style={{ height: "100px", width: "25%", fontSize: "30px" }}
                    onClick={this.trial}
                  >
                    Begin Trial
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
        {startReal && <App />}
        {startTrial && <Trial real={this.real} />}
      </div>
    );
  }
}

export default Main;

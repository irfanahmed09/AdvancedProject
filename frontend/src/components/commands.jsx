import React, { Component } from "react";
import axios from "axios";

/*
	Read a text file and out put the content.
	
	Example Usage:
	var myTxt = require("./myTxt.txt");
	...
	<TextFileReader
		txt={myTxt}
	/>
 */
class Command extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: [],
      index: 0,
      currentText: "",
      endOfCommands: false,
      progress: 0,
    };
  }

  componentDidMount() {
    axios
      .get("/read-file")
      .then((res) => {
        this.setState({
          text: res.data,
          index: 0,
          currentText: res.data[0],
        });
        //console.log(this.state.text);
      })
      .catch((err) => {
        console.log("Error from ShowResumeDetails");
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
    } else {
      this.setState({
        index: index,
        currentText: text[index],
        progress: progress,
      });
    }
  }

  render() {
    const { currentText, endOfCommands, progress } = this.state;

    let displayText;

    if (endOfCommands) {
      displayText = (
        <div
          className="text-white m-2 rounded text-center bg-success"
          style={{ height: "100px" }}
        >
          <h1>Thank You for recording data!</h1>
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
      <div>
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
              style={{ width: this.state.progress + "%", color: "black" }}
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
    );
  }
}

export default Command;

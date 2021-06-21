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
    index = index + 1;
    if (index === text.length) {
      this.setState({
        endOfCommands: true,
      });
    } else {
      this.setState({
        index: index,
        currentText: text[index],
      });
    }
  }

  render() {
    const { currentText, endOfCommands } = this.state;

    let displayText;

    if (endOfCommands) {
      displayText = (
        <div className="text-white m-2 rounded text-center bg-success">
          Thank You for recording data!!
        </div>
      );
    } else {
      displayText = (
        <div
          className="text-white m-2 rounded text-center bg-dark"
          key={currentText}
        >
          {currentText}
        </div>
      );
    }

    return displayText;
  }
}

export default Command;

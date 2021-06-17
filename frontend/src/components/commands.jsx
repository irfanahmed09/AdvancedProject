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
    };
  }

  componentDidMount() {
    axios
      .get("/read-file")
      .then((res) => {
        this.setState({
          text: res.data,
        });
        //console.log(this.state.text);
      })
      .catch((err) => {
        console.log("Error from ShowResumeDetails");
      });
  }

  render() {
    return (
      <div>
        {this.state.text.map((item, key) => {
          return (
            <div
              className="text-white m-2 rounded text-center bg-dark"
              key={key}
            >
              {item}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Command;

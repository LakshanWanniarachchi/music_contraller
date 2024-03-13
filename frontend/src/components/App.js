import React, { Component } from "react";
import { render, renser } from "react-dom";
import HomePage from "./HomePage";

// code Here

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="center">
        <HomePage />
      </div>
    );
  }
}

const appDiv = document.getElementById("app");
render(<App />, appDiv);

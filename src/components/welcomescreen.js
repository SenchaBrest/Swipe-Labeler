import React from "react";
import "../styles.css";
import welcome from "../welcome.jpeg";
import { Button, InputGroup } from "@blueprintjs/core";

class Welcome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: ""
    };
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleStart = this.handleStart.bind(this);
  }

  handleNameChange(event) {
    this.setState({ username: event.target.value });
  }

  handleStart() {
    localStorage.setItem("username", this.state.username);
    this.props.startLabel(this.state.username);
  }

  render() {
    const welcomeStyles = {
      backgroundImage: `url(${welcome})`,
      height: "100%",
      backgroundRepeat: "no-repeat",
      backgroundSize: "cover",
    };
    return (
      <div className="welcome-wrapper" style={welcomeStyles}>
        <div className="welcome-text">
          <h1>Swipe Labeler</h1>
          <p>Please enter your name to start labelling!</p>
          <div style={{ maxWidth: "300px", margin: "0 auto 20px auto" }}>
            <InputGroup
              placeholder="Enter your name..."
              large={true}
              value={this.state.username}
              onChange={this.handleNameChange}
            />
          </div>
          <div className="welcome-btn-grp">
            <Button
              intent="warning"
              large={true}
              className="welcome-btn"
              disabled={!this.state.username.trim()}
              onClick={this.handleStart}
            >
              Start Labelling
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export { Welcome };

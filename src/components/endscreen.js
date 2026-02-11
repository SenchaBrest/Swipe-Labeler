import React from "react";
import "../styles.css";
import astronaut from "../tutorial-images/astronaut.jpg";
import { Button } from "@blueprintjs/core";
import Confetti from "react-confetti";
import "normalize.css";
import "@blueprintjs/icons/lib/css/blueprint-icons.css";
import "@blueprintjs/core/lib/css/blueprint.css";
import axios from "axios";

class EndScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      leaderboard: {}
    };
    //bind functions
    this.decideContinue = this.decideContinue.bind(this);
  }

  componentDidMount() {
    axios.get('/leaderboard')
      .then(res => {
        this.setState({ leaderboard: res.data });
      })
      .catch(err => console.log(err));
  }

  sendClose() {
    console.log("sendClose!!!!@!!!");
    window.open("", "_parent", "");
    window.close();
  }

  detectTouch() {
    return (
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  getSwipeTime() {
    let time;
    let decoded = decodeURIComponent(document.cookie);
    decoded.split(";").forEach((item) => {
      if (item.trim().startsWith("swipeTime")) time = item.trim().split("=")[1];
    });

    return time;
  }

  decideContinue() {
    let obj;
    if (this.props.continue)
      obj = (
        <Button
          icon="label"
          id="end-btn"
          className="EndScreenButton"
          intent="primary"
          text={true}
          onClick={() => {
            localStorage.setItem("keep_username", "true");
            window.location.reload();
          }}
        >
          Continue Labelling
        </Button>
      );
    else obj = null;
    return obj;
  }

  render() {
    this.props.setTutorialSeen();
    let obj = this.decideContinue();

    // Sort leaderboard
    const sortedLeaderboard = Object.entries(this.state.leaderboard)
      .sort(([, a], [, b]) => b - a);

    return (
      <>
        <Confetti />
        <div
          className="EndScreen"
          style={{
            backgroundImage: "url('" + astronaut + "')",
            overflowY: "auto"
          }}
        >
          <div className="EndScreen_Text">Mission accomplished! Good job!</div>
          <div className="EndScreen_Time_Text">
            Your labelling time: {this.getSwipeTime()} seconds...
          </div>
          <div className="endscreen-btn-grp">
            {obj}
          </div>

          <div style={{ marginTop: "20px", color: "white", backgroundColor: "rgba(0,0,0,0.7)", padding: "20px", borderRadius: "10px", maxWidth: "400px", margin: "20px auto" }}>
            <h3>Leaderboard</h3>
            <ul style={{ listStyleType: "none", padding: 0 }}>
              {sortedLeaderboard.map(([name, count], index) => (
                <li key={name} style={{ margin: "5px 0", fontSize: "1.2em" }}>
                  {index + 1}. {name}: {count}
                </li>
              ))}
            </ul>
          </div>

        </div>
      </>
    );
  }
}
export { EndScreen };

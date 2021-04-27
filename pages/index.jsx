import React from "react";
// import io from "socket.io-client";
import User from "../components/name";
import { withRouter } from "next/router";


class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: "",
    };
  }
  handleCallback = (name) => {
    console.log("child data", name);
    this.setState({ user: name });
    this.props.router.push(`/chat/${name}`);
  };

  render() {
    return (
      <div className="fixed w-full h-full flex items-center justify-center bg-gray-300">
        <User parentCallback={this.handleCallback} />
      </div>
    );
  }
}

export default withRouter(Home);

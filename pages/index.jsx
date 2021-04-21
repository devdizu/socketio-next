import React from "react";
import io from "socket.io-client";

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "...",
    };
  }
  componentDidMount() {
    this.socket = io({
      query: `name=${"Diego"}`,
    });
    this.socket.on("user connected", (data) => {
      this.setState({
        message: data,
      });
    });
  }

  render() {
    return <div>{this.state.message}</div>;
  }
}

import React from "react";
import User from "../components/user";
import { withRouter } from "next/router";

class Home extends React.Component {
  constructor(props) {
    super(props);
  }
  selectName = (name) => {
    this.props.router.push(`/chat/${name}`);
  };

  render() {
    return (
      <div className="fixed w-full h-full flex items-center justify-center chat-content">
        <User onNameSelected={this.selectName} />
      </div>
    );
  }
}

export default withRouter(Home);

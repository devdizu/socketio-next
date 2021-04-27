import React from "react";

export default class Message extends React.Component {
  render() {
    const { name, message, isSameUser } = this.props;
    return (
      <div className={`flex-row${isSameUser ? "-reverse" : ""} mb-3 mx-3 flex`}>
        <div
          className={
            " bg-white inline-block py-2 px-3 rounded-lg max-w-80-p shadow-sm"
          }
        >
          <p className="text-sm font-medium">{name}</p>
          <p className="text-sm">{message}</p>
        </div>
      </div>
    );
  }
}

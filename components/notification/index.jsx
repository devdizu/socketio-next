import React from "react";

export default class Notification extends React.Component {
  render() {
    const { name, isSameUser } = this.props;
    return (
      <div className={`flex flex-row mb-3 mx-3 justify-center`}>
        <div className="text-xs bg-green-600 text-white px-3 py-1 rounded-xl">
          {/* {name} se ha conectado */}
          {isSameUser ? "Te has conectado" : `${name} se ha conectado`}
        </div>
      </div>
    );
  }
}

import React from "react";

export default class User extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = { name: "" };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ name: event.target.value });
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.parentCallback(this.state.name);
  };

  render() {
    return (
      <form
        className="flex flex-col items-center justify-center w-80 h-64 bg-white rounded-md shadow-md p-10"
        onSubmit={this.handleSubmit}
      >
        <label htmlFor="inputUsername" className="text-2xl mb-3">
          Dime tu nombre
        </label>
        <input
          type="text"
          id="inputUsername"
          className="border mb-3 rounded-md h-10 p-2 outline-none w-full"
          value={this.state.name}
          onChange={this.handleChange}
        />
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full">
          Entrar
        </button>
      </form>
    );
  }
}

import React from "react";
import Message from "../../components/message";
import io from "socket.io-client";
import Notification from "../../components/notification";

export default class Chat extends React.Component {
  constructor({ props }) {
    super(props);
    this.state = {
      messageToSend: "",
      messages: [],
    };
    this.scrollRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
  }

  scrollToBottom() {
    this.scrollRef.current.scrollIntoView({
      behavior: "smooth",
    });
  }

  componentDidMount() {
    this.socket = io("https://socketio-server.herokuapp.com/", {
      query: `name=${this.props.name}`,
    });
    this.socket.on("user connected", ({ name }) => {
      this.setState({
        messages: [...this.state.messages, { name, isNotification: true }],
      });
      this.scrollToBottom();
    });

    this.socket.on("chat message", (newMessage) => {
      this.setState({ messages: [...this.state.messages, newMessage] });
      this.scrollToBottom();
    });
  }

  getMessages(currentName) {
    return this.state.messages.map((message, index) => {
      const key = `message-${index}`;
      const isSameUser = message.name === currentName;
      return !message.isNotification ? (
        <Message key={key} isSameUser={isSameUser} {...message} />
      ) : (
        <Notification key={key} isSameUser={isSameUser} {...message} />
      );
    });
  }
  handleChange(event) {
    this.setState({ messageToSend: event.target.value });
  }
  sendMessage($event) {
    $event.preventDefault();
    this.socket.emit("chat message", {
      name: this.props.name,
      message: this.state.messageToSend,
    });
    this.setState({ messageToSend: "" });
  }

  render() {
    return (
      <div className="fixed w-full h-full flex flex-col">
        <div className="header h-10 z-10 shadow-sm flex justify-center items-center text-xl font-semibold flex-shrink-0">
          Hola {this.props.name}
        </div>
        <div
          className="chat-content flex-grow pt-3 overflow-auto"
          ref={(el) => {
            this.messagesEnd = el;
          }}
        >
          {this.getMessages(this.props.name)}
          <div ref={this.scrollRef}></div>
        </div>
        <form
          className="h-14 flex justify-center items-center p-2"
          noValidate
          onSubmit={this.sendMessage}
        >
          <input
            type="text"
            className="flex-grow outline-none h-8 border-b mx-2"
            value={this.state.messageToSend}
            onChange={this.handleChange}
          />
          <button
            type="submit"
            className="h-full p-2 w-16 text-center focus:outline-none hover:bg-gray-100 disabled:opacity-50"
            disabled={!this.state.messageToSend}
          >
            <img
              className="h-full m-auto"
              src="/images/send.svg"
              alt="Enviar"
            />
          </button>
        </form>
      </div>
    );
  }
}

export const getStaticProps = async ({ params }) => {
  const { name } = params;
  return {
    props: { name },
  };
};

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: "blocking",
  };
};

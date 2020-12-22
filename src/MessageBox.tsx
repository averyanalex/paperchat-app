import React from 'react';
import Message from './Message';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pas1: '', messages: [], isFetching: true };
  }
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  tick() {
    fetch('http://synthworld.ru:8090/get?count=7')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const localMessages = [];
        data.forEach((element) => {
          localMessages.push(<Message text={element.content} />);
        });
        this.setState({ messages: localMessages, isFetching: false });
      });
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      1000
    );
  }

  render() {
    const { data, isFetching } = this.state;
    if (isFetching) {
      return <div>Загрузка...</div>;
    }
    return <div className="message-box">{this.state.messages}</div>;
  }
}

export default MessageBox;

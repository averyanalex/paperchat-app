import React from 'react';
import Message from './Message';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pas1: '', messages: [], isFetching: true };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  tick() {
    fetch('http://synthworld.ru:8090/get?count=20')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const localMessages = [];
        data.forEach((element) => {
          localMessages.push(<Message text={element.content} ip={element.ip}/>);
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

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (this.state.message.length > 75) {
      alert("Сообщение длинное очень")
      return;
    }
    var url = new URL("http://synthworld.ru:8090/send/msg")
    url.searchParams.append("content", this.state.message)
    this.setState({ message: '' });
    fetch(url);
  }

  render() {
    const { data, isFetching } = this.state;
    if (isFetching) {
      return <div>Загрузка...</div>;
    }
    return (
    <div>
      <div className="message-box">{this.state.messages}</div>
      <form onSubmit={this.handleSubmit}>
            <label>
              Сообщение
              <input
                id="message"
                onChange={this.handleChange}
                value={this.state.message}
             />
            </label>
            <input type="submit" value="Отправить" />
      </form>
    </div>);
  }
}

export default MessageBox;

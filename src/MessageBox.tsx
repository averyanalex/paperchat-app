import React from 'react';
import Message from './Message';

class MessageBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = { message: '', messages: [], isFetching: true, selectedFile: null };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // this.handleChange = this.handleChange.bind(this);
  // this.handleSubmit = this.handleSubmit.bind(this);
  tick() {
    fetch('http://synthworld.ru:8090/get?count=45')
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        const localMessages = [];
        data.forEach((element) => {
          localMessages.push(
            <Message
              text={element.content}
              ip={element.ip}
              time={element.time}
            />
          );
        });
        this.setState({ messages: localMessages, isFetching: false });
      });
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (this.state.message.length > 75) {
      alert('Сообщение длинное очень');
      return;
    }
    if (this.state.message.length === 0 && this.state.selectedFile !== null) {
      return;
    }
    const url = 'http://synthworld.ru:8090/send/msg';

    let formData = new FormData();
    formData.append("message", this.state.message, this.state.selectedFile)
    this.setState({ message: '' });
    fetch(url,
    {
      body: formData,
      method: "post"
    })
  }

  onFileChange = event => {

    // Update the state
    this.setState({ selectedFile: event.target.files[0] });

  };

  render() {
    const { data, isFetching } = this.state;
    if (isFetching) {
      return <div>Загрузка...</div>;
    }
    return (
      <div>
        <div
          style={{ overflow: 'auto', height: '80vh' }}
          className="message-box"
        >
          {this.state.messages}
        </div>
        <form onSubmit={this.handleSubmit} >
          <label>
            Сообщение
            <input
              id="message"
              onChange={this.handleChange}
              value={this.state.message}
            />
          </label>
          <input type="submit" value="Отправить" />
          <input type="file" onChange={this.onFileChange}/>
        </form>
      </div>
    );
  }
}

export default MessageBox;

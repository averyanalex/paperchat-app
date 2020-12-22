import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { pas1: '' };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return <p> {this.props.text} </p>;
  }
}

export default Message;

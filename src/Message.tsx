import React from 'react';

class Message extends React.Component {
  constructor(props) {
    super(props);
    // this.state = { pas1: '' };
    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    return (
      <div>
        {' '}
        {this.props.ip}: {this.props.text}{' '}
      </div>
    );
  }
}

export default Message;

import React from 'react';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pas1: '' };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // if (this.state.text.length === 0) {
    //   return;
    // }
    if (this.state.pas1 != this.state.pas2) {
      alert('пароли проверь, они плохие');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.state.login);
    formData.append('email', this.state.email);
    formData.append('password', this.state.pas1);
    fetch('http://localhost:8080/reg', {
      body: formData,
      method: 'post',
    })
      .then((response) => {
        return response;
      })
      .then((data) => {
        alert(data.json().error);
      });
    // const newItem = {
    //   text: this.state.text,
    //   id: Date.now(),
    // };
    // this.setState((state) => ({
    //   items: state.items.concat(newItem),
    //   text: '',
    // }));
  }

  handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ [event.target.id]: event.target.value });
  }

  render() {
    return (
      <div>
        <h3>Регистрация</h3>
        <form onSubmit={this.handleSubmit}>
          <label>
            Логин
            <input
              id="login"
              onChange={this.handleChange}
              value={this.state.login}
            />
          </label>
          <label>
            Почта
            <input
              id="email"
              onChange={this.handleChange}
              value={this.state.email}
            />
          </label>
          <label>
            Пароль
            <input
              id="pas1"
              onChange={this.handleChange}
              value={this.state.pas1}
            />
          </label>
          <label>
            Повторите пароль
            <input
              id="pas2"
              onChange={this.handleChange}
              value={this.state.pas2}
            />
          </label>
          <input type="submit" value="Отправить" />
        </form>
      </div>
    );
  }
}

export default Register;
// export default function Register() {
//   return (
//     <Router>
//       <Switch>
//         <Route path="/" component={RegisterForm} />
//       </Switch>
//     </Router>
//   );
// }

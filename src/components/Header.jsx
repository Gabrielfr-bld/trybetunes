import React, { Component } from 'react';
import { getUser } from '../services/userAPI';
import Loading from '../pages/Loading';

class Header extends Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: undefined,
    };
    this.handleUser = this.handleUser.bind(this);
  }

  componentDidMount() {
    this.handleUser();
  }

  handleUser() {
    this.setState({
      loading: true,
    });
    getUser().then((data) => this.setState({
      loading: false,
      user: data,
    }));
  }

  render() {
    const { loading, user } = this.state;

    return (
      <header data-testid="header-component">
        <h1 data-testid="header-user-name">{loading ? <Loading /> : user.name}</h1>
      </header>
    );
  }
}

export default Header;

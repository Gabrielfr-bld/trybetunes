import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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
      <header className="card-header card-center" data-testid="header-component">
        <h1 data-testid="header-user-name">{loading ? <Loading /> : user.name}</h1>
        <nav className="nav nav-pills nav-justified">
          <Link
            className="nav-item nav-link active"
            data-testid="link-to-search"
            to="/search"
          >
            Pesquisa
          </Link>
          <Link
            className="nav-item nav-link active"
            data-testid="link-to-favorites"
            to="/favorites"
          >
            Favoritas
          </Link>
          <Link
            className="nav-item nav-link active"
            data-testid="link-to-profile"
            to="/profile"
          >
            Perfil
          </Link>
        </nav>
      </header>
    );
  }
}

export default Header;

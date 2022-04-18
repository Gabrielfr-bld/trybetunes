import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FormUser from '../components/FormUser';
import { getUser, updateUser } from '../services/userAPI';
import Loading from './Loading';

class ProfileEdit extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      email: '',
      image: '',
      name: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.funcGetUserEdit();
  }

  funcGetUserEdit = () => {
    this.setState({
      loading: true,
    },
    async () => {
      const response = await getUser();
      this.setState({
        description: response.description,
        email: response.email,
        image: response.image,
        name: response.name,
        loading: false,
      });
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({
      [name]: value,
    });
  }

  handleClick = () => {
    this.setState({
      loading: true,
    },
    async () => {
      const { history } = this.props;
      const { description, email, image, name } = this.state;
      const userEdit = { description, email, image, name };
      await updateUser(userEdit);
      await history.replace('/profile');
    });
  }

  render() {
    const { loading, description, image, name, email } = this.state;
    const disabled = description && image && name && email.includes('@');
    return (
      <div data-testid="page-profile-edit">
        {loading ? <Loading /> : <FormUser
          description={ description }
          email={ email }
          image={ image }
          name={ name }
          handleChange={ this.handleChange }
          handleClick={ this.handleClick }
          enable={ disabled }
        />}
      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.objectOf(PropTypes.any),
}.isRequired;

export default ProfileEdit;

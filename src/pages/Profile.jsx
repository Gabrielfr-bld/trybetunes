import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { getUser } from '../services/userAPI';
import Loading from './Loading';

class Profile extends Component {
  constructor() {
    super();
    this.state = {
      description: '',
      email: '',
      image: '',
      userName: '',
      loading: false,
    };
  }

  componentDidMount() {
    this.funcGetUser();
  }

  funcGetUser = () => {
    this.setState({
      loading: true,
    },
    async () => {
      const response = await getUser();
      this.setState({
        loading: false,
        description: response.description,
        email: response.email,
        image: response.image,
        userName: response.name,
      });
    });
  }

  funcRenderProfile = () => {
    const IMAGEPROFILE = 'https://static.vecteezy.com/ti/vetor-gratis/p1/2534006-social-media-chatting-online-blank-profile-picture-head-and-body-icon-people-standing-icon-gray-background-gr%C3%A1tis-vetor.jpg';
    const { description, email, image, userName } = this.state;
    let imagem = IMAGEPROFILE;
    if (image) imagem = image;

    return (
      <div className="centerUser">
        <img className="imgPerfil" src={ imagem } alt={ userName } />
        <Link className="marginLeft" to="/profile/edit">
          <button
            className="btn btn-outline-primary"
            type="button"
          >
            Editar Perfil
          </button>
        </Link>
        <h4>Nome</h4>
        <p className="marginBottom">{ userName }</p>
        <h4>E-mail</h4>
        <p className="marginBottom">{ email }</p>
        <h4>Descrição</h4>
        <p>{description}</p>
      </div>
    );
  }

  render() {
    const { loading } = this.state;
    return (
      <div data-testid="page-profile">
        { loading ? <Loading /> : this.funcRenderProfile()}
      </div>
    );
  }
}

export default Profile;

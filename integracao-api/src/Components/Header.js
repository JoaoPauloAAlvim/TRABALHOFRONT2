import React from "react";
import styled from "styled-components"


const BodyFeed = styled.div`

  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-items: center;
  align-items: center;
  gap: 0px;
  margin: 20px;
  padding: 20px;

`;

const BodyStyle = styled.div`
  background: #f0f0f0;

`;

const HeaderStyle = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-right: 20px;
`;

const selectStyle = {
  width: '135px',
  padding: '5px',
  margin: '8px'
}

const imgStyle = {
  height: '100px',
  margin: '20px'
}


//const StyledBody = styled.div`
   // display: flex;
//`;

class Header extends React.Component {
  state = {
    filtroNome: "",
    filtroStatus: "",
    filtroEspecie: "",
    filtroTipo: "",
    filtroGenero: "",
  };



  handleChangeNome = (event) => {
    const { value } = event.target;
    this.setState({ filtroNome: value });
    this.props.onFiltrarPersonagens(value, this.state.filtroStatus, this.state.filtroEspecie, this.state.filtroTipo, this.state.filtroGenero);
  };

  handleChangeStatus = (event) => {
    const { value } = event.target;
    this.setState({ filtroStatus: value });
    this.props.onFiltrarPersonagens(this.state.filtroNome, value, this.state.filtroEspecie, this.state.filtroTipo, this.state.filtroGenero);
  };

  handleChangeEspecie = (event) => {
    const { value } = event.target;
    this.setState({ filtroEspecie: value });
    this.props.onFiltrarPersonagens(this.state.filtroNome, this.state.filtroStatus, value, this.state.filtroTipo, this.state.filtroGenero);
  };

  handleChangeTipo = (event) => {
    const { value } = event.target;
    this.setState({ filtroTipo: value });
    this.props.onFiltrarPersonagens(this.state.filtroNome, this.state.filtroStatus, this.state.filtroEspecie, value, this.state.filtroGenero);
  };

  handleChangeGenero = (event) => {
    const { value } = event.target;
    this.setState({ filtroGenero: value });
    this.props.onFiltrarPersonagens(this.state.filtroNome, this.state.filtroStatus, this.state.filtroEspecie, this.state.filtroTipo, value);
  };

  render() {
    const { personagens, onSelectPersonagem, logo, descricao } = this.props;
    const { filtroNome, filtroStatus, filtroEspecie, filtroGenero } = this.state;

    return (
      <BodyStyle>
        <img style={imgStyle} src={logo} alt={descricao} />

        <HeaderStyle>
          <select style={selectStyle} value={filtroStatus} onChange={this.handleChangeStatus}>
            <option value="">Status</option>
            <option value="alive">Alive</option>
            <option value="dead">Dead</option>
            <option value="unknown">Unknown</option>
          </select>

          <select style={selectStyle} value={filtroEspecie} onChange={this.handleChangeEspecie}>
            <option value="">Espécie</option>
            <option value="Human">Human</option>
            <option value="Alien">Alien</option>
            <option value="Mythological">Mythological</option>
          </select>

          <select style={selectStyle} value={filtroGenero} onChange={this.handleChangeGenero}>
            <option value="">Gênero</option>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="genderless">Genderless</option>
            <option value="unknown">Unknown</option>
          </select>

          <input style={selectStyle}
            type="text"
            placeholder="Personagem"
            value={filtroNome}
            onChange={this.handleChangeNome}
            aria-label="Filtro de personagens"
          />
        </HeaderStyle>

        <BodyFeed>
          {personagens.length > 0 ? (
            personagens.map((personagem) => (
              <img
                key={personagem.id}
                src={personagem.image}
                alt={personagem.name}
                onClick={() => onSelectPersonagem(personagem)}
                style={{ cursor: "pointer", margin: "5px" }}
              />
            ))
          ) : (
            <p>Nenhum personagem encontrado.</p>
          )}
        </BodyFeed>
      </BodyStyle>
    );
  }
}

export default Header;

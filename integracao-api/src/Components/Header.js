import React from "react";

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
      <div>
        <img src={logo} alt={descricao} />

        <select value={filtroStatus} onChange={this.handleChangeStatus}>
          <option value="">Status</option>
          <option value="alive">Alive</option>
          <option value="dead">Dead</option>
          <option value="unknown">Unknown</option>
        </select>

        <select value={filtroEspecie} onChange={this.handleChangeEspecie}>
          <option value="">Espécie</option>
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Mythological">Mythological</option>
        </select>

        <select value={filtroGenero} onChange={this.handleChangeGenero}>
          <option value="">Gênero</option>
          <option value="female">Female</option>
          <option value="male">Male</option>
          <option value="genderless">Genderless</option>
          <option value="unknown">Unknown</option>
        </select>

        <input
          type="text"
          placeholder="Pesquise o personagem"
          value={filtroNome}
          onChange={this.handleChangeNome}
          aria-label="Filtro de personagens"
        />

        <div>
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
        </div>
      </div>
    );
  }
}

export default Header;

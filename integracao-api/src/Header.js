import React from "react";

class Header extends React.Component {
  state = {
    filtro: "",
  };

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ filtro: value });
    this.props.onFiltrarPersonagens(value);
  };

  render() {
    const { personagens, onSelectPersonagem, logo, descricao } = this.props;
    const { filtro } = this.state;

    return (
      <div>
        <img src={logo} alt={descricao} />
        <input
          type="text"
          placeholder="Digite o nome do personagem"
          value={filtro}
          onChange={this.handleChange}
        />
        <div>
          {personagens.map((personagem) => (
            <img
              key={personagem.id}
              src={personagem.image}
              alt={personagem.name}
              onClick={() => onSelectPersonagem(personagem)}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Header;

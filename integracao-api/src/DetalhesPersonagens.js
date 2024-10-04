import React from "react";

class DetalhesPersonagens extends React.Component {
  render() {
    const { personagem, onVoltar } = this.props;

    return (
      <div>
        <h2>Detalhes do Personagem</h2>
        <h3>{personagem.name}</h3>
        <img src={personagem.image} alt={personagem.name} />
        <p>Status: {personagem.status}</p>
        <p>Espécie: {personagem.species}</p>
        <p>Gênero: {personagem.gender}</p>
        <p>Origem: {personagem.origin.name}</p>
        <p>Localização: {personagem.location.name}</p>
        <button onClick={onVoltar}>Voltar para a lista</button>
      </div>
    );
  }
}

export default DetalhesPersonagens;



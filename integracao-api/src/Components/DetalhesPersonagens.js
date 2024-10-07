import React from "react";
import styled from "styled-components";  


const ContainnerStyle = styled.div`

  display: flex;

`;

const ContainnerText =styled.div`
  background: #f0f0f0;
  width: 100%;
  padding: 0px 20px;
`

const ContainnerImg =styled.div`
  display:flex;
  flex-direction: column;
  gap: 10px;
`

class DetalhesPersonagens extends React.Component {
  render() {
    const { personagem, onVoltar } = this.props;

    return (
      <ContainnerStyle>
        <ContainnerImg>
          <img src={personagem.image} alt={personagem.name} />
          <button onClick={onVoltar}>Voltar para a lista</button>
        </ContainnerImg>

        <ContainnerText>
          <h2>Detalhes do Personagem</h2>
          <h3>{personagem.name}</h3>
          <p>Status: {personagem.status}</p>
          <p>Espécie: {personagem.species}</p>
          <p>Gênero: {personagem.gender}</p>
          <p>Origem: {personagem.origin.name}</p>
          <p>Localização: {personagem.location.name}</p>
          
        </ContainnerText>
      </ContainnerStyle>
    );
  }
}

export default DetalhesPersonagens;



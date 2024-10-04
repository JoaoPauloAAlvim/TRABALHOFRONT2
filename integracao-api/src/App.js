import React from "react";
import axios from "axios";
import  Header  from "./Header"; 
import DetalhesPersonagens from "./DetalhesPersonagens"; 

class App extends React.Component {
  state = {
    personagens: [],
    personagemSelecionado: null,
  };

  componentDidMount() {
    this.mostrarPersonagens();
  }

  selecionarPersonagem=(personagem)=>{
    this.setState({personagemSelecionado : personagem});
  }
  voltarParaLista=()=>{
    this.setState({personagemSelecionado:null})
  }
  

  mostrarPersonagens() {
    axios
      .get("https://rickandmortyapi.com/api/character", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resposta) => {
        this.setState({ personagens: resposta.data.results });
      })
      .catch((erro) => {
        console.log(erro.response.data);
      });
  }
  

  render() {
    const { personagens, personagemSelecionado } = this.state;

    return (
      <div>
        {this.state.personagemSelecionado?<DetalhesPersonagens 
        personagem={personagemSelecionado}
        onVoltar={this.voltarParaLista}
        />:
        <Header 
          personagens={personagens} 
          onSelectPersonagem={this.selecionarPersonagem} /> }   
      </div>
    );
  }
}

export default App;


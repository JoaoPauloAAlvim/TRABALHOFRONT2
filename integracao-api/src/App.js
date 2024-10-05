import React from "react";
import axios from "axios";
import Header from "./Header";
import DetalhesPersonagens from "./DetalhesPersonagens";

class App extends React.Component {
  state = {
    personagens: [],
    personagemSelecionado: null,
    filtroPersonagens: [],
  };

  componentDidMount() {
    this.mostrarPersonagens();
  }

  selecionarPersonagem = (personagem) => {
    this.setState({ personagemSelecionado: personagem });
  };

  voltarParaLista = () => {
    this.setState({ personagemSelecionado: null });
  };

  mostrarPersonagens() {
    axios
      .get("https://rickandmortyapi.com/api/character", {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resposta) => {
        this.setState({
          personagens: resposta.data.results,
          filtroPersonagens: resposta.data.results, // Inicializa também com todos os personagens
        });
      })
      .catch((erro) => {
        console.log(erro.response.data);
      });
  }

  filtrarPersonagens = (filtro) => {
    const personagensFiltrados = this.state.personagens.filter((personagem) =>
      personagem.name.toLowerCase().includes(filtro.toLowerCase())
    );
    this.setState({ filtroPersonagens: personagensFiltrados });
  };

  render() {
    const { filtroPersonagens, personagemSelecionado } = this.state;

    return (
      <div>
        {personagemSelecionado ? (
          <DetalhesPersonagens
            personagem={personagemSelecionado}
            onVoltar={this.voltarParaLista}
          />
        ) : (
          <Header
            personagens={filtroPersonagens} // Aqui usamos a lista filtrada
            onSelectPersonagem={this.selecionarPersonagem}
            onFiltrarPersonagens={this.filtrarPersonagens}
            logo="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png"
            descricao="Logo Rick and Morty"
          />
        )}
      </div>
    );
  }
}

export default App;

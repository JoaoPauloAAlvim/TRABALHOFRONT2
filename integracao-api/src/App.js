import React from "react";
import axios from "axios";
import Header from "./Header";
import DetalhesPersonagens from "./DetalhesPersonagens";

class App extends React.Component {
  state = {
    personagens: [],
    personagemSelecionado: null,
    filtroPersonagens: [],
    paginaAtual: 1, // Adiciona controle da página atual
    carregando: false, // Controle de carregamento
  };

  componentDidMount() {
    this.mostrarPersonagens(); // Carrega a primeira página de personagens
    window.addEventListener("scroll", this.detectarScroll); // Adiciona evento de scroll
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.detectarScroll); // Remove evento de scroll ao desmontar
  }

  mostrarPersonagens = () => {
    const { paginaAtual, personagens } = this.state;
    this.setState({ carregando: true }); // Inicia o carregamento

    axios
      .get(`https://rickandmortyapi.com/api/character?page=${paginaAtual}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resposta) => {
        this.setState({
          personagens: [...personagens, ...resposta.data.results], // Adiciona novos personagens à lista
          filtroPersonagens: [...personagens, ...resposta.data.results],
          carregando: false, // Finaliza o carregamento
        });
      })
      .catch((erro) => {
        console.log(erro.response.data);
        this.setState({ carregando: false });
      });
  };

  selecionarPersonagem = (personagem) => {
    this.setState({ personagemSelecionado: personagem });
  };

  voltarParaLista = () => {
    this.setState({ personagemSelecionado: null });
  };

  filtrarPersonagens = (filtro) => {
    const personagensFiltrados = this.state.personagens.filter((personagem) =>
      personagem.name.toLowerCase().includes(filtro.toLowerCase())
    );
    this.setState({ filtroPersonagens: personagensFiltrados });
  };

  detectarScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !this.state.carregando
    ) {
      this.setState(
        (prevState) => ({ paginaAtual: prevState.paginaAtual + 1 }),
        () => this.mostrarPersonagens() // Carrega mais personagens ao rolar
      );
    }
  };

  render() {
    const { filtroPersonagens, personagemSelecionado, carregando } = this.state;

    return (
      <div>
        {personagemSelecionado ? (
          <DetalhesPersonagens
            personagem={personagemSelecionado}
            onVoltar={this.voltarParaLista}
          />
        ) : (
          <Header
            personagens={filtroPersonagens}
            onSelectPersonagem={this.selecionarPersonagem}
            onFiltrarPersonagens={this.filtrarPersonagens}
            logo="https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png"
            descricao="Logo Rick and Morty"
          />
        )}
        {carregando && <p>Carregando...</p>}
      </div>
    );
  }
}

export default App;


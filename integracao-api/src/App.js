import React from "react";
import axios from "axios";
import Header from "./Header";
import DetalhesPersonagens from "./DetalhesPersonagens";

class App extends React.Component {
  state = {
    personagens: [],
    personagemSelecionado: null,
    filtroPersonagens: [],
    paginaAtual: 1,
    carregando: false,
    filtroNome: "",
    filtroStatus: "",
    filtroEspecie: "",
    filtroTipo: "",
    filtroGenero: "",
  };

  componentDidMount() {
    this.mostrarPersonagens();
    window.addEventListener("scroll", this.detectarScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.detectarScroll);
  }

  construirUrl = () => {
    const { paginaAtual, filtroNome, filtroStatus, filtroEspecie, filtroTipo, filtroGenero } = this.state;
    let url = `https://rickandmortyapi.com/api/character?page=${paginaAtual}`;
    
    const filtros = [];

    if (filtroNome) filtros.push(`name=${filtroNome}`);
    if (filtroStatus) filtros.push(`status=${filtroStatus}`);
    if (filtroEspecie) filtros.push(`species=${filtroEspecie}`);
    if (filtroTipo) filtros.push(`type=${filtroTipo}`);
    if (filtroGenero) filtros.push(`gender=${filtroGenero}`);

    if (filtros.length > 0) {
      url += `&${filtros.join('&')}`;
    }

    return url;
  };

  mostrarPersonagens = () => {
    const { personagens } = this.state;
    this.setState({ carregando: true });

    const url = this.construirUrl();

    axios
      .get(url, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((resposta) => {
        this.setState({
          personagens: [...personagens, ...resposta.data.results],
          filtroPersonagens: [...personagens, ...resposta.data.results],
          carregando: false,
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

  filtrarPersonagens = (filtroNome, filtroStatus, filtroEspecie, filtroTipo, filtroGenero) => {
    this.setState(
      {
        filtroNome,
        filtroStatus,
        filtroEspecie,
        filtroTipo,
        filtroGenero,
        paginaAtual: 1,
        personagens: [],
      },
      this.mostrarPersonagens
    );
  };

  detectarScroll = () => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
      !this.state.carregando
    ) {
      this.setState(
        (prevState) => ({ paginaAtual: prevState.paginaAtual + 1 }),
        () => this.mostrarPersonagens()
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

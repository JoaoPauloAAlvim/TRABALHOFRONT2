import React from "react";
import axios from "axios";
import Header from "./Components/Header";
import DetalhesPersonagens from "./Components/DetalhesPersonagens";
// CSS inteiro feito pelo Henrique na máquina do João Paulo, por isso tá sem comit

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
    mensagemErro: "", 
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
    this.setState({ carregando: true, mensagemErro: "" });

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
        console.error(erro.response.data);
        this.setState({ carregando: false });

        if (erro.response) {
          if (erro.response.status === 404) {
            this.setState({ mensagemErro: "Personagens não encontrados. Tente novamente." });
          } else if (erro.response.status === 500) {
            this.setState({ mensagemErro: "Erro interno no servidor. Tente novamente mais tarde." });
          } else {
            this.setState({ mensagemErro: "Ocorreu um erro. Tente novamente." });
          }
        } else if (erro.request) {
          this.setState({ mensagemErro: "Erro ao conectar com o servidor. Verifique sua conexão." });
        } else {
          this.setState({ mensagemErro: "Erro ao realizar a requisição. Tente novamente." });
        }
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
    const { filtroPersonagens, personagemSelecionado, carregando, mensagemErro } = this.state;

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
        {mensagemErro && <p style={{ color: 'red' }}>{mensagemErro}</p>} 
      </div>
    );
  }
}

export default App;

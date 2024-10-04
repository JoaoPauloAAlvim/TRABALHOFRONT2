import React from "react";

export class Header extends React.Component{

render(){
    return<div>
        <img src={"https://www.freepnglogos.com/uploads/rick-and-morty-png/list-rick-and-morty-episodes-wikipedia-24.png"} alt={"Logo Rick and Morty"}/>
        <div>
          {this.props.personagens.map((personagem) => (
            <img key={personagem.id}src ={personagem.image} alt={personagem.name}onClick={() => this.props.onSelectPersonagem(personagem)}/>
          ))}
        </div>
    </div>
    }
}

export default Header;

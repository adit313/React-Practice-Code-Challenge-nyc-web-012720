import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushi: [],
    startIndex: 0,
    eatenSushi: [],
    money: 100,
    eatenCost: 0
  }

  addEaten = (data) => {
    data.forEach(element => {
      element["eaten"] = false
    })
    return data
  }

  nextPage = () => {
    this.setState({startIndex: this.state.startIndex + 4})
  }

  eaten = (sushiToUpdate) => {

    if ((this.state.money - this.state.eatenCost)>sushiToUpdate.price) {
      this.setState( prevState =>({
        ...prevState,
          sushi: prevState.sushi.map(piece =>{
            if (piece === sushiToUpdate) {
              return {...piece, eaten:true}
            } else {
              return piece
            }
            }),
            eatenSushi: [...prevState.eatenSushi, sushiToUpdate],
            eatenCost: prevState.eatenCost + sushiToUpdate.price
        })
      )
    } else {
      
    }

  }

  componentDidMount() {
    fetch(API)
    .then(resp => resp.json())
    .then(data => this.setState({sushi: this.addEaten(data)}))
  }

  render() {
    console.log(this.state)
    return (
      <div className="app">
        <SushiContainer 
          sushis={this.state.sushi} 
          startIndex={this.state.startIndex} 
          nextPage = {this.nextPage}
          eaten={this.eaten}
          />
        <Table eatenCost = {this.state.eatenCost} money = {this.state.money} eatenSushi = {this.state.eatenSushi}/>
      </div>
    );
  }
}

export default App;
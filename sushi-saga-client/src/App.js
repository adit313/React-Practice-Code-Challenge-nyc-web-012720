import React, { Component } from 'react';
import SushiContainer from './containers/SushiContainer';
import Table from './containers/Table';

// Endpoint!
const API = "http://localhost:3000/sushis"

class App extends Component {
  state = {
    sushi: [],
    startIndex: 0,
    eatenSushi: []
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

    this.setState( prevState =>({
      ...prevState,
        sushi: prevState.sushi.map(piece =>{
          if (piece === sushiToUpdate) {
            return {...piece, eaten:true}
          } else {
            return piece
          }
          }),
          eatenSushi: [...prevState.eatenSushi, sushiToUpdate]
      })
    )
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
        <Table />
      </div>
    );
  }
}

export default App;
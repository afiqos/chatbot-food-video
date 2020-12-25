import React, { Component } from 'react';
import axios from 'axios';

class Main extends Component {
  handleSend(event) {
    event.preventDefault();
    axios.get('http://localhost:8000/test')
      .then((response) => {
        console.log("Response", response);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        THis is main
        <button className="Send" onClick={this.handleSend}>
          Send
        </button>
      </div>
    );

  }

}

export default Main;
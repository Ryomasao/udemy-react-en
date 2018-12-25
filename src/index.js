import React from 'react'
import ReactDOM from 'react-dom'
//import './index.css';
//import App from './App';
//import * as serviceWorker from './serviceWorker';

import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'


class App extends React.Component {
  state = {
    lat: null,
    errorMessage: ''
  }

  componentDidMount() {
    window.navigator.geolocation.getCurrentPosition(
      (pos) => {
        this.setState({ lat: pos.coords.latitude })
      },
      (err) => {
        this.setState({ errorMessage: err.message })
      },
    )
  }

  render() {
    if(this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          error: { this.state.errorMessage}
        </div> 
      )
    }

    if(!this.state.errorMessage && this.state.lat) {
      return (
        <SeasonDisplay lat={ this.state.lat } />
      )
    }

    return (
      <Spinner message="Please accept location request" />
    )
  }
}


ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
//serviceWorker.unregister();

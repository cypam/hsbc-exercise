import React, {useState, useEffect, Component} from 'react'
import './App.css';
import TimezoneSelector from './timezoneSelector/TimezoneSelector';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      zone:{},
      currentTimeout: null
    }
    this.handleTimezoneSelected = this.handleTimezoneSelected.bind(this)
  }

  async getTimeByZone(zone) {
    const response = await fetch(`http://api.timezonedb.com/v2.1/get-time-zone?key=XWSLLPX5RMIZ&format=json&by=zone&zone=${zone}`);
    const json = await response.json();
    this.setState({
        zone: json
    })
  }

  async refreshTime(zone) {
    const that = this;
    await that.getTimeByZone(zone)

    return new Promise(function(resolve) {
      const currentTimeout = setTimeout(()=> {
          resolve(that.refreshTime(zone))
      },5000)
      that.setState({
        currentTimeout
      })
    })
  }

  handleTimezoneSelected = (e) => {
    const {currentTimeout} = this.state;
    if(currentTimeout) {
      clearTimeout(currentTimeout);
    }
    const {value} = e.target;
    return this.refreshTime(value);

  }
  render() {
    const {zone} = this.state;
    return <div className="App">
      <header className="App-header">
        <TimezoneSelector handleTimezoneSelected={this.handleTimezoneSelected}></TimezoneSelector>
        <div> { zone.abbreviation } </div>
        <div> { zone.zoneName } </div>
        <div> { zone.formatted } </div>
      </header>
    </div>
    }
}

export default App;

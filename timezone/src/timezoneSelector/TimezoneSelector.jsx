import React, {Component, useState, useEffect} from 'react';
const TimezoneSelector = ({handleTimezoneSelected}) => {
    const [zones, setZones] = useState([]);

    useEffect(async ()=>{
        const response = await fetch("http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json")
        const json = await response.json();
        setZones(json.zones);
    })

    return <div>
        <select onChange={handleTimezoneSelected}>
            {zones.map(zone => <option key={zone.zoneName} value={zone.zoneName}>{zone.zoneName}</option>)}
        </select>
    </div> 
}

// class TimezoneSelector extends Component {
//     constructor(props) {
//         super(props)
//         this.state = {
//             zones: [],
//             isLoaded: false
//         }
//     }
//     async componentDidMount() {
//         const response = await fetch("http://api.timezonedb.com/v2.1/list-time-zone?key=XWSLLPX5RMIZ&format=json")
//         const json = await response.json();

//         this.setState({
//             isLoaded: true,
//             zones: json.zones
//         })
     
//     }
//     render() {
//         const {handleTimezoneSelected} = this.props
//         const zones = this.state.zones.map(zone => <option key={zone.zoneName} value={zone.zoneName}>{zone.zoneName}</option>)
//         return <div>
//             <select onChange={handleTimezoneSelected}>
//                 {zones}
//             </select>
//         </div> 
//     }

// }

export default TimezoneSelector

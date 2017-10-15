import React, { Component } from 'react';
import ShowCard from './ShowCard';
import moment from 'moment';
import axios from 'axios';
import { parseString } from 'xml2js';
import { geocodeByAddress, getLatLng } from 'react-places-autocomplete';
import Spinner from './Spinner';

class Search extends Component {
  state = {
    carData: []
  };

  handleSearchTermChange = event => {
    this.setState({ searchTerm: event.target.value });
  };

  componentDidMount = props => {
    const requestData = this.props.match.params;
    let stDateArr = moment(requestData.startDate).format('MM/DD/YYYY HH:mm').split(' ');
    let endDateArr = moment(requestData.endDate).format('MM/DD/YYYY HH:mm').split(' ');
    geocodeByAddress(requestData.location).then(results => getLatLng(results[0])).then(latLng => {
      let request =
        'http://hotwire.herokuapp.com/v1/search/car?apikey=57gjqmyydnz6dshe7zb2jprx' +
        '&dest=' +
        latLng +
        '&pickuptime=' +
        stDateArr[1] +
        '&dropofftime=' +
        endDateArr[1] +
        '&startdate=' +
        stDateArr[0] +
        '&enddate=' +
        endDateArr[0];

      axios.get(request).then(response => {
        parseString(response.data, (err, result) => {
          const carData = result.Hotwire.Result[0].CarResult;
          //  const carMetaData = result.Hotwire.MetaData[0].CarMetaData[0].CarTypes[0].CarType;
          this.setState({
            carData: carData
          });
        });
      });
    });
  };

  render() {
    let searchResults;
    if (this.state.carData.length) {
      var carTypes = ['CCAR', 'ECAR', 'FCAR', 'FFAR', 'ICAR', 'IFAR', 'LCAR', 'MVAR', 'PCAR', 'SCAR', 'SFAR', 'STAR'];
      const filteredCarData = this.state.carData.filter(d => {
        return carTypes.indexOf(d.CarTypeCode.toString()) > -1;
      });
      searchResults = <div> {filteredCarData.map(car => <ShowCard key={car.ResultId} {...car} />)} </div>;
    } else {
      searchResults = <Spinner />;
    }

    return (
      <div className="search">
        <header>
          <h1>Search Results</h1>
        </header>
        {searchResults}
      </div>
    );
  }
}

export default Search;

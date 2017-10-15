import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import moment from 'moment';
import PlacesAutocomplete from 'react-places-autocomplete';
import Search from './Search';

class Landing extends Component {
  state = {
    startDate: '',
    startDateStr: '',
    endDateStr: '',
    endDate: '',
    address: ''
  };
  handleStartDateTimeChange = startDt => {
    const dateStr = moment(startDt).toString();
    this.setState({
      startDate: startDt,
      startDateStr: dateStr
    });
  };
  handleEndDateTimeChange = endDt => {
    const dateStr = moment(endDt).toString();
    this.setState({
      endDate: endDt,
      endDateStr: dateStr
    });
  };
  handleLocationChange = addr => {
    this.setState({ address: addr });
  };

  render() {
    const inputProps = {
      value: this.state.address,
      onChange: this.handleLocationChange,
      type: 'search',
      placeholder: 'Enter a City or Address',
      autoFocus: true
    };

    const AutocompleteItem = ({ suggestion }) => <div className="suggestions">{suggestion}</div>;
    return (
      <div className="landing">
        <h1>Book a Rental Car</h1>
        <div className="date-form">
          <span className="landing-input location">
            <PlacesAutocomplete inputProps={inputProps} autocompleteItem={AutocompleteItem} googleLogo={false} />
          </span>
          <span className="landing-input pickup-date-time">
            <DatePicker
              className="date-picker"
              selected={this.state.startDate}
              placeholderText="Pickup Date and Time"
              onChange={this.handleStartDateTimeChange}
              minDate={moment()}
              showTimeSelect
              timeIntervals={30}
              dateFormat="LLL"
            />
          </span>
          <span className="landing-input dropoff-date-time">
            <DatePicker
              className="date-picker"
              selected={this.state.endDate}
              placeholderText="DropOff Date and Time"
              minDate={moment().add(1, 'days')}
              onChange={this.handleEndDateTimeChange}
              showTimeSelect
              timeIntervals={30}
              dateFormat="LLL"
            />
          </span>
          <Link
            to={`/search/${this.state.startDateStr}/${this.state.endDateStr}/${this.state.address}`}
            className="find-button"
          >
            Find cars
          </Link>
        </div>
      </div>
    );
  }
}

export default Landing;

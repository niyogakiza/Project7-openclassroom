import React from 'react'
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete'

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = { address: '' };
        this.onChange = (address) => this.setState({ address })
    }

    handleFormSubmit = (event) => {
        event.preventDefault();

        geocodeByAddress(this.state.address)
            .then(results => getLatLng(results[0]))
            .then(latLng => console.log('Success', latLng))
            .catch(error => console.error('Error', error))
    };

    render() {

        const inputProps = {
            value: this.state.address,
            onChange: this.onChange,
            type: 'search',
            placeholder: 'Search Places...',
            autoFocus: true,
        };

        return (
            <form onSubmit={this.handleFormSubmit}>
                <PlacesAutocomplete
                 name="search"
                 className="search"
                 placeholder=" Search by City"
                 inputProps={inputProps}
                    />
                <button className="btn btn-info" type="submit">Search</button>

            </form>
        )
    }
}

export default Search;
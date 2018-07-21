import React, { Component } from 'react';
import Table from './table';
import Pagination from 'react-js-pagination';
import { connect } from 'react-redux';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      activePage: 1,
      recordsPerPage: 10,
      filterName: '',
      filterRegion: ''
    }
    this.handlePageChange = this.handlePageChange.bind(this);
  }

  handlePageChange(pageNumber) {
    this.setState({ activePage: pageNumber });
  }

  // filters table by name and/or region
  getFilteredTable(players) {
    return players
      .filter(player => {
        return player.name.toLowerCase().startsWith(this.state.filterName);
      })
      .filter(player => {
        for (let region of player.regions) {
          if (region.includes(this.state.filterRegion)) return true;
        }
      return false;
    });
  }

  // renders the records per page input field
  renderRecordsField() {
    return (
      <div className='input-group  mb-2'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>Records Per Page</span>
        </div>
        <input
          type='text'
          className='form-control col-2'
          value={this.state.recordsPerPage}
          onChange={e => this.onRecordChange(e.target.value)}/>
      </div>
    );
  }

  // updates recordsPerPage local state
  onRecordChange(recordsPerPage) {
    if (recordsPerPage > 0) {
      this.setState({ recordsPerPage: Number(recordsPerPage) })
    } else {
      this.setState({ recordsPerPage: '' })
    }
  }

  // renders the name filter input field
  renderNameFilter() {
    return (
      <div className='input-group  mb-2'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>Name</span>
        </div>
        <input
          type='text'
          className='form-control col-3'
          value={this.state.filterName}
          onChange={e => this.onNameChange(e.target.value)}/>
      </div>
    );
  }

  // updates filterName local state
  onNameChange(filterName) {
    this.setState({ filterName: filterName.toLowerCase() });
  }

  // renders the region filter input field
  renderRegionFilter() {
    return (
      <div className='input-group  mb-2'>
        <div className='input-group-prepend'>
          <span className='input-group-text'>Region</span>
        </div>
        <input
          type='text'
          className='form-control col-3'
          value={this.state.filterRegion}
          onChange={e => this.onRegionChange(e.target.value)}/>
      </div>
    );
  }

  // updates the filterRegion local state
  onRegionChange(filterRegion) {
    this.setState({ filterRegion: filterRegion.toLowerCase() });
  }

  render() {
    // start is the starting index for the displayed table
    // end is the ending index for the displayed table
    // filteredTable used to for its length to get proper number of pages
    // displayedTable is the table shown on screen
    const start = (this.state.activePage - 1) * this.state.recordsPerPage;
    const end = start + this.state.recordsPerPage;

    const filteredTable = this.getFilteredTable(this.props.players);
    const displayedTable = filteredTable.slice(start, end);

    return (
      <div>
        <h1>Players Index</h1>
        <Pagination
          activePage={this.state.activePage}
          itemsCountPerPage={this.state.recordsPerPage}
          totalItemsCount={filteredTable.length}
          pageRangeDisplayed={5}
          onChange={this.handlePageChange}
        />
        {this.renderRecordsField()}
        {this.renderNameFilter()}
        {this.renderRegionFilter()}
        <Table players={displayedTable} />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { players: state.players };
}

export default connect(mapStateToProps)(App);

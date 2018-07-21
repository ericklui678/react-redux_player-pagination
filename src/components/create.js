import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { createPlayer } from '../actions/';

class Create extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: '',
      regions: '',
      id: this.generateRandomId()
    }
  }

  generateRandomId() {
    let id = '';
    let possible = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let allPlayerIDS = this.props.players.map(player => {
      return player.id;
    })

    // keep generating IDs until unique from players array
    do {
      for (let i = 0; i < 24; i++) {
        id += possible.charAt(Math.floor(Math.random() * possible.length));
      }
    } while (allPlayerIDS.indexOf(id) !== -1);
    return id;
  }

  onNameChange(name) {
    this.setState({ name });
  }

  onRegionChange(regions) {
    this.setState({ regions: [regions] });
  }

  onFormSubmit(e) {
    e.preventDefault();

    this.props.createPlayer(this.state, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <h1>Create Player</h1>
        <form onSubmit={e => this.onFormSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='playerName'>Gamer Handle</label>
            <input
              onChange={e => this.onNameChange(e.target.value)}
              className="form-control"
              id='playerName'
              value={this.state.name}
            />
          </div>
          <div className='form-group'>
            <label htmlFor='playerRegion'>Player Region</label>
            <input
              onChange={e => this.onRegionChange(e.target.value)}
              className="form-control"
              id='playerRegion'
              value={this.state.regions}
            />
          </div>
          <button type='submit' className='btn btn-primary'>Submit</button>
          <Link to='/' className='btn btn-secondary ml-2'>Cancel</Link>
        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { players: state.players };
}

export default connect(mapStateToProps, { createPlayer })(Create);

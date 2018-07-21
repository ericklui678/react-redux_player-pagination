import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { deletePlayer } from '../actions';

class Delete extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      playerIdx: ''
    }
  }

  componentDidMount() {
    const player = this.props.players.filter(player => {
      return player.id === this.props.match.params.id;
    })[0];


    this.setState({
      name: player.name,
      playerIdx: this.props.players.indexOf(player)
    });
  }

  onConfirmClick() {
    this.props.deletePlayer(this.state.playerIdx, () => {
      this.props.history.push('/');
    });
  }

  render() {
    return (
      <div>
        <h1>Are you sure you want to delete {this.state.name}? </h1>
        <button
          onClick={() => this.onConfirmClick()}
          className='btn btn-danger mr-2'>Confirm
        </button>
        <Link to='/' className='btn btn-secondary'>Cancel</Link>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { players: state.players };
}

export default connect(mapStateToProps, { deletePlayer })(Delete);

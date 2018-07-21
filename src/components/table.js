import React, { Component } from 'react';
import { Player } from './player';
import { Link } from 'react-router-dom';

export default class Table extends Component {
  render() {
    const { players } = this.props;

    let playerRow;

    if (players.length) {
      playerRow = players.map(player => {
        return <Player key={player.id} player={player}/>
      })
    }

    return (
      <div>
        <table className='table table-bordered'>
          <thead>
            <tr>
              <th colSpan='4'>
                <Link to='/create' className='btn btn-primary mr-3'>+</Link>Add a player
              </th>
            </tr>
            <tr>
              <th scope='col'>id</th>
              <th scope='col'>Name</th>
              <th scope='col'>Region</th>
              <th scope='col'>Action</th>
            </tr>
          </thead>
          <tbody>
            {playerRow}
          </tbody>
        </table>
      </div>
    );
  }
}

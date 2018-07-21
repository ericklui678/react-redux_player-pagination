import React from 'react';
import { Link } from 'react-router-dom';

export const Player = ({ player }) => {
  const {id, name, regions} = player;

  // regionStr is combined string if player is from multiple regions
  let regionStr;
  regions.length > 1 ? regionStr = regions.join(',') : regionStr = regions[0];

  return (
    <tr>
      <td>{id}</td>
      <td>{name}</td>
      <td>{regionStr}</td>
      <td>
        <Link to={`/edit/${id}`}>Edit</Link>{' '}
        <Link to={`/delete/${id}`}>Delete</Link>
      </td>
    </tr>
  )
}

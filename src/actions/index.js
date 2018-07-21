export const EDIT_PLAYER = 'edit_player';
export const DELETE_PLAYER = 'delete_player';
export const CREATE_PLAYER = 'create_player';

export function editPlayer(playerData) {
  return {
    type: EDIT_PLAYER,
    payload: playerData
  }
}

export function deletePlayer(idx, callback) {
  return {
    type: DELETE_PLAYER,
    payload: { idx: idx, callback: callback }
  }
}

export function createPlayer(data, callback) {
  return {
    type: CREATE_PLAYER,
    payload: { data: data, callback: callback }
  }
}

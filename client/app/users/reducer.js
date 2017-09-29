/*eslint-env browser*/

import {
  FETCH_USERS,
  ADD_SELECTED_USER,
  REMOVE_SELECTED_USER,
  CONFIRM_SELECTION_USERS } from './actionTypes';
import { order, removeElementById } from 'Functions';

const defaultState = {
  selected: [],
  fetched: [],
  confirmed: false
};

export default function(state = defaultState, action) {
  switch (action.type) {
  case FETCH_USERS:
    return {
      selected: [],
      fetched: action.payload.data.slice().sort(order),
      confirmed: false
    };
  case ADD_SELECTED_USER:
    let selected = state.selected.slice();
    selected.push(action.payload);

    return {
      selected: selected.sort(order),
      fetched: state.fetched.slice(),
      confirmed: state.confirmed
    };
  case REMOVE_SELECTED_USER:
    return {
      selected: removeElementById(state.selected, action.payload.id),
      fetched: state.fetched.slice(),
      confirmed: state.confirmed
    };
  case CONFIRM_SELECTION_USERS:
    return { ...state, confirmed: true };
  default:
    return state;
  }
}

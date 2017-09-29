import axios from 'axios';
import {
  FETCH_USERS,
  ADD_SELECTED_USER,
  REMOVE_SELECTED_USER,
  CONFIRM_SELECTION_USERS } from './actionTypes';
import { FETCH_URI } from './constants';

export function fetchUsers() {
  const request = axios(FETCH_URI);
  return {
    payload: request,
    type: FETCH_USERS
  };
}

export function addSelected(user) {
  return {
    payload: user,
    type: ADD_SELECTED_USER
  };
}

export function removeSelected(user) {
  return {
    payload: user,
    type: REMOVE_SELECTED_USER
  };
}

export function confirm() {
  return {
    type: CONFIRM_SELECTION_USERS
  };
}

import { combineReducers } from 'redux';
import { reducer as usersReducer } from 'App/users';

export default combineReducers({
  users: usersReducer
});

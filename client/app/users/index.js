/*eslint-env browser*/

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchUsers, addSelected, removeSelected, confirm } from './actions';
import reducer from './reducer';

class Users extends Component {
  componentDidMount() {
    this.props.fetchUsers();
  }

  renderUsers(users) {
    let confirmed = this.props.users;
    return users.map(user => {
      return (
        <li className="user" key={user.id}>
          <div className="left">
            <p>
              <input
                type="checkbox"
                disabled = {!confirmed}
                onChange={event => {
                  if (event.target.checked) {
                    return this.props.addSelected(user);
                  }
                  return this.props.removeSelected(user);
                }} />
              <label/>
            </p>
          </div>
          <div className="right">
            <div className="name">{user.name}</div>
            <div className="email">{user.email}</div>
          </div>
          <div className="clear"/>
        </li>
      );
    });
  }

  renderCount(count, total) {
    if (count > 0) {
      return <span>{count} of {total} selected</span>;
    }
    return null;
  }

  renderConfirmed(confirmed, fetched) {
    return fetched.map(user => {
      return (
        <li className="user" key={user.id}>
          {user.name} - {user.email}
        </li>
      );
    });
  }

  render() {
    let { users, users: { fetched, selected, confirmed } } = this.props;

    if (!users || !fetched) {
      return <div>Loading</div>;
    }


    return (
      <div className="users">
        { !confirmed && (
          <div>
            <div className="count">
              {this.renderCount(selected.length, fetched.length)}
            </div>
            <ul>{this.renderUsers(fetched)}</ul>
            <button onClick={() => this.props.confirm()}>Confirm</button>
          </div>
        )}
        { confirmed && selected.length > 0 && (
          <div className="confirmed">
            <h2>Confirmed user{selected.length > 1 ? 's' : ''}:</h2>
            <ul>{this.renderConfirmed(confirmed, selected)}</ul>
          </div>
        )}
        { confirmed && selected.length === 0 && (
          <div className="confirmed">
            <h2>No confirmed users</h2>
          </div>
        )}
      </div>
    );
  }
}

Users.propTypes = {
  removeSelected: PropTypes.func.isRequired,
  addSelected: PropTypes.func.isRequired,
  fetchUsers: PropTypes.func.isRequired,
  confirm: PropTypes.func.isRequired,
  users: PropTypes.object
};

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, {
  removeSelected,
  addSelected,
  fetchUsers,
  confirm
})(Users);

export { removeSelected, addSelected, fetchUsers, confirm, reducer };

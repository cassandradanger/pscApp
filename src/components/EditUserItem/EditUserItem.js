import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';

class EditUserItem extends Component {
    
  render() {
    return (
        // table displaying all user data from all users
        <tr>
            <td>{this.props.user.id}</td>
            <td>{this.props.user.username}</td>
            <td>{this.props.user.first_name}</td>
            <td>{this.props.user.last_name}</td>
            <td>{this.props.user.address}</td>
            <td>{this.props.user.email}</td>
            <td>{this.props.user.phone}</td>
            <td>{this.props.user.adult.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.user.on_patrol.toString()}</td> {/* toString method to convert boolean to string */}
            <td>{this.props.user.on_call.toString()}</td> {/* toString method to convert boolean to string */}

            {/* trash can row to delete user? */}
            <td className="trash"><span role="img" aria-labelledby="trash bin">🗑️ </span></td>
        </tr>
    );
  }
}

export default connect(mapStoreToProps)(EditUserItem);
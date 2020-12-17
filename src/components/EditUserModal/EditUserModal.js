import React, { Component } from 'react';
import { connect } from 'react-redux';
import mapStoreToProps from '../../redux/mapStoreToProps';


class EditUserModal extends Component {

  state = {
    id: '',
    username: '',
    first_name: '',
    last_name: '',
    address: '',
    email: '',
    adult: '',
    on_patrol: '',
    on_call: '',
    role: ''
  }

  handleChange = (event, typeParam) => {
    console.log(event.target.value, typeParam);
  
    this.setState( {
        [typeParam]: event.target.value
    })
  }

  submitEdit = () => {
    console.log('editing user');
    this.props.dispatch( {type: 'SUBMIT_EDIT_USER', payload: this.state} );
  }

  render() {
    return (
      <div>
          {this.props.store.editUserReducer ? 
          <div className="editModal">
          <label>Id</label>
          <input defaultValue={this.props.store.editUserReducer.id} type="text"></input>
          <br/>
          <label>Username</label>
          <input defaultValue={this.props.store.editUserReducer.username} onChange={(event) => this.handleChange(event, 'username')} type="text"></input>
          <br/>
          <label>First Name</label>
          <input defaultValue={this.props.store.editUserReducer.first_name} onChange={(event) => this.handleChange(event, 'first_name')} type="text"></input>
          <br/>
          <label>Last Name</label>
          <input defaultValue={this.props.store.editUserReducer.last_name} onChange={(event) => this.handleChange(event, 'last_name')} type="text"></input>
          <br/>
          <label>Address</label>
          <input defaultValue={this.props.store.editUserReducer.address} onChange={(event) => this.handleChange(event, 'address')} type="text"></input>
          <br/>
          <label>Email</label>
          <input defaultValue={this.props.store.editUserReducer.email} onChange={(event) => this.handleChange(event, 'email')} type="text"></input>
          <br/>
          <label>Adult</label>
          <input defaultValue={this.props.store.editUserReducer.adult} onChange={(event) => this.handleChange(event, 'adult')} type="text"></input>
          <br/>
          <label>On Patrol</label>
          <input defaultValue={this.props.store.editUserReducer.on_patrol} onChange={(event) => this.handleChange(event, 'on_patrol')} type="text"></input>
          <br/>
          <label>On Call</label>
          <input defaultValue={this.props.store.editUserReducer.on_call} onChange={(event) => this.handleChange(event, 'on_call')} type="text"></input>
          <br/>
          <label>Role</label>
          <input defaultValue={this.props.store.editUserReducer.role} onChange={(event) => this.handleChange(event, 'role')} type="text"></input>
          <br/>
          <button onClick={this.submitEdit}>Submit Edit</button>
          </div>
        :
        <></>
        }
      </div>
    );
  }
}

export default connect(mapStoreToProps)(EditUserModal);
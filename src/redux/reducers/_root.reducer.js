import { combineReducers } from 'redux';
import errors from './errors.reducer';
import user from './user.reducer';
import patrolReducer from './patrol.reducer';//reducer to hold onpatrol count
import onCallReducer from './on.call.reducer';//reducer to hold onpatrol count
import incidentReducer from './incident.reducer'; // reducer to hold onto all incident data from all users
import publicIncidentReducer from './public.incident.reducer';
import activeIncidentReducer from './active.incident.reducer'; // reducer to hold the count of all active incidents
import allUsersReducer from './all.users.reducer'; // reducer storing all user data, not just the user logged in
import editUserReducer from './edit.user.reducer'; // reducer to help with edit user
import editIncidentReducer from './edit.incident.reducer'; // reducer to help with edit incident

// rootReducer is the primary reducer for our entire project
// It bundles up all of the other reducers so our project can use them.
// This is imported in index.js as rootSaga

// Lets make a bigger object for our store, with the objects from our reducers.
// This is what we get when we use 'state' inside of 'mapStateToProps'
const rootReducer = combineReducers({
  errors, // contains registrationMessage and loginMessage
  user, // will have an id and username if someone is logged in
  patrolReducer,//count of on-patrol volunteers
  onCallReducer,//count of on-call volunteers
  incidentReducer, // reducer storing history of all incidents
  publicIncidentReducer, // reducer storing all publicly viewed incidents
  activeIncidentReducer, // reducer storing count of all active incidents
  allUsersReducer, // reducer storing all users
  editUserReducer, // reducer used to edit user
  editIncidentReducer, // reducer used to edit incident
});

export default rootReducer;

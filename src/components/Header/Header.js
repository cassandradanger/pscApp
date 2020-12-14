import React, { Component } from 'react';
import { connect } from 'react-redux';
import {HashRouter as Link} from 'react-router-dom';
import {withRouter} from 'react-router';
import "./Header.css";
import Nav from '../Nav/Nav';

class Header extends Component {

  componentDidMount = () => {
    this.props.dispatch({type: 'FETCH_PATROL_COUNT'});
  }

  render() {
    return ( 
      <div className="header">
        <div className="titleContainer">
          <Link to="/home">
            <h2 className="nav-title">Powderhorn Safety Collective</h2>
          </Link>
          <div className="patrolDisplay">
            {this.props.reduxStore.patrolCountReducer == 1 && 
              <h2> {this.props.reduxStore.patrolCountReducer} person is on patrol</h2>
            }
            {this.props.reduxStore.patrolCountReducer == 0 &&
              <h2>No One is on Patrol</h2>
            }
            {this.props.reduxStore.patrolCountReducer > 1 &&
              <h2> {this.props.reduxStore.patrolCountReducer} people are on patrol</h2>
            }
            <h2>### people are on call</h2>
          </div>
        </div>
        <Nav/>
      </div>
    )
  }
}

const mapStoreToProps = reduxStore=> ({
  reduxStore
})

export default withRouter(connect(mapStoreToProps)(Header));
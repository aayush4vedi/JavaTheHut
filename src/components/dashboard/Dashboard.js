import React, { Component } from 'react'
import AdventureList from '../adventures/AdventureList'
import Notifications from './Notifications'
import { connect } from 'react-redux'

class Dashboard extends Component {
  render() {
    const {adventures} =  this.props
    return (
      <div className="dashboard container">
        <div className="row">
          <div className="col s12 m6">
            <AdventureList adventures = {adventures}/>
          </div>
          <div className="col s12 m5 offset-m1">
            <Notifications />
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    adventures: state.adventure.adventures
  }
}

export default connect(mapStateToProps)(Dashboard)
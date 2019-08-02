import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import Tracker from './tracker'
/**
 * COMPONENT
 */
export const Robinhood = props => {
  const {email} = props

  return (
    <div>
      <h3>{email}</h3>
      <Tracker />
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    email: state.user.email
  }
}

export default connect(mapState)(Robinhood)

/**
 * PROP TYPES
 */
Robinhood.propTypes = {
  email: PropTypes.string
}

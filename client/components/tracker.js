import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {savePosition, createPosition} from '../store'

class Tracker extends React.Component {
  constructor(props) {
    super()
    this.createPosition = this.createPosition.bind(this)
  }
  createPosition() {
    const position = new Position(this.props.user.id)
    this.props.createPosition(position)
  }
  render() {
    const {positions} = this.props.user
    return (
      <div>
        <div onClick={this.createPosition}>+</div>
        <PositionTable positions={positions} />
      </div>
    )
  }
}

const PositionTable = props => {
  return (
    <ul className="positions">{props.positions.map(position => <li>1</li>)}</ul>
  )
}
const mapState = state => {
  return {
    user: state.user
  }
}
const mapDispatch = (dispatch, state) => {
  return {
    createPosition(position) {
      dispatch(createPosition(position))
    },
    savePosition() {
      dispatch(savePosition())
    }
  }
}
export default connect(mapState, mapDispatch)(Tracker)

Tracker.propTypes = {
  positions: PropTypes.array
}
class Position {
  constructor(user) {
    this.user_id = user
    this.symbol = ''
    this.ask = ''
    this.sell = ''
    this.bought = ''
    this.sold = ''
  }
}

import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {savePosition, createPosition} from '../store'
import DatePicker from 'react-datepicker'

import 'react-datepicker/dist/react-datepicker.css'

class Position {
  constructor(user) {
    this.userId = user
    this.quantity = ''
    this.symbol = ''
    this.ask = ''
    this.sell = ''
    this.bought = ''
    this.sold = ''
    this.buyingSelected = false
    this.editCell
  }
}

class Tracker extends React.Component {
  constructor(props) {
    super()
    this.state = {
      symbol: '',
      quantity: '',
      ask: '',
      sell: '',
      bought: '',
      sold: ''
    }
    this.createPosition = this.createPosition.bind(this)
    this.savePosition = this.savePosition.bind(this)
    this.updateValue = this.updateValue.bind(this)
    this.editPosition = this.editPosition.bind(this)
    this.boughtSelected = this.boughtSelected.bind(this)
  }
  updateValue(event) {
    this.setState({
      [event.target.id]: event.target.value
    })
  }
  editPosition(index) {
    this.setState({
      editCell: index
    })
  }
  boughtSelected() {
    this.setState({
      buyingSelected: true
    })
  }
  createPosition() {
    const position = new Position(this.props.user.id)
    this.props.createPosition(position)
  }
  savePosition() {
    let currentPosition = this.props.user.positions[0]
    currentPosition.symbol = this.state.symbol
    currentPosition.quantity = this.state.quantity
    currentPosition.ask = this.state.ask
    currentPosition.sell = this.state.sell
    currentPosition.bought = this.state.bought
    currentPosition.sold = this.state.sold
    this.props.savePosition(currentPosition)
  }
  render() {
    const {positions} = this.props.user
    return (
      <div>
        <div onClick={this.createPosition}>+</div>
        <PositionTable
          positions={positions}
          createPosition={this.createPosition}
          savePosition={this.savePosition}
          updateValue={this.updateValue}
          editPosition={this.editPosition}
          boughtSelected={this.boughtSelected}
          state={this.state}
        />
      </div>
    )
  }
}

const PositionTable = props => {
  return (
    <form onSubmit={props.savePosition}>
      <table className="positions">
        <tbody>
          <tr>
            <td>Symbol</td>
            <td>Quantity</td>
            <td>Ask</td>
            <td>Sell</td>
            <td>Bought</td>
            <td>Sold</td>
          </tr>
          {props.positions.map(
            (position, index) =>
              position.symbol === '' || props.state.editCell === index ? (
                <NewPosition
                  key={index}
                  position={position}
                  state={props.state}
                  savePosition={props.savePosition}
                  updateValue={props.updateValue}
                  boughtSelected={props.boughtSelected}
                />
              ) : (
                <CurrentPosition
                  key={position.symbol}
                  position={position}
                  editPosition={props.editPosition}
                />
              )
          )}
        </tbody>
      </table>
    </form>
  )
}
const NewPosition = props => {
  return (
    <tr>
      <td>
        <input
          required="true"
          id="symbol"
          placeholder="Symbol"
          value={props.state.symbol}
          onChange={props.updateValue}
        />
      </td>
      <td>
        <input
          required="true"
          id="quantity"
          placeholder="Quantity"
          value={props.state.quantity}
          onChange={props.updateValue}
        />
      </td>
      <td>
        <input
          required="true"
          id="ask"
          placeholder="Ask"
          value={props.state.ask}
          onChange={props.updateValue}
        />
      </td>
      <td>
        <input
          id="sell"
          placeholder="Sell"
          value={props.state.sell}
          onChange={props.updateValue}
        />
      </td>
      <td>
        <DatePicker />
        {/* <input required="true"
          id="bought"
          placeholder="Bought"
          value={props.state.bought}
          onChange={props.updateValue}
          onClick={props.boughtSelected} /> */}
      </td>
      <td>
        <input
          id="sold"
          placeholder="Sold"
          value={props.state.sold}
          onChange={props.updateValue}
        />
      </td>
      <td>
        <button type="submit">Save</button>
      </td>
    </tr>
  )
}
const CurrentPosition = props => {
  const {position} = props
  return (
    <tr>
      <th>{position.symbol}</th>
      <th>{position.quantity}</th>
      <th>{position.ask}</th>
      <th>{position.sell}</th>
      <th>{position.bought}</th>
      <th>{position.sold}</th>
      <th>
        <button
          onClick={() => {
            props.editPosition(position.id - 1)
          }}
        >
          Edit
        </button>
      </th>
    </tr>
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
    savePosition(position) {
      dispatch(savePosition(position))
    }
  }
}
export default connect(mapState, mapDispatch)(Tracker)

Tracker.propTypes = {
  positions: PropTypes.array
}

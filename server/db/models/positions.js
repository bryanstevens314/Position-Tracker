const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Positions = db.define('position', {
  quantity: {
    type: Sequelize.STRING,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ask: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sell: {
    type: Sequelize.STRING
  },
  bought: {
    type: Sequelize.STRING,
    allowNull: false
  },
  sold: {
    type: Sequelize.STRING
  }
})

module.exports = Positions

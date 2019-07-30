const crypto = require('crypto')
const Sequelize = require('sequelize')
const db = require('../db')

const Positions = db.define('position', {
  user_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  symbol: {
    type: Sequelize.STRING,
    allowNull: false
  },
  ask: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  sell: {
    type: Sequelize.INTEGER
  },
  bought: {
    type: Sequelize.DATE,
    allowNull: false
  },
  sold: {
    type: Sequelize.DATE
  }
})

module.exports = Positions

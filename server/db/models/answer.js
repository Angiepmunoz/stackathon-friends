const Sequelize = require('sequelize')
const db = require('../db')

const Answer = db.define('answer', {
  response: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  correct: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
})

module.exports = Answer

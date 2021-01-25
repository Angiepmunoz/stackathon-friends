const Sequelize = require('sequelize')
const db = require('../db')

const Survey = db.define('survey', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  }
})

module.exports = Survey

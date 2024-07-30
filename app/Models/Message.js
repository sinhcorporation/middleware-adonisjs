'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Message extends Model {
  static boot () {
    super.boot()
  }

  sender () {
    return this.belongsTo('App/Models/User', 'sender_id', 'id')
  }

  receiver () {
    return this.belongsTo('App/Models/User', 'receiver_id', 'id')
  }

  chat () {
    return this.belongsTo('App/Models/Chat', 'chat_id', 'id')
  }

  files () {
    return this.hasMany('App/Models/File')
  }
}

module.exports = Message

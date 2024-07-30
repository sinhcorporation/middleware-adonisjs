'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Chat extends Model {
  static boot () {
    super.boot()
  }

  participants () {
    return this.manyThrough('App/Models/UserChat', 'user', 'chat_id', 'user_id')
  }

  messages () {
    return this.hasMany('App/Models/Message')
  }
}

module.exports = Chat

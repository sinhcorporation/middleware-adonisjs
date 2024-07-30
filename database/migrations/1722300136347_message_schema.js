'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class MessageSchema extends Schema {
  up () {
    this.create('messages', (table) => {
      table.increments('id')
      table.integer('sender_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('receiver_id').unsigned().references('id').inTable('users').onDelete('CASCADE')
      table.integer('chat_id').unsigned().references('id').inTable('chats').onDelete('CASCADE')
      table.text('content').notNullable()
      table.enum('content_type', ['text', 'image', 'video', 'document']).notNullable()
      table.enum('status', ['sent', 'delivered', 'read']).defaultTo('sent')
      table.timestamp('sent_at').defaultTo(this.fn.now())
      table.timestamps()
    })
  }

  down () {
    this.drop('messages')
  }
}

module.exports = MessageSchema

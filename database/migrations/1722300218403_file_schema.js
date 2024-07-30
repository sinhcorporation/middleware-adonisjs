'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class FileSchema extends Schema {
  up () {
    this.create('files', (table) => {
      table.increments('id')
      table.integer('message_id').unsigned().references('id').inTable('messages').onDelete('CASCADE')
      table.enum('file_type', ['image', 'video', 'document']).notNullable()
      table.string('url').notNullable()
      table.timestamps()
    })
  }

  down () {
    this.drop('files')
  }
}

module.exports = FileSchema

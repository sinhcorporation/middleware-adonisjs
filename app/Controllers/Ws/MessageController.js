'use strict'

const Message = use('App/Models/Message')

class MessageController {
  async index ({ request, response }) {
    const messages = await Message.query().with('sender').with('receiver').fetch()
    return response.json(messages)
  }

  async store ({ request, response }) {
    const { sender_id, receiver_id, chat_id, content, content_type, status, sent_at } = request.all()
    const message = await Message.create({ sender_id, receiver_id, chat_id, content, content_type, status, sent_at })
    return response.status(201).json(message)
  }

  async show ({ params, response }) {
    const message = await Message.findOrFail(params.id)
    await message.loadMany(['sender', 'receiver'])
    return response.json(message)
  }

  async update ({ params, request, response }) {
    const message = await Message.findOrFail(params.id)
    const { sender_id, receiver_id, chat_id, content, content_type, status, sent_at } = request.all()
    message.merge({ sender_id, receiver_id, chat_id, content, content_type, status, sent_at })
    await message.save()
    return response.json(message)
  }

  async destroy ({ params, response }) {
    const message = await Message.findOrFail(params.id)
    await message.delete()
    return response.status(204).json(null)
  }
}

module.exports = MessageController

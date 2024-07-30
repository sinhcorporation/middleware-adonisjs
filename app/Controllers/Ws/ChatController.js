'use strict'

const Chat = use('App/Models/Chat')

class ChatController {
  async index ({ response }) {
    const chats = await Chat.query().with('participants').fetch()
    return response.json(chats)
  }

  async store ({ request, response }) {
    const { chat_type, name } = request.all()
    const chat = await Chat.create({ chat_type, name })
    return response.status(201).json(chat)
  }

  async show ({ params, response }) {
    const chat = await Chat.findOrFail(params.id)
    await chat.load('participants')
    return response.json(chat)
  }

  async update ({ params, request, response }) {
    const chat = await Chat.findOrFail(params.id)
    const { chat_type, name } = request.all()
    chat.merge({ chat_type, name })
    await chat.save()
    return response.json(chat)
  }

  async destroy ({ params, response }) {
    const chat = await Chat.findOrFail(params.id)
    await chat.delete()
    return response.status(204).json(null)
  }
}

module.exports = ChatController


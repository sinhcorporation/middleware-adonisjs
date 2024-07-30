'use strict'

const File = use('App/Models/File')

class FileController {
  async index ({ response }) {
    const files = await File.query().with('message').fetch()
    return response.json(files)
  }

  async store ({ request, response }) {
    const { message_id, file_type, url } = request.all()
    const file = await File.create({ message_id, file_type, url })
    return response.status(201).json(file)
  }

  async show ({ params, response }) {
    const file = await File.findOrFail(params.id)
    await file.load('message')
    return response.json(file)
  }

  async update ({ params, request, response }) {
    const file = await File.findOrFail(params.id)
    const { message_id, file_type, url } = request.all()
    file.merge({ message_id, file_type, url })
    await file.save()
    return response.json(file)
  }

  async destroy ({ params, response }) {
    const file = await File.findOrFail(params.id)
    await file.delete()
    return response.status(204).json(null)
  }
}

module.exports = FileController

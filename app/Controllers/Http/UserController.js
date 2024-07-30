'use strict'

const User = use('App/Models/User')
const { validate } = use('Validator')

class UserController {
  async index ({ response }) {
    const users = await User.all()
    return response.json(users)
  }

  async store ({ request, response }) {
    const validation = await validate(request.all(), {
      username: 'required|min:3|max:80|unique:users,username',
      email: 'required|email|unique:users,email',
      password: 'required|min:6|max:60'
    })

    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() })
    }

    const { username, email, password } = request.all()
    const user = new User()
    user.username = username
    user.email = email
    user.password = password

    await user.save()
    return response.status(201).json(user)
  }

  async show ({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ data: 'User not found' })
    }
    return response.json(user)
  }

  async update ({ params, request, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ data: 'User not found' })
    }

    const validation = await validate(request.all(), {
      username: `required|min:3|max:80|unique:users,username,id,${params.id}`,
      email: `required|email|unique:users,email,id,${params.id}`,
      password: 'min:6|max:60'
    })

    if (validation.fails()) {
      return response.status(400).json({ message: validation.messages() })
    }

    user.username = request.input('username')
    user.email = request.input('email')
    if (request.input('password')) {
      user.password = request.input('password')
    }

    await user.save()
    return response.status(200).json(user)
  }

  async destroy ({ params, response }) {
    const user = await User.find(params.id)
    if (!user) {
      return response.status(404).json({ data: 'User not found' })
    }
    await user.delete()
    return response.status(204).json(null)
  }
}

module.exports = UserController

'use strict'

/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URLs and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')

Route.get('/', () => {
  return { greeting: 'Hello world in JSON' }
})
//users
Route.get('users', 'UserController.index')
Route.post('users', 'UserController.store')
Route.get('users/:id', 'UserController.show')
Route.put('users/:id', 'UserController.update')
Route.delete('users/:id', 'UserController.destroy')

// Mensajes
Route.get('messages', 'MessageController.index')
Route.post('messages', 'MessageController.store')
Route.get('messages/:id', 'MessageController.show')
Route.put('messages/:id', 'MessageController.update')
Route.delete('messages/:id', 'MessageController.destroy')

// Chats
Route.get('chats', 'ChatController.index')
Route.post('chats', 'ChatController.store')
Route.get('chats/:id', 'ChatController.show')
Route.put('chats/:id', 'ChatController.update')
Route.delete('chats/:id', 'ChatController.destroy')

// Archivos
Route.get('files', 'FileController.index')
Route.post('files', 'FileController.store')
Route.get('files/:id', 'FileController.show')
Route.put('files/:id', 'FileController.update')
Route.delete('files/:id', 'FileController.destroy')
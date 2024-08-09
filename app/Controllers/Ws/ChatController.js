'use strict'

const Chat = use('App/Models/Chat')
const Message = use('App/Models/Message')
const File = use('App/Models/File')

class ChatController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  // Escuchar mensajes enviados por un usuario
  async onMessage (data) {
    try {
      // Crear y guardar el mensaje en la base de datos
      const message = await Message.create({
        sender_id: data.sender_id,
        receiver_id: data.receiver_id,
        chat_id: data.chat_id,
        content: data.content,
        content_type: data.content_type,
        status: 'sent',
        sent_at: new Date()
      });

      // Si el mensaje incluye archivos, guardar cada archivo
      if (data.files && data.files.length > 0) {
        await Promise.all(data.files.map(async file => {
          await File.create({
            message_id: message.id,
            file_type: file.file_type,
            url: file.url
          });
        }));
      }

      // Emitir el mensaje a todos los usuarios conectados en el chat
      this.socket.broadcastToAll('message', message)
    } catch (err) {
      console.log('Error al enviar el mensaje:', err)
    }
  }
}

module.exports = ChatController

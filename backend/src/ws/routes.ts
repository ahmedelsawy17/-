import type { FastifyInstance } from 'fastify';

export async function wsRoutes(app: FastifyInstance) {
  app.get('/api/ws', { websocket: true }, (socket) => {
    socket.send(JSON.stringify({ type: 'connected', message: 'Realtime channel ready' }));

    socket.on('message', (message) => {
      socket.send(JSON.stringify({ type: 'echo', payload: message.toString() }));
    });
  });
}

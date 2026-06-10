import { io } from 'socket.io-client'

/**
 * Socket.IO client instance.
 *
 * - autoConnect: false → manually connect after authentication
 * - withCredentials: true → send httpOnly cookies
 */
export const socket = io(import.meta.env.VITE_SOCKET_URL, {
  autoConnect: false,
  withCredentials: true,
})

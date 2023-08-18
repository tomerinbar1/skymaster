import { defineStore } from 'pinia'
import { Msg } from '../interfaces/interfaces'

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: [] as Msg[],
  }),
  getters: {},
  actions: {
    async sendMessage(message: Msg) {
      this.messages.push(message)
    },
  },
})

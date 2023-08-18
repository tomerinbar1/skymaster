<template>
  <div class="chat">
    <img class="chat-icon" src="../assets/icons/WhatsApp.svg" alt="chat" @click="onToggleChat" />
    <div class="chat-wrapper" v-if="isChatOpen">
      <div class="chat-header">
        <a href="#" class="chat-close" @click.prevent="onCloseChat">x</a>
        {{ user?.displayName }}
      </div>
      <div v-if="user" class="chat-contents">
        <div
          v-for="message in messages"
          :key="message.createdAt.toMillis()"
          :class="['message', onSentOrReceived(message._id ? message._id : '')]"
        >
          <div>
            <div class="message-time">
              {{
                new Date(message.createdAt.toDate()).toLocaleTimeString('en-GB', {
                  hour12: false,
                })
              }}
            </div>
            <div>
              <h5 class="user-name">
                {{ message?.sender }}
              </h5>
              <p class="message-text">
                {{ message.content }}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="chat-contents">
        <div class="message sent">
          <div>
            <h5 class="user-name">אורח</h5>
            <p class="message-text">עליך להתחבר כדי להשתמש בצ'אט</p>
          </div>
        </div>
      </div>

      <form v-on:submit.prevent="onSendMessage" class="chat-input">
        <input type="text" v-model="message" placeholder="כתוב הודעה" />
        <button :disabled="!message" type="submit">שלח</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, Ref } from 'vue'
import { useAuthStore } from '../stores/auth.store'
import { useChatStore } from '../stores/chat.store'
import { Msg } from '../interfaces/interfaces'
import { Timestamp } from 'firebase/firestore'

export default defineComponent({
  name: 'Chat',
  setup() {
    // const ADMIN_ID = import.meta.env.VITE_ADMIN_ID as string

    const authStore = useAuthStore()
    const chatStore = useChatStore()
    const user = computed(() => authStore.user)
    const isChatOpen = ref(false)
    const messages = computed(() => chatStore.messages)
    let message: Ref<string> = ref('')

    const onToggleChat = async () => {
      isChatOpen.value = !isChatOpen.value
    }

    const onCloseChat = () => {
      isChatOpen.value = false
    }

    const onSendMessage = async () => {
      if(!user.value) return
      const newMessage: Msg = {
        _id: user.value?.uid,
        sender: user.value?.displayName || 'אורח',
        content: message.value,
        createdAt: Timestamp.now(),
      }
      await chatStore.sendMessage(newMessage)
      message.value = ''
    }

    const onSentOrReceived = (userUID: string) => {
      return userUID === user.value?.uid ? 'sent' : 'received'
    }

    return {
      onSentOrReceived,
      onSendMessage,
      onToggleChat,
      onCloseChat,
      isChatOpen,
      messages,
      message,
      user,
    }
  },
})
</script>

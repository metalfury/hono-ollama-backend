import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import  ollama  from 'ollama'
import fs from 'fs/promises'
import path from 'path'
import { cors } from 'hono/cors'

const app = new Hono()
// cross origin resource sharing
app.use('/*', cors({
  origin: 'http://localhost:5173',
  allowMethods: ['POST', 'GET', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
}))

type MessageHistory = Message[]
const HISTORY_FILE = path.join(__dirname, 'message_history.json')
//Role type: user is the user who sends the message, assistant is the AI who responds to the user, system is the memory of the system
type Role = 'system' | 'user' | 'assistant' 

interface Message {
    role: Role
    content: string
}

// Load message history from file
async function LOAD_MESSAGE_HISTORY(): Promise<MessageHistory> {
  try {
    const data = await fs.readFile(HISTORY_FILE, 'utf-8')
    return JSON.parse(data) as MessageHistory
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === 'ENOENT') {
      return [
        { role: 'system', 
          content: 'You are a Turkish speaking assistant. Please write your responses in Turkish.' 
        }]
    }
    throw error
  }
}

async function WRITE_MESSAGE_HISTORY(history: MessageHistory): Promise<void> {
  await fs.writeFile(HISTORY_FILE, JSON.stringify(history, null, 2), 'utf8')
}


app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get('/message-history', async (c) => {
  const MESSAGE_HISTORY = await LOAD_MESSAGE_HISTORY()
  return c.json(MESSAGE_HISTORY)
})

app.post('/generate', async (c) => {
    const MESSAGE_HISTORY = await LOAD_MESSAGE_HISTORY()
    const body = await c.req.json();
    const prompt = body.prompt;
    MESSAGE_HISTORY.push({ role: 'user', content: prompt })
    const response = await ollama.chat({  
      model:'gemma2:27b',
      messages: MESSAGE_HISTORY,
    })
    MESSAGE_HISTORY.push({ role: 'assistant', content: response.message.content })
    await WRITE_MESSAGE_HISTORY(MESSAGE_HISTORY)
    return c.json({ message: response.message.content })
})

const port = 3037
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})

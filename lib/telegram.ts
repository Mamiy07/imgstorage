const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!
const CHANNEL_ID = process.env.TELEGRAM_MASTER_CHANNEL_ID!
const BASE = `https://api.telegram.org/bot${BOT_TOKEN}`

export async function uploadImageToTelegram(
  file: File
): Promise<{ file_id: string; message_id: number }> {
  const form = new FormData()
  form.append('chat_id', CHANNEL_ID)
  form.append('document', file, file.name)

  const res = await fetch(`${BASE}/sendDocument`, {
    method: 'POST',
    body: form,
  })

  const data = await res.json()
  if (!data.ok) throw new Error(`Telegram error: ${data.description}`)

  return {
    file_id: data.result.document.file_id,
    message_id: data.result.message_id,
  }
}

export async function getImageUrl(fileId: string): Promise<string> {
  const res = await fetch(`${BASE}/getFile?file_id=${fileId}`)
  const data = await res.json()
  if (!data.ok) throw new Error(`Telegram error: ${data.description}`)
  return `https://api.telegram.org/file/bot${BOT_TOKEN}/${data.result.file_path}`
}

export async function deleteImageFromTelegram(messageId: number): Promise<void> {
  await fetch(`${BASE}/deleteMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: CHANNEL_ID,
      message_id: messageId,
    }),
  })
}
import { nanoid } from 'nanoid'

export function generateApiKey(): string {
  // Format: imgdrive_xxxxxxxxxxxxxxxxxxxxxxxxxx
  return `imgdrive_${nanoid(32)}`
}
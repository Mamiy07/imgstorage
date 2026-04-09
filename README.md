# imgstorage — Free Image Storage API

> Upload, store and serve images via a simple REST API. Powered by Telegram's infrastructure. No limits, no credit card, no BS.

---

## Table of Contents

- [What is imgstorage?](#what-is-imgstorage)
- [How it Works](#how-it-works)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Local Setup Guide](#local-setup-guide)
  - [1. Clone the repo](#1-clone-the-repo)
  - [2. Install dependencies](#2-install-dependencies)
  - [3. Set up NeonDB](#3-set-up-neondb)
  - [4. Set up Google OAuth](#4-set-up-google-oauth)
  - [5. Set up GitHub OAuth](#5-set-up-github-oauth)
  - [6. Set up Telegram Bot](#6-set-up-telegram-bot)
  - [7. Set up Telegram Group](#7-set-up-telegram-group)
  - [8. Configure environment variables](#8-configure-environment-variables)
  - [9. Set up the database](#9-set-up-the-database)
  - [10. Run the app](#10-run-the-app)
- [API Reference](#api-reference)
  - [Authentication](#authentication)
  - [Upload an Image](#upload-an-image)
  - [List Images](#list-images)
  - [Delete an Image](#delete-an-image)
  - [Serve an Image](#serve-an-image)
- [Dashboard Guide](#dashboard-guide)
- [Using imgstorage in Your Project](#using-imgstorage-in-your-project)
  - [JavaScript / TypeScript](#javascript--typescript)
  - [Python](#python)
  - [cURL](#curl)
  - [React Hook](#react-hook)
- [Database Schema](#database-schema)
- [Environment Variables Reference](#environment-variables-reference)
- [Common Errors & Fixes](#common-errors--fixes)
- [Contributing](#contributing)
- [License](#license)

---

## What is imgstorage?

imgstorage is a **free image storage API platform** built for developers. Sign up, get an API key, and start uploading images from any project — whether it's a Next.js app, a Python backend, a mobile app, or anything else.

Under the hood, images are stored in a private **Telegram group** using the Telegram Bot API. This means:

- **Zero storage costs** — Telegram stores everything for free
- **Global CDN** — Telegram's infrastructure delivers images worldwide
- **No limits** — store as many images as you want
- **Always free** — no plans, no tiers, no credit card

---

## How it Works

```
Developer uploads image via API
           ↓
imgstorage receives the image
           ↓
Bot sends image to private Telegram group
           ↓
Telegram returns a file_id
           ↓
imgstorage saves file_id + metadata to NeonDB
           ↓
Developer gets back a permanent URL
           ↓
Anyone can access the image at /i/:id
```

When someone requests an image at `/i/:id`, imgstorage fetches it from Telegram in real time and serves it back with proper cache headers — so the image loads fast and is cached by the browser for a year.

---

## Features

- **REST API** — simple endpoints any language can use
- **API Key authentication** — create multiple keys per account
- **Dashboard** — visual interface to manage images and keys
- **Direct image URLs** — every image gets a permanent shareable URL
- **Google & GitHub login** — sign in with your existing accounts
- **Usage tracking** — see how many requests each key has made
- **Image deletion** — delete from both the database and Telegram
- **CORS enabled** — use the API from any frontend
- **Fully open source** — run it yourself for free

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Auth | NextAuth.js v4 |
| Database ORM | Prisma |
| Database | PostgreSQL (NeonDB) |
| Storage | Telegram Bot API |
| Styling | Tailwind CSS |
| Deployment | Vercel (recommended) |

---

## Project Structure

```
imgstorage/
├── app/
│   ├── page.tsx                          # Landing page
│   ├── login/
│   │   └── page.tsx                      # Login page
│   ├── dashboard/
│   │   ├── layout.tsx                    # Dashboard sidebar layout
│   │   ├── page.tsx                      # Overview / stats
│   │   ├── images/
│   │   │   └── page.tsx                  # Image manager
│   │   ├── api-keys/
│   │   │   └── page.tsx                  # API key manager
│   │   └── docs/
│   │       └── page.tsx                  # API documentation
│   ├── i/
│   │   └── [slug]/
│   │       └── route.ts                  # Image serve endpoint
│   └── api/
│       ├── auth/
│       │   └── [...nextauth]/
│       │       └── route.ts              # NextAuth handler
│       ├── keys/
│       │   ├── route.ts                  # Create / list API keys
│       │   └── [id]/
│       │       └── route.ts              # Delete API key
│       ├── images/
│       │   └── [slug]/
│       │       └── route.ts              # Delete image (dashboard)
│       └── v1/
│           ├── upload/
│           │   └── route.ts              # Public upload API
│           ├── upload-dashboard/
│           │   └── route.ts              # Dashboard upload
│           └── images/
│               ├── route.ts              # Public list images API
│               └── [slug]/
│                   └── route.ts          # Public delete image API
├── components/
│   ├── ApiKeyCard.tsx                    # API key display card
│   ├── CreateApiKeyButton.tsx            # Create new key button
│   ├── ImageGrid.tsx                     # Image gallery grid
│   ├── SignOutButton.tsx                 # Sign out button
│   └── UploadZone.tsx                    # Drag & drop uploader
├── lib/
│   ├── auth.ts                           # Auth helper
│   ├── generate-key.ts                   # API key generator
│   ├── prisma.ts                         # Prisma client singleton
│   └── telegram.ts                       # Telegram Bot API helpers
├── prisma/
│   └── schema.prisma                     # Database schema
├── types/
│   └── next-auth.d.ts                    # NextAuth type extensions
├── middleware.ts                          # Route protection
├── next.config.js                         # Next.js config
└── .env.local                             # Environment variables
```

---

## Prerequisites

Before you start, make sure you have these installed:

- **Node.js** v18 or higher — [download](https://nodejs.org)
- **npm** v9 or higher (comes with Node.js)
- **Git** — [download](https://git-scm.com)
- A **Telegram** account
- A **Google** account (for OAuth)
- A **GitHub** account (for OAuth)

---

## Local Setup Guide

Follow every step carefully. This takes about 20-30 minutes on first setup.

---

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/imgstorage.git
cd imgstorage
```

---

### 2. Install dependencies

```bash
npm install
```

---

### 3. Set up NeonDB

NeonDB is a free serverless PostgreSQL database.

1. Go to [neon.tech](https://neon.tech) and sign up for free
2. Click **New Project**
3. Give it a name like `imgstorage`
4. Select a region closest to you
5. Click **Create Project**
6. On the dashboard, click **Connection Details**
7. Copy the connection string — it looks like:
   ```
   postgresql://username:password@ep-xxx-xxx.us-east-2.aws.neon.tech/neondb?sslmode=require
   ```
8. Save this — you'll need it for the `DATABASE_URL` environment variable

---

### 4. Set up Google OAuth

1. Go to [console.cloud.google.com](https://console.cloud.google.com)
2. Create a new project or select an existing one
3. In the sidebar go to **APIs & Services** → **Credentials**
4. Click **Create Credentials** → **OAuth Client ID**
5. If prompted, configure the OAuth consent screen first:
   - User type: **External**
   - App name: `imgstorage`
   - Add your email as developer contact
   - Save and continue through all steps
6. Back in Credentials → **Create Credentials** → **OAuth Client ID**
7. Application type: **Web application**
8. Name it `imgstorage Local`
9. Under **Authorized redirect URIs** add:
   ```
   http://localhost:3000/api/auth/callback/google
   ```
10. Click **Create**
11. Copy the **Client ID** and **Client Secret**

---

### 5. Set up GitHub OAuth

1. Go to [github.com/settings/developers](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Fill in:
   - Application name: `imgstorage`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Click **Register application**
5. Copy the **Client ID**
6. Click **Generate a new client secret** and copy it

---

### 6. Set up Telegram Bot

1. Open Telegram and search for **@BotFather**
2. Start a chat and send `/newbot`
3. When asked for a name, type something like `imgstorage Bot`
4. When asked for a username, type something ending in `bot` like `teledrive_storage_bot`
5. BotFather will reply with your **bot token** — it looks like:
   ```
   7123456789:AAFxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
   ```
6. Copy and save this token — you need it for `TELEGRAM_BOT_TOKEN`
7. Now disable privacy mode so the bot can read group messages:
   - Send `/mybots` to BotFather
   - Select your bot
   - Click **Bot Settings**
   - Click **Group Privacy**
   - Click **Turn off**
   - BotFather confirms: "Privacy mode is disabled"

---

### 7. Set up Telegram Group

The bot needs a private group to store images in.

1. Open Telegram and tap the compose / pencil icon
2. Select **New Group**
3. In the search bar, search your bot username (e.g. `teledrive_storage_bot`)
4. Select it and tap **Next**
5. Name the group something like `imgstorage Storage`
6. Tap **Create**
7. The bot is now in the group — promote it to admin:
   - Tap the group name at the top
   - Tap **Edit** (pencil icon)
   - Tap **Administrators**
   - Tap **Add Administrator**
   - Select your bot
   - Enable all permissions and save
8. Now get the group ID:
   - Go to [web.telegram.org](https://web.telegram.org) in your browser
   - Log in with your phone number
   - Open your storage group from the left sidebar
   - Look at the URL in the address bar:
     ```
     https://web.telegram.org/k/#-1001234567890
     ```
   - The group ID is everything after `#` **including the minus sign**: `-1001234567890`
   - Save this for `TELEGRAM_MASTER_CHANNEL_ID`

> **Verify the bot works:** Send a message in the group, then open this URL in your browser (replace with your actual token):
> `https://api.telegram.org/botYOUR_TOKEN/getUpdates`
> You should see JSON with the group info.

---

### 8. Configure environment variables

Create a file called `.env.local` in the root of your project:

```bash
# Database
DATABASE_URL="postgresql://username:password@ep-xxx.neon.tech/neondb?sslmode=require"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-here"

# Google OAuth
GOOGLE_CLIENT_ID="xxxx.apps.googleusercontent.com"
GOOGLE_CLIENT_SECRET="GOCSPX-xxxx"

# GitHub OAuth
GITHUB_CLIENT_ID="xxxx"
GITHUB_CLIENT_SECRET="xxxx"

# Telegram
TELEGRAM_BOT_TOKEN="7123456789:AAFxxxxxxxxxx"
TELEGRAM_MASTER_CHANNEL_ID="-1001234567890"
```

Generate a secure `NEXTAUTH_SECRET` by running:

```bash
openssl rand -base64 32
```

Copy the output and paste it as the value of `NEXTAUTH_SECRET`.

---

### 9. Set up the database

Run these two commands to create all the database tables:

```bash
npx prisma generate
npx prisma db push
```

You should see a success message listing all tables created. To visually browse your database:

```bash
npx prisma studio
```

This opens a browser UI at `http://localhost:5555`.

---

### 10. Run the app

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**First time flow:**
1. Click **Get Started** on the landing page
2. Sign in with Google or GitHub
3. You are redirected to `/dashboard`
4. An API key is automatically created for you
5. Go to **API Keys** in the sidebar to see your key
6. Go to **Images** to upload your first image
7. Check your Telegram group — the image should appear there

---

## API Reference

All public API endpoints are prefixed with `/api/v1/`. Authentication is done via the `x-api-key` header.

---

### Authentication

Every API request must include your API key in the request header:

```
x-api-key: tdrive_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

You can find your API key in the dashboard under **API Keys**.

If the key is missing or invalid you will get:

```json
{
  "error": "Invalid API key"
}
```

---

### Upload an Image

Upload an image file and get back a permanent URL.

```
POST /api/v1/upload
```

**Headers:**

| Header | Value |
|---|---|
| `x-api-key` | Your API key |
| `Content-Type` | `multipart/form-data` |

**Body:**

| Field | Type | Description |
|---|---|---|
| `image` | File | The image file to upload |

**Allowed file types:** `image/jpeg`, `image/png`, `image/gif`, `image/webp`

**Max file size:** 4MB

**Success response:**

```json
{
  "success": true,
  "id": "abc123xyz456",
  "url": "https://yourdomain.com/i/abc123xyz456",
  "fileName": "photo.jpg",
  "size": 245000,
  "type": "image/jpeg",
  "uploadedAt": "2024-01-15T10:30:00.000Z"
}
```

**Error responses:**

```json
{ "error": "Missing x-api-key header" }         // 401
{ "error": "Invalid API key" }                   // 401
{ "error": "No image provided" }                 // 400
{ "error": "Invalid file type" }                 // 400
{ "error": "File too large. Max 10MB." }         // 400
```

---

### List Images

Get a list of all images uploaded with a specific API key.

```
GET /api/v1/images
```

**Headers:**

| Header | Value |
|---|---|
| `x-api-key` | Your API key |

**Success response:**

```json
{
  "success": true,
  "count": 3,
  "images": [
    {
      "id": "abc123xyz456",
      "url": "https://yourdomain.com/i/abc123xyz456",
      "fileName": "photo.jpg",
      "size": 0.23,
      "type": "image/jpeg",
      "uploadedAt": "2024-01-15T10:30:00.000Z"
    }
  ]
}
```

---

### Delete an Image

Delete an image by its ID. This removes it from both the database and Telegram.

```
DELETE /api/v1/images/:id
```

**Headers:**

| Header | Value |
|---|---|
| `x-api-key` | Your API key |

**URL params:**

| Param | Description |
|---|---|
| `id` | The image ID returned from the upload response |

**Success response:**

```json
{
  "success": true
}
```

---

### Serve an Image

Access any image directly by its URL. No authentication needed.

```
GET /i/:id
```

Returns the raw image with the correct `Content-Type` header. Cached for 1 year via `Cache-Control`.

Use this URL directly in `<img>` tags, CSS, markdown, or anywhere you need an image:

```html
<img src="https://yourdomain.com/i/abc123xyz456" alt="my image" />
```

---

## Dashboard Guide

The dashboard at `/dashboard` gives you a visual interface to manage everything.

| Page | Path | What it does |
|---|---|---|
| Overview | `/dashboard` | Stats: total images, API calls, keys |
| Images | `/dashboard/images` | Upload images, view gallery, copy URLs, delete |
| API Keys | `/dashboard/api-keys` | Create keys, view/copy keys, delete keys, see usage |
| Docs | `/dashboard/docs` | Interactive API documentation with code examples |

---

## Using imgstorage in Your Project

### JavaScript / TypeScript

```ts
// Upload an image
async function uploadImage(file: File, apiKey: string) {
  const form = new FormData()
  form.append('image', file)

  const res = await fetch('http://localhost:3000/api/v1/upload', {
    method: 'POST',
    headers: { 'x-api-key': apiKey },
    body: form,
  })

  const data = await res.json()
  console.log(data.url) // https://yourdomain.com/i/abc123
  return data
}

// List all images
async function listImages(apiKey: string) {
  const res = await fetch('http://localhost:3000/api/v1/images', {
    headers: { 'x-api-key': apiKey },
  })
  return res.json()
}

// Delete an image
async function deleteImage(id: string, apiKey: string) {
  const res = await fetch(`http://localhost:3000/api/v1/images/${id}`, {
    method: 'DELETE',
    headers: { 'x-api-key': apiKey },
  })
  return res.json()
}
```

---

### Python

```python
import requests

API_KEY = "tdrive_your_key_here"
BASE_URL = "http://localhost:3000"

# Upload an image
def upload_image(file_path: str):
    with open(file_path, "rb") as f:
        res = requests.post(
            f"{BASE_URL}/api/v1/upload",
            headers={"x-api-key": API_KEY},
            files={"image": f}
        )
    return res.json()

# List all images
def list_images():
    res = requests.get(
        f"{BASE_URL}/api/v1/images",
        headers={"x-api-key": API_KEY}
    )
    return res.json()

# Delete an image
def delete_image(image_id: str):
    res = requests.delete(
        f"{BASE_URL}/api/v1/images/{image_id}",
        headers={"x-api-key": API_KEY}
    )
    return res.json()

# Example usage
result = upload_image("photo.jpg")
print(result["url"])  # https://yourdomain.com/i/abc123
```

---

### cURL

```bash
# Upload an image
curl -X POST http://localhost:3000/api/v1/upload \
  -H "x-api-key: tdrive_your_key_here" \
  -F "image=@/path/to/photo.jpg"

# List images
curl http://localhost:3000/api/v1/images \
  -H "x-api-key: tdrive_your_key_here"

# Delete an image
curl -X DELETE http://localhost:3000/api/v1/images/abc123xyz456 \
  -H "x-api-key: tdrive_your_key_here"
```

---

### React Hook

Drop this hook into any React project to use imgstorage:

```tsx
import { useState } from 'react'

export function useTeleDrive(apiKey: string) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function upload(file: File) {
    setUploading(true)
    setError(null)

    try {
      const form = new FormData()
      form.append('image', file)

      const res = await fetch('https://yourdomain.com/api/v1/upload', {
        method: 'POST',
        headers: { 'x-api-key': apiKey },
        body: form,
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.error)

      return data as {
        success: boolean
        id: string
        url: string
        fileName: string
        size: number
        type: string
        uploadedAt: string
      }
    } catch (err: any) {
      setError(err.message)
      return null
    } finally {
      setUploading(false)
    }
  }

  return { upload, uploading, error }
}

// Usage in a component
function MyComponent() {
  const { upload, uploading } = useTeleDrive('tdrive_your_key_here')

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    const result = await upload(file)
    if (result) {
      console.log('Image URL:', result.url)
    }
  }

  return (
    <input
      type="file"
      accept="image/*"
      onChange={handleFile}
      disabled={uploading}
    />
  )
}
```

---

## Database Schema

```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  username      String?   @unique
  createdAt     DateTime  @default(now())
  accounts      Account[]
  sessions      Session[]
  apiKeys       ApiKey[]
  images        Image[]
}

model ApiKey {
  id          String   @id @default(cuid())
  userId      String
  key         String   @unique        // e.g. tdrive_abc123...
  name        String   @default("Default Key")
  usageCount  Int      @default(0)   // increments on every API call
  createdAt   DateTime @default(now())
  user        User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  images      Image[]
}

model Image {
  id             String   @id @default(cuid())
  userId         String
  apiKeyId       String
  telegramFileId String                // Telegram's internal file_id
  telegramMsgId  BigInt?               // Message ID in the Telegram group
  slug           String   @unique      // Short random ID for the URL
  fileName       String
  fileSizeMb     Float?
  mimeType       String?
  createdAt      DateTime @default(now())
  user           User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  apiKey         ApiKey   @relation(fields: [apiKeyId], references: [id])
}
```

---

## Environment Variables Reference

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | PostgreSQL connection string from NeonDB |
| `NEXTAUTH_URL` | Yes | Your app URL. Use `http://localhost:3000` locally |
| `NEXTAUTH_SECRET` | Yes | Random secret for NextAuth. Generate with `openssl rand -base64 32` |
| `GOOGLE_CLIENT_ID` | Yes | From Google Cloud Console |
| `GOOGLE_CLIENT_SECRET` | Yes | From Google Cloud Console |
| `GITHUB_CLIENT_ID` | Yes | From GitHub Developer Settings |
| `GITHUB_CLIENT_SECRET` | Yes | From GitHub Developer Settings |
| `TELEGRAM_BOT_TOKEN` | Yes | From @BotFather on Telegram |
| `TELEGRAM_MASTER_CHANNEL_ID` | Yes | Your private Telegram group ID (starts with -100) |

---

## Common Errors & Fixes

**`Error: Invalid API key`**
- Make sure you're passing the key in the `x-api-key` header, not `Authorization`
- Check you copied the full key including the `tdrive_` prefix

**`Error: No storage channel found`**
- Your user row in the database has a null `telegramChannelId`
- Run `npx prisma studio`, open the User table, and manually set `telegramChannelId` to your group ID

**`Error: Telegram error: Bad Request: chat not found`**
- Your `TELEGRAM_MASTER_CHANNEL_ID` is wrong
- Make sure it starts with a minus sign e.g. `-1001234567890`
- Make sure the bot is an admin in that group

**`PrismaClientKnownRequestError: table does not exist`**
- Run `npx prisma db push` to create the tables

**`Error: NEXTAUTH_SECRET is not set`**
- Generate one with `openssl rand -base64 32` and add it to `.env.local`

**Images not showing in dashboard**
- The image URL `/i/:slug` fetches from Telegram each time
- Make sure your bot token is correct and the group still exists

**`401 Unauthorized` on API routes**
- You are not logged in or the session has expired
- Sign out and sign back in

**Bot not found when creating Telegram group**
- Search the bot username without the `@` symbol
- Make sure group privacy is disabled in BotFather → Bot Settings → Group Privacy → Turn off

---

## Contributing

Pull requests are welcome.

1. Fork the repo
2. Create a branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Push and open a pull request

---

## License

MIT — do whatever you want with it.

---

Built with Next.js, Prisma, NeonDB, and Telegram.
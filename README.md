# TikTok Shop Ops - AI Chat + Hub

A static GitHub Pages site that acts as your TikTok Shop operations hub:

- **AI Chat Assistant** — a chat interface embedded from your n8n workflow, backed by Anthropic Claude and grounded in your Google Drive knowledge base.
- **Links to Asana** — for task tracking (no custom board — you already use Asana).
- **Links to your other dashboards** — like the existing [tts-ops-dashboard](https://sanskarsant-tts.github.io/tts-ops-dashboard/).

## Architecture

```
User browser
    │
    ▼
GitHub Pages (this repo)  → static HTML/CSS/JS
    │
    ▼
n8n Chat Trigger (webhook)  → Pattern corporate n8n
    │
    ├── Anthropic Claude (via n8n credential)   → chat
    ├── Google Drive (via n8n credential)       → reads KB doc
    └── Buffer memory                            → conversation state

Google Drive
    │
    ▼
n8n Drive Ingest workflow (scheduled every 6h)
    │
    ▼
Writes `TTS-Bot-KB.txt` back to Drive with all your SOPs concatenated
```

**Nothing external is needed** beyond services you already have:
- n8n (Pattern corp) with an Anthropic credential and Google Drive credential
- Your GitHub account for the Pages deployment
- Your Google account for Drive

## First-time setup

### 1. Wire the n8n workflows

Two workflows have already been created in your n8n instance:

- `TTS Ops Bot - Drive Ingest` (id `SaEBzNRfMdNtpjEw`)
- `TTS Ops Bot - Chat` (id `VL4NhI27qKkJaLSs`)

Open each in n8n and:

1. Click the **Google Drive** nodes → **Credential to connect with** → select your existing Google credential (or create a new "Google Drive OAuth2 API" credential).
2. Click the **Anthropic Chat Model** node → **Credential to connect with** → select your existing Anthropic credential (or create a new "Anthropic API" credential from a Console-issued key).
3. On the **Drive Ingest** workflow, click **Save**, then click **Execute Workflow** manually to seed the initial KB file. Verify `TTS-Bot-KB.txt` appears in your Drive.
4. Activate both workflows (top-right toggle).
5. On the **Chat** workflow, click the **Chat Trigger** node → copy the **Chat URL** (looks like `https://n8n.pattern.com/webhook/xxxx/chat`).

### 2. Configure this site

Edit [`config.js`](config.js) and paste the Chat URL:

```js
window.APP_CONFIG = {
  n8nChatWebhookUrl: 'https://n8n.pattern.com/webhook/xxxx/chat',
  asanaProjectUrl: 'https://app.asana.com/0/xxxxxxxx',
  extraDashboards: [
    // Add any other pages you want on the hub
  ],
};
```

### 3. Deploy to GitHub Pages

```bash
git init
git add -A
git commit -m "initial: TTS Ops Hub"
git branch -M main
git remote add origin https://github.com/sanskarsant-tts/tts-ops-wiki-bot.git
git push -u origin main
```

Then in the repo's **Settings → Pages**:
- Source: **Deploy from a branch**
- Branch: `main`, folder: `/ (root)`
- Save. GitHub gives you a URL like `https://sanskarsant-tts.github.io/tts-ops-wiki-bot/`

## Local preview

```bash
# Any static file server works. Two easy options:
npx serve .
# or
python -m http.server 8080
```

Open http://localhost:8080

## What lives where

| File | Purpose |
|---|---|
| `index.html` | Hub landing page with tiles for chat + Asana + other dashboards |
| `chat.html` | AI Chat page, embeds n8n's chat widget |
| `styles.css` | Shared styles, matches the existing `tts-ops-dashboard` aesthetic |
| `config.js` | Runtime configuration (edit this) |
| `main.js` | Wires config values into the DOM, renders extra tiles |

## Adding another dashboard

Edit `config.js`:

```js
extraDashboards: [
  {
    name: 'Snowflake ABG Tracker',
    url: 'https://docs.google.com/spreadsheets/d/1DcMB_pjY5nSTTkzJvgYDjRwsdi2f3oZzI8sFjVpP_9o',
    icon: '📈',
    desc: 'Nightly refresh of TikTok US listings via n8n + Snowflake',
  },
],
```

## Updating the knowledge base

Just add / edit / delete files in your Google Drive. The Drive Ingest workflow re-runs every 6h and regenerates `TTS-Bot-KB.txt` automatically. To force it:

- Open the `TTS Ops Bot - Drive Ingest` workflow in n8n
- Click **Execute Workflow**

That's it — the chat will use the updated KB starting with the very next question.

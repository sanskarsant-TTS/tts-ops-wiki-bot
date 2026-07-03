// ============================================================================
// TikTok Shop Ops Hub - runtime configuration
// Edit this file, commit, redeploy (or push to GitHub Pages branch).
// This file IS committed - all values here are public / safe to share.
// ============================================================================

window.APP_CONFIG = {
  // The n8n Chat Trigger's PRODUCTION webhook URL.
  //
  // How to get it:
  //   1. Open the "TTS Ops Bot - Chat" workflow in your n8n.
  //   2. Wire the Anthropic credential + Google Drive credential.
  //   3. Click "Activate" (top right).
  //   4. Click the Chat Trigger node -> copy the "Chat URL" (starts with /webhook/).
  //   5. Paste it below, replacing this placeholder string.
  //
  // While this is empty, chat.html will show a helpful "not configured" message.
  n8nChatWebhookUrl: 'https://community-prod-n8n.pattern.com/webhook/2cb35146-7a0b-44db-ba9d-c7b0a858e6d7/chat',

  // Where "Tasks in Asana" opens. Replace with your actual Asana project URL.
  asanaProjectUrl: 'https://app.asana.com/',

  // Optional extra tiles on the hub. Add more { name, url, icon, desc } here.
  extraDashboards: [
    // { name: "Snowflake ABG Tracker", url: "...", icon: "📈", desc: "Nightly refresh of TikTok listings" },
  ],
};

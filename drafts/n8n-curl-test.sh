#!/bin/bash
# n8n incomingエンドポイントへの動作確認用curl

curl -X POST "https://<your>.n8n.cloud/webhook-test/incoming/oshi" \
  -H "Content-Type: application/json" \
  -d '{
    "source":"X",
    "author":"JOKER",
    "posted_at":"2026-05-06T12:34:56+09:00",
    "text":"ファンミ告知きた！",
    "url":"https://x.com/.../status/2051349437",
    "tags":["fanmeet","notice"]
  }'

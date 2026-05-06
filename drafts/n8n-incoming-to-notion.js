// n8n: Webhook受信 → Notion DB登録 用マッピング (draft)
// items[0].json に Webhook の body が入る前提
// DBスキーマ: Title(Title) / Source(Select) / Author(Rich text) / Posted(Date) / URL(Url) / Tags(Multi-select) / Text(Rich text)

const b = items[0].json;

return [
  {
    json: {
      notion: {
        title: b.text?.slice(0, 60) || "無題",
        source: b.source || "Unknown",
        author: b.author || "",
        posted: b.posted_at || null,
        url: b.url || "",
        tags: Array.isArray(b.tags) ? b.tags : [],
        text: b.text || ""
      }
    }
  }
];

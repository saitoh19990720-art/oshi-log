const STORAGE_KEY = "oshi-log-records";

const members = [
  {
    id: "hauki",
    name: "はうきさん",
    label: "SECRET BLUE",
    color: "#4A86B8",
    description: "青い余韻ごと保存しておきたいときの観測ログ。静かな熱量や、その日の印象を積み上げます。",
  },
  {
    id: "maetor",
    name: "めーとる",
    label: "WHITE",
    color: "#F3F0EB",
    description: "やわらかい空気や言葉の残り香を記録するためのログ。白は枠線で見やすさを補っています。",
  },
  {
    id: "m",
    name: "M",
    label: "PINK",
    color: "#E8A3BE",
    description: "きらっと残った瞬間や、あとで読み返したい高まりをまとめるピンクの観測メモです。",
  },
  {
    id: "joker",
    name: "JOKER",
    label: "PURPLE",
    color: "#B88AD8",
    description: "紫の存在感ごと残していくログ。印象の強い瞬間や気分の振れ幅を書き留められます。",
  },
];

const state = {
  selectedId: members[0].id,
  logs: loadLogs(),
};

const oshiList = document.querySelector("#oshiList");
const oshiCount = document.querySelector("#oshiCount");
const viewTitle = document.querySelector("#viewTitle");
const memberBadge = document.querySelector("#memberBadge");
const memberRole = document.querySelector("#memberRole");
const memberName = document.querySelector("#memberName");
const memberDescription = document.querySelector("#memberDescription");
const logCount = document.querySelector("#logCount");
const lastObserved = document.querySelector("#lastObserved");
const logList = document.querySelector("#logList");
const emptyState = document.querySelector("#emptyState");
const logForm = document.querySelector("#logForm");
const formMessage = document.querySelector("#formMessage");
const logTitleInput = document.querySelector("#logTitle");
const logDateInput = document.querySelector("#logDate");
const logMemoInput = document.querySelector("#logMemo");

logDateInput.value = new Date().toISOString().slice(0, 10);

function loadLogs() {
  const raw = localStorage.getItem(STORAGE_KEY);

  if (!raw) {
    return {};
  }

  try {
    const parsed = JSON.parse(raw);
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

function saveLogs() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.logs));
}

function formatDate(value) {
  if (!value) {
    return "日付未設定";
  }

  return new Intl.DateTimeFormat("ja-JP", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

function getSelectedMember() {
  return members.find((member) => member.id === state.selectedId) ?? members[0];
}

function getLogsForMember(memberId) {
  const logs = state.logs[memberId];
  return Array.isArray(logs) ? logs : [];
}

function renderSidebar() {
  oshiCount.textContent = `${members.length}人`;
  oshiList.innerHTML = "";

  members.forEach((member) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "oshi-button";
    button.style.setProperty("--accent-color", member.color);
    if (member.id === state.selectedId) {
      button.classList.add("is-active");
    }
    if (member.label === "WHITE") {
      button.classList.add("is-white");
    }

    const logs = getLogsForMember(member.id);
    button.innerHTML = `
      <span class="color-dot" aria-hidden="true"></span>
      <span>
        <span class="oshi-name">${member.name}</span>
        <span class="oshi-meta">${member.label}</span>
      </span>
      <span class="entry-count">${logs.length}</span>
    `;

    button.addEventListener("click", () => {
      state.selectedId = member.id;
      formMessage.textContent = "";
      render();
    });

    oshiList.appendChild(button);
  });
}

function renderMemberView() {
  const member = getSelectedMember();
  const logs = getLogsForMember(member.id);

  document.documentElement.style.setProperty("--accent-color", member.color);
  viewTitle.textContent = member.name;
  memberBadge.textContent = member.label;
  memberRole.textContent = member.label;
  memberName.textContent = member.name;
  memberDescription.textContent = member.description;
  logCount.textContent = String(logs.length);
  lastObserved.textContent = logs.length ? formatDate(logs[0].date) : "まだありません";

  renderLogs(logs, member);
}

function renderLogs(logs, member) {
  logList.innerHTML = "";
  emptyState.classList.toggle("is-hidden", logs.length > 0);

  logs.forEach((log) => {
    const item = document.createElement("li");
    item.className = "log-item";
    item.style.setProperty("--accent-color", member.color);
    item.innerHTML = `
      <div class="log-item-header">
        <div>
          <h4 class="log-item-title">${escapeHtml(log.title)}</h4>
          <span class="log-date">${formatDate(log.date)}</span>
        </div>
      </div>
      <p>${escapeHtml(log.memo || "メモはまだありません。")}</p>
    `;
    logList.appendChild(item);
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function render() {
  renderSidebar();
  renderMemberView();
}

logForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = logTitleInput.value.trim();
  const date = logDateInput.value;
  const memo = logMemoInput.value.trim();

  if (!title || !date) {
    formMessage.textContent = "タイトルと日付を入れてください。";
    return;
  }

  const memberId = state.selectedId;
  const nextLogs = getLogsForMember(memberId).slice();
  nextLogs.unshift({
    title,
    date,
    memo,
  });
  state.logs[memberId] = nextLogs;
  saveLogs();

  logTitleInput.value = "";
  logMemoInput.value = "";
  logDateInput.value = new Date().toISOString().slice(0, 10);
  formMessage.textContent = `${getSelectedMember().name} の記録を追加しました。`;

  render();
});

render();

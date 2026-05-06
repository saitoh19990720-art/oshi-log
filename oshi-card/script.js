// 写真追加: クリック → file picker → 1:1にcrop/fitしてスロットへ
(() => {
  const picker = document.getElementById("photoPicker");
  let activeSlot = null;

  document.querySelectorAll(".photo-slot").forEach((slot) => {
    slot.addEventListener("click", (e) => {
      // 既に画像がある場合は差し替え
      activeSlot = slot;
      picker.value = "";
      picker.click();
    });
    slot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        slot.click();
      }
    });
  });

  picker.addEventListener("change", () => {
    const file = picker.files?.[0];
    if (!file || !activeSlot) return;
    const reader = new FileReader();
    reader.onload = (ev) => fitAndPlace(activeSlot, ev.target.result);
    reader.readAsDataURL(file);
  });

  function fitAndPlace(slot, dataUrl) {
    const img = new Image();
    img.onload = () => {
      const size = 600; // 出力1:1キャンバスサイズ
      const canvas = document.createElement("canvas");
      canvas.width = canvas.height = size;
      const ctx = canvas.getContext("2d");
      const scale = Math.max(size / img.width, size / img.height);
      const w = img.width * scale;
      const h = img.height * scale;
      ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h);
      slot.innerHTML = "";
      const out = new Image();
      out.alt = "追加した写真";
      out.src = canvas.toDataURL("image/jpeg", 0.9);
      slot.appendChild(out);
    };
    img.src = dataUrl;
  }

  // テーマ切替
  document.querySelectorAll('input[name="theme"]').forEach((r) => {
    r.addEventListener("change", (e) => {
      const card = document.getElementById("card");
      card.classList.remove("theme-mono", "theme-soft", "theme-deep");
      card.classList.add("theme-" + e.target.value);
    });
  });
})();

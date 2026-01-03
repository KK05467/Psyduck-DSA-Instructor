const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

const dsaKeywords = [
  "array","linked list","stack","queue","tree","graph",
  "dp","dynamic programming","binary search",
  "sorting","time complexity","space complexity"
];

function isDSA(q) {
  return dsaKeywords.some(k => q.toLowerCase().includes(k));
}

function addMsg(text, cls) {
  const div = document.createElement("div");
  div.className = `msg ${cls}`;
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function send() {
  const text = input.value.trim();
  if (!text) return;

  addMsg(text, "user");
  input.value = "";

  if (isDSA(text)) {
    const thinking = document.createElement("div");
    thinking.className = "msg bot";
    thinking.textContent = "🧠 Psyduck thinking...";
    chat.appendChild(thinking);

    try {
      const res = await fetch("http://localhost:3000/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: text })
      });
      const data = await res.json();
      thinking.textContent = data.answer;
    } catch (err) {
      console.error(err);
      thinking.textContent = "psy-psy… API failed 🌀";
    }
  } else {
    const times = Math.floor(Math.random() * 6) + 2;
    addMsg("psy-".repeat(times) + "psyduckk!", "bot");
  }
}

sendBtn.addEventListener("click", send);
input.addEventListener("keydown", e => {
  if (e.key === "Enter") send();
});

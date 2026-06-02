const chat = document.getElementById("chat");
const input = document.getElementById("userInput");
const sendBtn = document.getElementById("sendBtn");

function addMessage(text, sender) {
  const div = document.createElement("div");
  div.classList.add("msg", sender);
  div.textContent = text;
  chat.appendChild(div);
  chat.scrollTop = chat.scrollHeight;
}

async function askPsyduck() {
  const question = input.value.trim();

  if (!question) return;

  addMessage(question, "user");
  input.value = "";

  addMessage("Psyduck is thinking... 🌀", "bot");

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question,
      }),
    });

    const data = await response.json();

    chat.lastChild.remove();

    addMessage(
      data.answer || "psy-psy... no answer received 🌀",
      "bot"
    );
  } catch (error) {
    chat.lastChild.remove();
    addMessage(
      "psy-psy... server connection failed 🌀",
      "bot"
    );
    console.error(error);
  }
}

sendBtn.addEventListener("click", askPsyduck);

input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    askPsyduck();
  }
});
const askBtn = document.getElementById("askBtn");
const questionInput = document.getElementById("question");
const answerDiv = document.getElementById("answer");

askBtn.addEventListener("click", async () => {
  const question = questionInput.value.trim();

  if (!question) {
    answerDiv.innerText = "Please enter a question.";
    return;
  }

  answerDiv.innerText = "Thinking...";

  try {
    const response = await fetch("/ask", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ question }),
    });

    const data = await response.json();

    answerDiv.innerText =
      data.answer || "No response received.";
  } catch (error) {
    console.error(error);
    answerDiv.innerText =
      "Failed to connect to Psyduck 🌀";
  }
});
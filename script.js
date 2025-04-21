const API_KEY = "AIzaSyAq02mn4Phtnbrb9XaFKW-e6s0VcDqwqfc"; // Replace with your real Gemini API key

async function getNews() {
  const facts = document.getElementById("factsInput").value.trim();
  const output = document.getElementById("newsResult");

  if (!facts) {
    alert("Please enter anything.");
    return;
  }

  output.innerHTML = "Getting facts...";

//   const prompt = `Give me the latest 5 real news headlines for ${facts}. Include a short summary and date.`;

  const prompt = `Give me the  10 important facts related to ${facts}.   `;

  try {
    const res = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],

        })
      }
    )

    const data = await res.json();
    const result = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (result) {
      output.innerHTML = `<div class='news-card'><h3>Facts for ${facts}</h2><h3>${result.replace(/\n/g, "<br>")}</h3></div>`;
    } else {
      output.innerHTML = "No news found.";
    }

  } catch (err) {
    output.innerHTML = "Error fetching news.";
    console.error(err);
  }
}


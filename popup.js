const GROQ_API_KEY = "apikey"; // Replace with your key

document.getElementById("analyzeBtn").addEventListener("click", async () => {
    const code = document.getElementById("codeInput").value;
    const prompt = `Analyze the following code and provide its time and space complexity:\n\n${code}`;

    try {
        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",

                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await response.json();
        const result = data.choices?.[0]?.message?.content || JSON.stringify(data, null, 2);
        document.getElementById("output").textContent = result;
    } catch (error) {
        document.getElementById("output").textContent = `❌ Error: ${error.message}`;
    }
});

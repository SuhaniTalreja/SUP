const { GoogleGenerativeAI } = require("@google/generative-ai");

async function runAI() {
    const genAI = new GoogleGenerativeAI("AIzaSyDeskCnC-SB3hAwRjGkkhc7Gi7XQpjpaMI");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = "Give caption for a social media post as i just won a badminton chammpionship in my college in about 20 words";

    try {
        const result = await model.generateContent(prompt);
        console.log(result.response.text());
    } catch (error) {
        console.error("Error generating AI response:", error);
    }
}

// Run the function
runAI();

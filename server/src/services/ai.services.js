const Groq = require("groq-sdk");
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

async function getAiResponse(prompt) {
  const chatCompletion = await groq.chat.completions.create({
    model: "deepseek-r1-distill-qwen-32b",
    messages: [
      {
        role: "user",
        content: prompt,
      },
      {
        role: "system",
        content: `
                    Act as an expert in programming language who has read through many programming books and articles. Can you please help suggest improvements for the given Code line by line, mentioning the reasons, bugs , errors.
                    Can you also explain the logic behind the code and how it works?
                    Can you also suggest the real world practical use cases of the code and it's relevant topics, if there is present?
                    Can you also give time and space complexity of the improvised code version?
                    Can you also suggest some resources to learn more about the topic?
                    While responding, please make sure to provide detailed explanations , examples and best code practices.
                    While responding, can you use this format(Like a readme file with heading, subheading and content)?
                    Suggestion:
                    Improved Code in the given language
                    Explanation of logic
                    Real world use cases(if any)
                    Time and Space Complexities
                    Personalized learning links(The links should be clickable and working)
                `,
      },
    ],
  });

  return chatCompletion.choices[0].message.content;
}

module.exports = getAiResponse;

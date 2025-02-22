const getAiResponse = require("../services/ai.services");

const getReview = async (req, res) => {
    const prompt = req.body.code;

    if(!prompt){
        return res.status(400).json({message: "Prompt is required"})
    }
    const response = await getAiResponse(prompt);
    res.send(response)
}

module.exports = { getReview }